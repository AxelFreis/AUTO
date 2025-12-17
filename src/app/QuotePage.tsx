import { useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LoadingBar } from '../components/ui/LoadingBar';
import { PriceTag } from '../components/ui/PriceTag';
import { routes } from '../config/routes';

type AnalysisStep = 'upload' | 'analyzing' | 'result';

export const QuotePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<AnalysisStep>('upload');
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handlePhotoUpload = () => {
    setStep('analyzing');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setAnalysisProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setStep('result'), 500);
      }
    }, 300);
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
              <Button
                variant="primary"
                onClick={handlePhotoUpload}
                className="mt-4"
              >
                <Camera className="w-5 h-5 mr-2" />
                Prendre une photo
              </Button>
              <Button variant="ghost" className="text-sm">
                <Upload className="w-4 h-4 mr-2" />
                Ou sélectionner depuis la galerie
              </Button>
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
