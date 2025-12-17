import { supabase } from './supabase';

const BUCKET_NAME = 'vehicle-photos';

export interface UploadedFile {
  path: string;
  url: string;
}

export const uploadVehiclePhoto = async (file: File): Promise<UploadedFile> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Erreur lors de l'upload: ${uploadError.message}`);
  }

  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return {
    path: filePath,
    url: publicUrl,
  };
};

export const uploadMultiplePhotos = async (files: File[]): Promise<UploadedFile[]> => {
  const uploadPromises = files.map(file => uploadVehiclePhoto(file));
  return Promise.all(uploadPromises);
};

export const deleteVehiclePhoto = async (path: string): Promise<void> => {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path]);

  if (error) {
    throw new Error(`Erreur lors de la suppression: ${error.message}`);
  }
};
