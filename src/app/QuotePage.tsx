import { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LoadingBar } from '../components/ui/LoadingBar';
import { PriceTag } from '../components/ui/PriceTag';
import { routes } from '../config/routes';
import { uploadMultiplePhotos, type UploadedFile } from '../services/storage';

type AnalysisStep = 'upload' | 'analyzing' | 'result';

export const QuotePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<AnalysisStep>('upload');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles(prev => [...prev, ...fileArray]);
      setUploadError(null);
    }
  };

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handlePhotoUpload = async () => {
    if (selectedFiles.length === 0) {
      setUploadError('Veuillez sélectionner au moins une photo');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setStep('analyzing');

    try {
      const uploaded = await uploadMultiplePhotos(selectedFiles);
      setUploadedPhotos(uploaded);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setAnalysisProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep('result'), 500);
        }
      }, 300);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Erreur lors de l\'upload');
      setStep('upload');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {step === 'upload' && (
        <>
          <section className="pt-6 pb-4">
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Montrez-nous votre véhicule
            </h1>
            <p className="text-text-secondary">
              Sélectionner la prestation
            </p>
          </section>

          <Card className="border-2 border-dashed border-slate-700 bg-slate-900/50">
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="p-6 bg-slate-800 rounded-full">
                <Camera className="w-12 h-12 text-slate-500" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-text-primary font-medium">Prendre une photo maintenant</p>
                <p className="text-sm text-text-secondary max-w-xs">
                  Prenez plusieurs photos de votre véhicule pour une meilleure estimation
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />

              <Button variant="ghost" className="text-sm" onClick={handleGalleryClick}>
                <Upload className="w-4 h-4 mr-2" />
                Ou sélectionner depuis la galerie
              </Button>

              {uploadError && (
                <p className="text-sm text-red-500">{uploadError}</p>
              )}

              {selectedFiles.length > 0 && (
                <div className="w-full space-y-3">
                  <p className="text-sm text-text-secondary text-center">
                    {selectedFiles.length} photo{selectedFiles.length > 1 ? 's' : ''} sélectionnée{selectedFiles.length > 1 ? 's' : ''}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="primary"
                    onClick={handlePhotoUpload}
                    fullWidth
                    disabled={isUploading}
                  >
                    {isUploading ? 'Upload en cours...' : 'Analyser les photos'}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </>
      )}

      {step === 'analyzing' && (
        <>
          <section className="pt-6 pb-4">
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Réalisation du devis
            </h1>
            <p className="text-text-secondary">
              Analyse en cours...
            </p>
          </section>

          <Card className="space-y-6">
            <LoadingBar progress={analysisProgress} label="Analyse en cours..." />

            <div className="space-y-3 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Niveau de saleté</span>
                <span className="text-text-primary font-medium">Modéré</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Temps estimé</span>
                <span className="text-text-primary font-medium">1h15</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Prix estimé</span>
                <span className="text-text-primary font-medium">65€</span>
              </div>
            </div>
          </Card>

          <Button variant="secondary" fullWidth disabled>
            Modifier mes photos
          </Button>
        </>
      )}

      {step === 'result' && (
        <>
          <section className="pt-6 pb-4">
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Votre devis est prêt
            </h1>
            <p className="text-text-secondary">
              Détails de la prestation
            </p>
          </section>

          <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
            <div className="text-center space-y-2">
              <p className="text-sm text-text-secondary">Prix estimé</p>
              <PriceTag amount={65} size="lg" estimated />
              <p className="text-xs text-text-muted">Nettoyage intérieur complet</p>
            </div>
          </Card>

          <Card className="space-y-4">
            <h3 className="font-semibold text-text-primary">Détails</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Prestation</span>
                <span className="text-text-primary">Nettoyage intérieur complet</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Niveau de saleté</span>
                <span className="text-text-primary">Modéré</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Durée estimée</span>
                <span className="text-text-primary">45-60 min</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Prix de base</span>
                <span className="text-text-primary">65€</span>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate(routes.booking)}
            >
              Réserver ce nettoyage
            </Button>
            <Button variant="ghost" fullWidth onClick={() => setStep('upload')}>
              Refaire l'analyse
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
