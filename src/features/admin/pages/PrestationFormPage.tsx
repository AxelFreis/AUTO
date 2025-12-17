import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, AlertCircle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import {
  useService,
  useCreateService,
  useUpdateService,
} from '../hooks/useServices';
import { serviceSchema, ServiceFormData } from '../models/schemas';

export const PrestationFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const { data: service, isLoading } = useService(id || '');
  const createService = useCreateService();
  const updateService = useUpdateService();

  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    type: 'interior',
    duration: 60,
    base_price: 0,
    description: '',
    image_url: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        type: service.type,
        duration: service.duration,
        base_price: service.base_price,
        description: service.description || '',
        image_url: service.image_url || '',
      });
    }
  }, [service]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validated = serviceSchema.parse(formData);

      if (isEditing) {
        await updateService.mutateAsync({ id: id!, data: validated });
      } else {
        await createService.mutateAsync(validated);
      }

      navigate('/admin/prestations');
    } catch (error: any) {
      if (error.errors) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  if (isLoading && isEditing) {
    return (
      <div className="p-4 space-y-6">
        <div className="pt-6">
          <div className="h-8 bg-slate-800 rounded animate-pulse w-48 mb-2" />
          <div className="h-4 bg-slate-800 rounded animate-pulse w-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <section className="pt-6 pb-4">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          {isEditing ? 'Modifier la prestation' : 'Nouvelle prestation'}
        </h1>
        <p className="text-text-secondary">
          {isEditing ? 'Modifiez les détails' : 'Créez un nouveau service'}
        </p>
      </section>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Nom de la prestation
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Ex: Nettoyage intérieur complet"
              />
              {errors.name && (
                <p className="text-sm text-error mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Catégorie
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as ServiceFormData['type'],
                  })
                }
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="interior">Intérieur</option>
                <option value="exterior">Extérieur</option>
                <option value="complete">Complet</option>
                <option value="polishing">Polissage</option>
              </select>
              {errors.type && (
                <p className="text-sm text-error mt-1">{errors.type}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Durée (min)
                </label>
                <input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="60"
                />
                {errors.duration && (
                  <p className="text-sm text-error mt-1">{errors.duration}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="base_price"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Prix de base (€)
                </label>
                <input
                  id="base_price"
                  type="number"
                  step="0.01"
                  value={formData.base_price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      base_price: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="65.00"
                />
                {errors.base_price && (
                  <p className="text-sm text-error mt-1">{errors.base_price}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Description (optionnelle)
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Décrivez votre prestation..."
              />
            </div>

            <div>
              <label
                htmlFor="image_url"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                URL de l'image (optionnelle)
              </label>
              <input
                id="image_url"
                type="url"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              {errors.image_url && (
                <p className="text-sm text-error mt-1">{errors.image_url}</p>
              )}
            </div>
          </div>
        </Card>

        {Object.keys(errors).length > 0 && (
          <Card className="bg-error/10 border border-error/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-error mb-1">
                  Erreurs de validation
                </p>
                <p className="text-xs text-text-secondary">
                  Veuillez corriger les erreurs avant de continuer
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="ghost"
            fullWidth
            onClick={() => navigate('/admin/prestations')}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={createService.isPending || updateService.isPending}
          >
            <Save className="w-5 h-5 mr-2" />
            {isEditing ? 'Enregistrer' : 'Créer'}
          </Button>
        </div>
      </form>
    </div>
  );
};
