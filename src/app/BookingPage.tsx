import { useState } from 'react';
import { Calendar, MapPin, Home as HomeIcon, Briefcase, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Stepper } from '../components/ui/Stepper';
import { routes } from '../config/routes';

interface Address {
  streetNumber: string;
  street: string;
  city: string;
  postalCode: string;
}

export const BookingPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('30 avril 2026');
  const [selectedTime, setSelectedTime] = useState('11:00');
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [tempDate, setTempDate] = useState('');
  const [locationType, setLocationType] = useState<'home' | 'work' | null>(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState<Address>({
    streetNumber: '',
    street: '',
    city: '',
    postalCode: '',
  });

  const steps = [
    { label: 'Date', completed: false },
    { label: 'Lieu', completed: false },
    { label: 'Confirmer', completed: false },
  ];

  const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

  const handleLocationTypeSelect = (type: 'home' | 'work') => {
    setLocationType(type);
    setIsEditingAddress(true);
  };

  const handleAddressChange = (field: keyof Address, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveAddress = () => {
    setIsEditingAddress(false);
  };

  const handleEditDate = () => {
    setIsEditingDate(true);
    const today = new Date();
    setTempDate(today.toISOString().split('T')[0]);
  };

  const handleSaveDate = () => {
    if (tempDate) {
      const date = new Date(tempDate);
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('fr-FR', options);
      setSelectedDate(formattedDate);
      setIsEditingDate(false);
    }
  };

  const handleCancelDateEdit = () => {
    setIsEditingDate(false);
    setTempDate('');
  };

  const formatAddress = () => {
    if (!address.streetNumber && !address.street && !address.city && !address.postalCode) {
      return '';
    }
    return `${address.streetNumber} ${address.street}, ${address.postalCode} ${address.city}`.trim();
  };

  const isAddressComplete = address.streetNumber && address.street && address.city && address.postalCode;

  return (
    <div className="p-4 space-y-6">
      <section className="pt-6 pb-4">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Choisissez votre créneau
        </h1>
        <p className="text-text-secondary">
          Sélectionnez la date et l'heure
        </p>
      </section>

      <Stepper steps={steps} currentStep={0} />

      <Card>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-text-primary">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Date et heure</h3>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            {!isEditingDate ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-text-primary font-medium">{selectedDate}</span>
                  <Button variant="ghost" size="sm" onClick={handleEditDate}>
                    Modifier
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                        selectedTime === time
                          ? 'bg-primary text-white'
                          : 'bg-slate-800 text-text-secondary hover:bg-slate-700'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-2">
                    Choisissez votre date
                  </label>
                  <input
                    type="date"
                    value={tempDate}
                    onChange={(e) => setTempDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={handleCancelDateEdit}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handleSaveDate}
                    disabled={!tempDate}
                  >
                    Enregistrer
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-text-primary">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Lieu</h3>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleLocationTypeSelect('home')}
              className={`w-full p-4 rounded-lg border-2 transition-colors ${
                locationType === 'home'
                  ? 'border-primary bg-primary/5'
                  : 'border-slate-700 bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    locationType === 'home' ? 'border-primary' : 'border-slate-600'
                  }`}
                >
                  {locationType === 'home' && (
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  )}
                </div>
                <HomeIcon className="w-5 h-5 text-text-primary" />
                <span className="text-text-primary font-medium">À votre domicile</span>
              </div>
            </button>

            <button
              onClick={() => handleLocationTypeSelect('work')}
              className={`w-full p-4 rounded-lg border-2 transition-colors ${
                locationType === 'work'
                  ? 'border-primary bg-primary/5'
                  : 'border-slate-700 bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    locationType === 'work' ? 'border-primary' : 'border-slate-600'
                  }`}
                >
                  {locationType === 'work' && (
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  )}
                </div>
                <Briefcase className="w-5 h-5 text-text-primary" />
                <span className="text-text-primary font-medium">Sur votre lieu de travail</span>
              </div>
            </button>
          </div>

          {locationType && !isEditingAddress && formatAddress() && (
            <div className="mt-4 p-3 bg-slate-900 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Adresse</p>
                  <p className="text-text-primary font-medium">{formatAddress()}</p>
                </div>
                <button
                  onClick={() => setIsEditingAddress(true)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4 text-text-secondary" />
                </button>
              </div>
            </div>
          )}

          {locationType && isEditingAddress && (
            <div className="mt-4 p-4 bg-slate-900 rounded-lg space-y-4">
              <p className="text-sm text-text-secondary font-medium">Adresse</p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-text-secondary mb-1">
                    Numéro
                  </label>
                  <input
                    type="text"
                    value={address.streetNumber}
                    onChange={(e) => handleAddressChange('streetNumber', e.target.value)}
                    placeholder="15"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-secondary mb-1">
                    Code postal
                  </label>
                  <input
                    type="text"
                    value={address.postalCode}
                    onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                    placeholder="75001"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-text-secondary mb-1">
                  Rue
                </label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  placeholder="Rue de Rivoli"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs text-text-secondary mb-1">
                  Ville
                </label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  placeholder="Paris"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button
                variant="primary"
                fullWidth
                onClick={handleSaveAddress}
                disabled={!isAddressComplete}
              >
                Enregistrer l'adresse
              </Button>
            </div>
          )}
        </div>
      </Card>

      <Button
        variant="primary"
        fullWidth
        onClick={() => navigate(routes.checkout)}
        disabled={!locationType || !isAddressComplete || isEditingAddress}
      >
        Continuer
      </Button>
    </div>
  );
};
