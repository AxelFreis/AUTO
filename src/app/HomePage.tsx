import { Camera, Sparkles, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { routes } from '../config/routes';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6">
      <section className="pt-6 pb-4">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Votre voiture comme neuve
        </h1>
        <p className="text-text-secondary">
          Sans bouger de chez vous
        </p>
      </section>

      <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-primary rounded-lg">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-text-primary mb-1">
                Obtenez un devis instantané
              </h3>
              <p className="text-sm text-text-secondary">
                Envoyez des photos, recevez un devis instantané, réservez votre lavage
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            fullWidth
            onClick={() => navigate(routes.quote)}
          >
            Commencer
          </Button>
        </div>
      </Card>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-text-primary">
          Comment ça marche ?
        </h2>

        <div className="space-y-3">
          <Card>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <h3 className="font-medium text-text-primary mb-1">Prenez des photos</h3>
                <p className="text-sm text-text-secondary">
                  Photographiez votre véhicule pour une analyse instantanée
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">2</span>
              </div>
              <div>
                <h3 className="font-medium text-text-primary mb-1">Recevez votre devis</h3>
                <p className="text-sm text-text-secondary">
                  Analyse en cours et estimation de prix instantanée
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">3</span>
              </div>
              <div>
                <h3 className="font-medium text-text-primary mb-1">Choisissez votre créneau</h3>
                <p className="text-sm text-text-secondary">
                  À votre domicile ou sur votre lieu de travail
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">4</span>
              </div>
              <div>
                <h3 className="font-medium text-text-primary mb-1">Confirmez et profitez</h3>
                <p className="text-sm text-text-secondary">
                  Votre nettoyage est confirmé, recevez votre facture
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-text-primary">
          Nos services
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <Card className="text-center space-y-2">
            <div className="inline-flex p-3 bg-primary/10 rounded-lg">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-text-primary">Intérieur</h3>
            <p className="text-xs text-text-secondary">45-60 min</p>
          </Card>

          <Card className="text-center space-y-2">
            <div className="inline-flex p-3 bg-primary/10 rounded-lg">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-text-primary">Carrosserie</h3>
            <p className="text-xs text-text-secondary">25-40 min</p>
          </Card>

          <Card className="text-center space-y-2">
            <div className="inline-flex p-3 bg-primary/10 rounded-lg">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-text-primary">Complet</h3>
            <p className="text-xs text-text-secondary">120-180 min</p>
          </Card>

          <Card className="text-center space-y-2">
            <div className="inline-flex p-3 bg-primary/10 rounded-lg">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-text-primary">Polissage</h3>
            <p className="text-xs text-text-secondary">45-60 min</p>
          </Card>
        </div>
      </section>
    </div>
  );
};
