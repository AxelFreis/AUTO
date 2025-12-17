import { User, Calendar, FileText, CreditCard, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { useAuthStore } from '../services/auth';
import { routes } from '../config/routes';

export const AccountPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate(routes.login);
  };

  return (
    <div className="p-4 space-y-6">
      <section className="pt-6 pb-4">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Mon compte
        </h1>
        <p className="text-text-secondary">
          {user?.email || 'Gérez votre profil et vos réservations'}
        </p>
      </section>

      <Card>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary">{user?.full_name || 'Utilisateur'}</h3>
            <p className="text-sm text-text-secondary">{user?.email || 'email@example.com'}</p>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">Actions</h3>

        <Card className="hover:bg-background-elevated transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium text-text-primary">Mes réservations</p>
              <p className="text-sm text-text-secondary">Voir l'historique</p>
            </div>
          </div>
        </Card>

        <Card className="hover:bg-background-elevated transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium text-text-primary">Mes factures</p>
              <p className="text-sm text-text-secondary">Télécharger les factures</p>
            </div>
          </div>
        </Card>

        <Card className="hover:bg-background-elevated transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium text-text-primary">Moyens de paiement</p>
              <p className="text-sm text-text-secondary">Gérer les cartes</p>
            </div>
          </div>
        </Card>

        <Card className="hover:bg-background-elevated transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium text-text-primary">Paramètres</p>
              <p className="text-sm text-text-secondary">Préférences du compte</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <EmptyState
          icon={Calendar}
          title="Aucune réservation en cours"
          description="Réservez votre premier nettoyage pour commencer"
          action={
            <Button variant="primary" size="sm" onClick={() => navigate(routes.quote)}>
              Réserver maintenant
            </Button>
          }
        />
      </Card>

      <Button
        variant="danger"
        fullWidth
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5 mr-2" />
        Se déconnecter
      </Button>
    </div>
  );
};
