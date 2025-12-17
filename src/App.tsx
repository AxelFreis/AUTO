import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppLayout } from './components/layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './app/HomePage';
import { LoginPage } from './app/LoginPage';
import { QuotePage } from './app/QuotePage';
import { BookingPage } from './app/BookingPage';
import { CheckoutPage } from './app/CheckoutPage';
import { SuccessPage } from './app/SuccessPage';
import { AccountPage } from './app/AccountPage';
import { routes } from './config/routes';
import { LoginAdminPage } from './features/admin/pages/LoginAdminPage';
import { AdminLayout } from './features/admin/components/AdminLayout';
import { DashboardPage } from './features/admin/pages/DashboardPage';
import { PrestationsListPage } from './features/admin/pages/PrestationsListPage';
import { PrestationFormPage } from './features/admin/pages/PrestationFormPage';
import { ClientsPage } from './features/admin/pages/ClientsPage';
import { PlanningPage } from './features/admin/pages/PlanningPage';
import { FacturationPage } from './features/admin/pages/FacturationPage';
import { useAuthStore } from './services/auth';
import { supabase } from './services/supabase';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          full_name: session.user.user_metadata?.full_name,
          role: 'client',
          created_at: session.user.created_at,
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.login} element={<LoginPage />} />

          <Route element={<AppLayout showHeader={false} />}>
            <Route
              path={routes.home}
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route element={<AppLayout headerTitle="Devis instantané" />}>
            <Route
              path={routes.quote}
              element={
                <ProtectedRoute>
                  <QuotePage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route element={<AppLayout headerTitle="Réservation" />}>
            <Route
              path={routes.booking}
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route element={<AppLayout headerTitle="Confirmation" />}>
            <Route
              path={routes.checkout}
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route element={<AppLayout showHeader={false} />}>
            <Route
              path={routes.success}
              element={
                <ProtectedRoute>
                  <SuccessPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route element={<AppLayout headerTitle="Mon compte" />}>
            <Route
              path={routes.account}
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/login-admin" element={<LoginAdminPage />} />

          <Route element={<AdminLayout title="Dashboard" />}>
            <Route path="/admin" element={<DashboardPage />} />
          </Route>
          <Route element={<AdminLayout title="Prestations" />}>
            <Route path="/admin/prestations" element={<PrestationsListPage />} />
          </Route>
          <Route element={<AdminLayout title="Nouvelle prestation" />}>
            <Route path="/admin/prestations/new" element={<PrestationFormPage />} />
          </Route>
          <Route element={<AdminLayout title="Modifier prestation" />}>
            <Route path="/admin/prestations/:id" element={<PrestationFormPage />} />
          </Route>
          <Route element={<AdminLayout title="Clients" />}>
            <Route path="/admin/clients" element={<ClientsPage />} />
          </Route>
          <Route element={<AdminLayout title="Planning" />}>
            <Route path="/admin/planning" element={<PlanningPage />} />
          </Route>
          <Route element={<AdminLayout title="Facturation" />}>
            <Route path="/admin/facturation" element={<FacturationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
