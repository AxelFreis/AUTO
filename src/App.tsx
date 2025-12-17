import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppLayout } from './components/layout';
import { HomePage } from './app/HomePage';
import { QuotePage } from './app/QuotePage';
import { BookingPage } from './app/BookingPage';
import { CheckoutPage } from './app/CheckoutPage';
import { SuccessPage } from './app/SuccessPage';
import { AccountPage } from './app/AccountPage';
import { AdminPage } from './app/AdminPage';
import { routes } from './config/routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout showHeader={false} />}>
            <Route path={routes.home} element={<HomePage />} />
          </Route>
          <Route element={<AppLayout headerTitle="Devis instantané" />}>
            <Route path={routes.quote} element={<QuotePage />} />
          </Route>
          <Route element={<AppLayout headerTitle="Réservation" />}>
            <Route path={routes.booking} element={<BookingPage />} />
          </Route>
          <Route element={<AppLayout headerTitle="Confirmation" />}>
            <Route path={routes.checkout} element={<CheckoutPage />} />
          </Route>
          <Route element={<AppLayout showHeader={false} />}>
            <Route path={routes.success} element={<SuccessPage />} />
          </Route>
          <Route element={<AppLayout headerTitle="Mon compte" />}>
            <Route path={routes.account} element={<AccountPage />} />
          </Route>
          <Route element={<AppLayout headerTitle="Administration" showNotifications />}>
            <Route path={routes.admin} element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
