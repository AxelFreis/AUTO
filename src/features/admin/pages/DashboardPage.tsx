import { TrendingUp, Calendar, FileText, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard } from '../../../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { useAdminStats } from '../hooks/useAdminStats';

export const DashboardPage = () => {
  const { data: stats, isLoading, error } = useAdminStats();

  if (isLoading) {
    return (
      <div className="p-4 space-y-6">
        <section className="pt-6 pb-4">
          <div className="h-8 bg-slate-800 rounded animate-pulse w-48 mb-2" />
          <div className="h-4 bg-slate-800 rounded animate-pulse w-32" />
        </section>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-slate-800 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !stats) {
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
                  Impossible de charger les statistiques
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
          Tableau de bord
        </h1>
        <p className="text-text-secondary">
          Vue d'ensemble de votre activité
        </p>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          title="Demandes"
          value={stats.pending_bookings}
          icon={Calendar}
        />
        <StatCard
          title="Réservations"
          value={stats.bookings_count}
          icon={Calendar}
        />
        <StatCard
          title="Chiffre d'affaires"
          value={`${stats.revenue.toFixed(0)}€`}
          icon={TrendingUp}
        />
        <StatCard
          title="Terminées aujourd'hui"
          value={stats.completed_today}
          icon={FileText}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chiffre d'affaires mensuel</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={stats.monthly_revenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="month"
                stroke="#94A3B8"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#94A3B8"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `${value}€`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                }}
                formatter={(value: number) => [`${value.toFixed(0)}€`, 'CA']}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#9B0B0B"
                strokeWidth={2}
                dot={{ fill: '#9B0B0B', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
