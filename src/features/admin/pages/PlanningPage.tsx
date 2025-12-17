import { Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Button } from '../../../components/ui/Button';
import { useBookings, useUpdateBookingStatus } from '../hooks/useBookings';
import { Booking } from '../models/types';

export const PlanningPage = () => {
  const { data: bookings, isLoading, error } = useBookings();
  const updateStatus = useUpdateBookingStatus();

  const upcomingBookings = bookings?.filter(
    (b) => b.status !== 'completed' && b.status !== 'cancelled'
  ) || [];

  const completedBookings = bookings?.filter(
    (b) => b.status === 'completed'
  ) || [];

  const handleStatusChange = async (
    id: string,
    status: Booking['status']
  ) => {
    try {
      await updateStatus.mutateAsync({ id, status });
    } catch {
      alert('Erreur lors de la mise à jour');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'text-warning',
      confirmed: 'text-primary',
      in_progress: 'text-primary',
      completed: 'text-success',
      cancelled: 'text-error',
    };
    return colors[status] || 'text-text-secondary';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'En attente',
      confirmed: 'Confirmé',
      in_progress: 'En cours',
      completed: 'Terminé',
      cancelled: 'Annulé',
    };
    return labels[status] || status;
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-6">
        <section className="pt-6 pb-4">
          <div className="h-8 bg-slate-800 rounded animate-pulse w-48 mb-2" />
          <div className="h-4 bg-slate-800 rounded animate-pulse w-32" />
        </section>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-slate-800 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 space-y-6">
        <section className="pt-6">
          <Card className="bg-error/10 border border-error/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-error mb-1">
                  Erreur de chargement
                </p>
                <p className="text-xs text-text-secondary">
                  Impossible de charger le planning
                </p>
              </div>
            </div>
          </Card>
        </section>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <section className="pt-6 pb-4">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Planning
        </h1>
        <p className="text-text-secondary">
          Gérez vos réservations
        </p>
      </section>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-3">
            À venir ({upcomingBookings.length})
          </h2>
          {upcomingBookings.length === 0 ? (
            <Card>
              <EmptyState
                icon={Calendar}
                title="Aucune réservation à venir"
                description="Les prochaines réservations apparaîtront ici"
              />
            </Card>
          ) : (
            <div className="space-y-3">
              {upcomingBookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="border-l-4 border-l-primary"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary mb-1">
                          {booking.service?.name || 'Prestation'}
                        </h3>
                        <p className={`text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusLabel(booking.status)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <Clock className="w-4 h-4" />
                        <span>
                          {new Date(booking.date).toLocaleDateString('fr-FR')} à {booking.time}
                        </span>
                      </div>
                      {booking.address && (
                        <div className="flex items-start gap-2 text-sm text-text-secondary">
                          <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{booking.address}</span>
                        </div>
                      )}
                    </div>

                    {booking.status === 'pending' && (
                      <div className="flex gap-2 pt-2 border-t border-slate-700">
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => handleStatusChange(booking.id, 'confirmed')}
                          disabled={updateStatus.isPending}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Confirmer
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleStatusChange(booking.id, 'cancelled')}
                          disabled={updateStatus.isPending}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Annuler
                        </Button>
                      </div>
                    )}

                    {booking.status === 'confirmed' && (
                      <div className="pt-2 border-t border-slate-700">
                        <Button
                          size="sm"
                          variant="primary"
                          fullWidth
                          onClick={() => handleStatusChange(booking.id, 'in_progress')}
                          disabled={updateStatus.isPending}
                        >
                          Marquer comme en cours
                        </Button>
                      </div>
                    )}

                    {booking.status === 'in_progress' && (
                      <div className="pt-2 border-t border-slate-700">
                        <Button
                          size="sm"
                          variant="primary"
                          fullWidth
                          onClick={() => handleStatusChange(booking.id, 'completed')}
                          disabled={updateStatus.isPending}
                        >
                          Marquer comme terminé
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-3">
            Terminées ({completedBookings.length})
          </h2>
          {completedBookings.length === 0 ? (
            <Card className="bg-slate-900/50">
              <p className="text-sm text-text-secondary text-center py-4">
                Aucune réservation terminée
              </p>
            </Card>
          ) : (
            <div className="space-y-2">
              {completedBookings.slice(0, 5).map((booking) => (
                <Card key={booking.id} className="bg-slate-900/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-text-primary font-medium">
                        {booking.service?.name || 'Prestation'}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {new Date(booking.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
