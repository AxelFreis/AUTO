import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { PriceTag } from '../components/ui/PriceTag';
import { routes } from '../config/routes';
import { useBookingStore, createBooking } from '../services/booking';
import { useAuthStore } from '../services/auth';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { date, time, locationType, address, estimatedPrice, estimatedDuration, serviceType, reset } = useBookingStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formattedDate = date ? new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : '';

  const formattedAddress = `${address.street}, ${address.postalCode} ${address.city}`;

  const serviceNames = {
    interior: 'Nettoyage intérieur',
    exterior: 'Nettoyage extérieur',
    complete: 'Nettoyage complet',
    polishing: 'Polissage'
  };

  const handleConfirmBooking = async () => {
    if (!user?.id) {
      navigate(routes.login);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await createBooking(user.id);
      reset();
      navigate(routes.success);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création de la réservation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <section className="pt-6 pb-4">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Confirmation
        </h1>
        <p className="text-text-secondary">
          Vérifiez les détails de votre réservation
        </p>
      </section>

      <Card className="space-y-4">
        <h3 className="font-semibold text-text-primary">Résumé de la prestation</h3>

        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-text-primary font-medium">{serviceNames[serviceType]}</p>
              <p className="text-sm text-text-secondary">{estimatedDuration} min</p>
            </div>
            <PriceTag amount={estimatedPrice} size="sm" />
          </div>

          <div className="h-px bg-slate-700" />

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Date</span>
              <span className="text-text-primary">{formattedDate} à {time}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Lieu</span>
              <span className="text-text-primary">{formattedAddress}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Prestation</span>
              <span className="text-text-primary">{serviceNames[serviceType]}</span>
            </div>
          </div>

          <div className="h-px bg-slate-700" />

          <div className="flex items-center justify-between pt-2">
            <span className="font-semibold text-text-primary">Prix</span>
            <PriceTag amount={estimatedPrice} size="md" />
          </div>
        </div>
      </Card>

      {error && (
        <Card className="bg-red-500/10 border border-red-500/20">
          <p className="text-sm text-red-500">{error}</p>
        </Card>
      )}

      <Card className="bg-slate-900 border border-slate-700">
        <div className="flex items-start gap-3">
          <div className="p-1 bg-success/20 rounded-full">
            <Check className="w-4 h-4 text-success" />
          </div>
          <div>
            <p className="text-sm text-text-primary font-medium mb-1">
              Garantie satisfaction
            </p>
            <p className="text-xs text-text-secondary">
              Si vous n'êtes pas satisfait, nous reviendrons gratuitement
            </p>
          </div>
        </div>
      </Card>

      <Button
        variant="primary"
        fullWidth
        onClick={handleConfirmBooking}
        disabled={isLoading}
      >
        {isLoading ? 'Création en cours...' : 'Confirmer ma réservation'}
      </Button>
    </div>
  );
};
