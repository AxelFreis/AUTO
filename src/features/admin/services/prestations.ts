import { supabase } from '../../../services/supabase';
import { Service } from '../models/types';
import { ServiceFormData } from '../models/schemas';

export const getServices = async (orgId: string): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('org_id', orgId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getService = async (id: string): Promise<Service> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error('Service non trouvé');
  return data;
};

export const createService = async (
  orgId: string,
  serviceData: ServiceFormData
): Promise<Service> => {
  const { data, error } = await supabase
    .from('services')
    .insert({
      org_id: orgId,
      ...serviceData,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateService = async (
  id: string,
  serviceData: Partial<ServiceFormData>
): Promise<Service> => {
  const { data, error } = await supabase
    .from('services')
    .update(serviceData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteService = async (id: string): Promise<void> => {
  const { error } = await supabase.from('services').delete().eq('id', id);

  if (error) throw error;
};
