import { Plus, Clock, Trash2, Edit, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { EmptyState } from '../../../components/ui/EmptyState';
import { PriceTag } from '../../../components/ui/PriceTag';
import { useServices, useDeleteService } from '../hooks/useServices';

export const PrestationsListPage = () => {
  const navigate = useNavigate();
  const { data: services, isLoading, error } = useServices();
  const deleteService = useDeleteService();

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
      try {
        await deleteService.mutateAsync(id);
      } catch {
        alert('Erreur lors de la suppression');
      }
    }
  };

  const getServiceTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      interior: 'Intérieur',
      exterior: 'Extérieur',
      complete: 'Complet',
      polishing: 'Polissage',
    };
    return labels[type] || type;
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
            <div key={i} className="h-24 bg-slate-800 rounded-xl animate-pulse" />
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
                  Impossible de charger les prestations
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
          Prestations
        </h1>
        <p className="text-text-secondary">
          Gérez vos services de detailing
        </p>
      </section>

      <Button
        variant="primary"
        fullWidth
        onClick={() => navigate('/admin/prestations/new')}
      >
        <Plus className="w-5 h-5 mr-2" />
        Ajouter une prestation
      </Button>

      {!services || services.length === 0 ? (
        <Card>
          <EmptyState
            icon={Plus}
            title="Aucune prestation"
            description="Commencez par créer votre première prestation"
            action={
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/admin/prestations/new')}
              >
                Créer une prestation
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <Card key={service.id} className="hover:bg-background-elevated transition-colors">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary mb-1">
                      {service.name}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {getServiceTypeLabel(service.type)}
                    </p>
                  </div>
                  <PriceTag amount={service.base_price} size="sm" />
                </div>

                {service.description && (
                  <p className="text-sm text-text-secondary">{service.description}</p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{service.duration} min</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/prestations/${service.id}`)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4 text-text-secondary" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id, service.name)}
                      className="p-2 hover:bg-error/20 rounded-lg transition-colors"
                      disabled={deleteService.isPending}
                    >
                      <Trash2 className="w-4 h-4 text-error" />
                    </button>
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
