import { useState } from 'react';
import { Calendar, MapPin, Home as HomeIcon, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Stepper } from '../components/ui/Stepper';
import { routes } from '../config/routes';

export const BookingPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('30 avril 2026');
  const [selectedTime, setSelectedTime] = useState('11:00');
  const [locationType, setLocationType] = useState<'home' | 'work'>('home');

  const steps = [
    { label: 'Date', completed: false },
    { label: 'Lieu', completed: false },
    { label: 'Confirmer', completed: false },
  ];

  const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

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
            <div className="flex items-center justify-between mb-4">
              <span className="text-text-primary font-medium">{selectedDate}</span>
              <Button variant="ghost" size="sm">
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
              onClick={() => setLocationType('home')}
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
              onClick={() => setLocationType('work')}
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

          {locationType === 'home' && (
            <div className="mt-4 p-3 bg-slate-900 rounded-lg">
              <p className="text-sm text-text-secondary">Adresse</p>
              <p className="text-text-primary font-medium">1 Rue Jeanne d'Arc</p>
            </div>
          )}
        </div>
      </Card>

      <Button
        variant="primary"
        fullWidth
        onClick={() => navigate(routes.checkout)}
      >
        Continuer
      </Button>
    </div>
  );
};
