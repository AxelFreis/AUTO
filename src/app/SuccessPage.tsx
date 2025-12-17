import { CheckCircle, Download, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { routes } from '../config/routes';

export const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6">
      <section className="pt-12 pb-6 text-center">
        <div className="inline-flex p-4 bg-success/20 rounded-full mb-4">
          <CheckCircle className="w-16 h-16 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Merci ! Votre nettoyage est confirmé.
        </h1>
        <p className="text-text-secondary">
          Nous avons hâte de prendre soin de votre véhicule
        </p>
      </section>

      <Card className="space-y-4">
        <h3 className="font-semibold text-text-primary">Détails de la réservation</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Prestation</span>
            <span className="text-text-primary">Nettoyage intérieur</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Date</span>
            <span className="text-text-primary">30 avril 2026 à 11h</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Lieu</span>
            <span className="text-text-primary">1 Rue Jeanne d'Arc, 75001</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Prix</span>
            <span className="text-text-primary font-semibold">65€</span>
          </div>
        </div>
      </Card>

      <Card className="bg-slate-900 border border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-primary font-medium mb-1">
              Facture #00156
            </p>
            <p className="text-xs text-text-secondary">
              Lucas Dubois
            </p>
          </div>
          <Button variant="secondary" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Télécharger
          </Button>
        </div>
      </Card>

      <div className="space-y-3">
        <Button
          variant="primary"
          fullWidth
          onClick={() => navigate(routes.home)}
        >
          <Home className="w-5 h-5 mr-2" />
          Retour à l'accueil
        </Button>
        <Button variant="ghost" fullWidth>
          Partager mon expérience
        </Button>
      </div>
    </div>
  );
};
