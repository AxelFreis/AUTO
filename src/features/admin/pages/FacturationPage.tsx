import { useState } from 'react';
import { Download, Mail, FileText, AlertCircle, Filter } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/ui/EmptyState';
import { PriceTag } from '../../../components/ui/PriceTag';
import {
  useInvoices,
  useUpdateInvoiceStatus,
  useGenerateInvoicePDF,
  useSendPaymentReminder,
} from '../hooks/useInvoices';

export const FacturationPage = () => {
  const { data: invoices, isLoading, error } = useInvoices();
  const updateStatus = useUpdateInvoiceStatus();
  const generatePDF = useGenerateInvoicePDF();
  const sendReminder = useSendPaymentReminder();

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const filteredInvoices = invoices?.filter((invoice) => {
    const invoiceDate = new Date(invoice.issued_at);
    if (invoiceDate.getFullYear() !== selectedYear) return false;
    if (selectedMonth !== null && invoiceDate.getMonth() !== selectedMonth) return false;
    return true;
  });

  const handleDownloadPDF = async (invoiceId: string) => {
    const invoice = invoices?.find((inv) => inv.id === invoiceId);
    if (!invoice) return;

    try {
      const pdfData = await generatePDF.mutateAsync(invoice);
      const link = document.createElement('a');
      link.href = pdfData;
      link.download = `${invoice.invoice_number}.pdf`;
      link.click();
    } catch {
      alert('Erreur lors de la génération du PDF');
    }
  };

  const handleSendReminder = async (invoiceId: string, userEmail: string) => {
    try {
      await sendReminder.mutateAsync({ invoiceId, userEmail });
      alert('Rappel envoyé avec succès');
    } catch {
      alert('Erreur lors de l\'envoi du rappel');
    }
  };

  const handleMarkAsPaid = async (id: string) => {
    try {
      await updateStatus.mutateAsync({ id, status: 'paid' });
    } catch {
      alert('Erreur lors de la mise à jour');
    }
  };

  const exportAllPDFs = () => {
    alert('Export de toutes les factures en cours...');
  };

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

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
                  Impossible de charger les factures
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
          Facturation
        </h1>
        <p className="text-text-secondary">
          Gérez vos factures et paiements
        </p>
      </section>

      <Card>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-text-primary mb-2">
            <Filter className="w-5 h-5" />
            <h3 className="font-semibold">Filtres</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Année
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[2024, 2025, 2026].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Mois
              </label>
              <select
                value={selectedMonth === null ? '' : selectedMonth}
                onChange={(e) =>
                  setSelectedMonth(e.target.value === '' ? null : parseInt(e.target.value))
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Tous</option>
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      <Button variant="secondary" fullWidth onClick={exportAllPDFs}>
        <Download className="w-5 h-5 mr-2" />
        Exporter les factures PDF
      </Button>

      {!filteredInvoices || filteredInvoices.length === 0 ? (
        <Card>
          <EmptyState
            icon={FileText}
            title="Aucune facture"
            description="Les factures apparaîtront ici après la création"
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredInvoices.map((invoice) => (
            <Card
              key={invoice.id}
              className="border-l-4"
              style={{
                borderLeftColor: invoice.status === 'paid' ? '#10B981' : '#F59E0B',
              }}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">
                      {invoice.invoice_number}
                    </p>
                    <p className="font-medium text-text-primary">
                      {invoice.booking?.service?.name || 'Prestation'}
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      {new Date(invoice.issued_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <PriceTag amount={invoice.amount} size="sm" />
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs mt-1 ${
                        invoice.status === 'paid'
                          ? 'bg-success/20 text-success'
                          : 'bg-warning/20 text-warning'
                      }`}
                    >
                      {invoice.status === 'paid' ? 'Payé' : 'En attente'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-700">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleDownloadPDF(invoice.id)}
                    disabled={generatePDF.isPending}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>

                  {invoice.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          handleSendReminder(
                            invoice.id,
                            invoice.booking?.user?.email || ''
                          )
                        }
                        disabled={sendReminder.isPending}
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        Rappel
                      </Button>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleMarkAsPaid(invoice.id)}
                        disabled={updateStatus.isPending}
                      >
                        Marquer payé
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
