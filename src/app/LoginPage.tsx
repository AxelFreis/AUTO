import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuthStore } from '../services/auth';
import { routes } from '../config/routes';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, signup, isLoading } = useAuthStore();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [error, setError] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        setError('Les mots de passe ne correspondent pas');
        return;
      }
      if (formData.password.length < 6) {
        setError('Le mot de passe doit contenir au moins 6 caractères');
        return;
      }
      if (!formData.fullName) {
        setError('Veuillez entrer votre nom complet');
        return;
      }

      try {
        await signup(formData.email, formData.password, formData.fullName);
        navigate(routes.home);
      } catch (err) {
        setError('Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    } else {
      try {
        await login(formData.email, formData.password);
        navigate(routes.home);
      } catch (err) {
        setError('Email ou mot de passe incorrect');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isSignup ? 'Créer un compte' : 'Connexion'}
          </h1>
          <p className="text-text-secondary">
            {isSignup
              ? 'Rejoignez-nous pour réserver vos prestations'
              : 'Connectez-vous pour accéder à la plateforme'}
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="Jean Dupont"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="exemple@email.com"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Chargement...</span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {isSignup ? (
                    <>
                      <UserPlus className="w-5 h-5" />
                      Créer mon compte
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      Se connecter
                    </>
                  )}
                </span>
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError('');
                }}
                className="text-sm text-primary hover:underline"
              >
                {isSignup
                  ? 'Vous avez déjà un compte ? Connectez-vous'
                  : 'Pas encore de compte ? Inscrivez-vous'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
