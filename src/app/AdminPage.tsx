import { Users, Calendar, TrendingUp, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { PriceTag } from '../components/ui/PriceTag';

export const AdminPage = () => {
  const pendingBookings = [
    {
      id: '1',
      client: 'Théo Durandel',
      phone: '06 02 03 44 52',
      service: 'Nettoyage intérieur global',
      duration: '45-60 min',
      status: 'pending',
    },
    {
      id: '2',
      client: 'Axel Linard',
      phone: '06 78 54 89',
      service: 'Polissage carrosserie',
      duration: '25-40 min',
      status: 'pending',
    },
  ];

  const upcomingBookings = [
    {
      id: '3',
      client: 'Lucas Dubois',
      date: '20 Novembre 2026',
      time: '10h00',
      address: '48 rue des Estafes, Lisieux, 94110',
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <section className="pt-6 pb-4">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Tableau de bord
        </h1>
        <p className="text-text-secondary">
          Vue d'ensemble de votre activité
        </p>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          title="Demandes"
          value="7"
          icon={Users}
        />
        <StatCard
          title="Réservations"
          value="12"
          icon={Calendar}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prestations en cours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingBookings.map((booking) => (
              <Card key={booking.id} elevated className="border border-slate-700">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-text-primary">{booking.client}</p>
                      <p className="text-sm text-text-secondary">{booking.phone}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                        <Clock className="w-4 h-4 text-text-secondary" />
                      </button>
                      <button className="p-2 hover:bg-success/20 rounded-lg transition-colors">
                        <CheckCircle className="w-4 h-4 text-success" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-text-primary">{booking.service}</p>
                    <p className="text-xs text-text-secondary">{booking.duration}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Client & Planning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Clients</span>
              <button className="text-sm text-primary hover:underline">
                Clients
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Planning</span>
              <button className="text-sm text-primary hover:underline">
                Planning
              </button>
            </div>

            <div className="h-px bg-slate-700 my-4" />

            <div className="space-y-2">
              <p className="text-xs font-semibold text-text-secondary uppercase">À venir</p>
              {upcomingBookings.map((booking) => (
                <Card key={booking.id} elevated className="bg-slate-900">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-text-primary">{booking.client}</p>
                      <p className="text-sm text-text-secondary">{booking.date} - {booking.time}</p>
                      <p className="text-xs text-text-muted mt-1">{booking.address}</p>
                    </div>
                  </div>
                </Card>
              ))}
              <button className="text-sm text-primary hover:underline">
                Terminés
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Facturation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-text-secondary mb-1">Facture #00156</p>
                <p className="font-medium text-text-primary">Lucas Dubois</p>
              </div>
              <div className="text-right">
                <PriceTag amount={65} size="sm" />
                <span className="inline-block px-2 py-1 rounded text-xs bg-success/20 text-success mt-1">
                  Payé
                </span>
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-text-secondary mb-1">Facture #00157</p>
                <p className="font-medium text-text-primary">Théo Durandel</p>
              </div>
              <div className="text-right">
                <PriceTag amount={45} size="sm" />
                <span className="inline-block px-2 py-1 rounded text-xs bg-warning/20 text-warning mt-1">
                  En attente
                </span>
              </div>
            </div>

            <button className="w-full mt-2 py-2 text-sm text-primary hover:underline">
              Exporter les factures PDF
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
