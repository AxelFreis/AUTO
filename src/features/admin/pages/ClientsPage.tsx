import { Users, Mail, Phone, Calendar, AlertCircle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { EmptyState } from '../../../components/ui/EmptyState';
import { useClients } from '../hooks/useClients';

export const ClientsPage = () => {
  const { data: clients, isLoading, error } = useClients();

  if (isLoading) {
    return (
      <div className="p-4 space-y-6">
        <section className="pt-6 pb-4">
          <div className="h-8 bg-slate-800 rounded animate-pulse w-48 mb-2" />
          <div className="h-4 bg-slate-800 rounded animate-pulse w-32" />
        </section>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-slate-800 rounded-xl animate-pulse" />
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
                  Impossible de charger les clients
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
          Clients
        </h1>
        <p className="text-text-secondary">
          {clients?.length || 0} client{clients && clients.length > 1 ? 's' : ''} au total
        </p>
      </section>

      {!clients || clients.length === 0 ? (
        <Card>
          <EmptyState
            icon={Users}
            title="Aucun client"
            description="Les clients apparaîtront ici après leur première réservation"
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {clients.map((client) => (
            <Card
              key={client.id}
              className="hover:bg-background-elevated transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-text-secondary" />
                      <p className="text-sm text-text-primary font-medium">
                        {client.email}
                      </p>
                    </div>
                    {client.phone && (
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-text-secondary" />
                        <p className="text-sm text-text-secondary">{client.phone}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-slate-700">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {client.bookings_count} réservation{client.bookings_count > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="text-xs text-text-muted">
                    Client depuis{' '}
                    {new Date(client.created_at).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
