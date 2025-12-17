import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Step {
  label: string;
  completed: boolean;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const Stepper = ({ steps, currentStep, className }: StepperProps) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors',
                  index < currentStep
                    ? 'bg-primary border-primary text-white'
                    : index === currentStep
                    ? 'border-primary text-primary bg-background'
                    : 'border-slate-700 text-slate-500 bg-background'
                )}
              >
                {step.completed ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  'text-xs mt-2 text-center',
                  index <= currentStep ? 'text-text-primary' : 'text-text-muted'
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-2 transition-colors',
                  index < currentStep ? 'bg-primary' : 'bg-slate-700'
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
