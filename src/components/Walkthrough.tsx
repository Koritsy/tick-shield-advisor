import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, LayoutGrid, GitCompareArrows, Info, ChevronRight, ChevronLeft, Lightbulb } from 'lucide-react';

const steps = [
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'Bienvenue !',
    description: 'Cet outil vous aide à trouver les meilleures solutions de prévention contre les tiques, adaptées à vos priorités. Voici comment ça fonctionne.',
  },
  {
    icon: <SlidersHorizontal className="h-8 w-8 text-primary" />,
    title: 'Ajustez vos priorités',
    description: 'Utilisez les curseurs à gauche pour définir l\'importance de chaque critère : efficacité, impact environnemental, coût, santé, facilité d\'utilisation et fréquence d\'application. Les solutions seront automatiquement reclassées.',
  },
  {
    icon: <LayoutGrid className="h-8 w-8 text-primary" />,
    title: 'Explorez les solutions',
    description: 'Chaque carte affiche un score calculé selon vos priorités, ainsi que des indicateurs visuels pour chaque critère. Cliquez sur « Détails » pour voir les informations complètes et le mode d\'emploi.',
  },
  {
    icon: <GitCompareArrows className="h-8 w-8 text-primary" />,
    title: 'Comparez côte à côte',
    description: 'Sélectionnez 2 solutions ou plus en cliquant sur « Comparer », puis utilisez le bouton flottant en bas de l\'écran pour ouvrir un tableau comparatif détaillé.',
  },
  {
    icon: <Info className="h-8 w-8 text-primary" />,
    title: 'Indicateurs de preuves',
    description: 'Les icônes ✓ (vert) et ⚠ (orange) à côté des critères indiquent la qualité des preuves scientifiques : solides ou limitées. Cela vous aide à évaluer la fiabilité des données.',
  },
];

interface WalkthroughProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Walkthrough = ({ open, onOpenChange }: WalkthroughProps) => {
  const [step, setStep] = useState(0);

  const handleClose = () => {
    setStep(0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">Guide d'utilisation</DialogTitle>
          <DialogDescription className="sr-only">Étape {step + 1} sur {steps.length}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center text-center py-4 space-y-4">
          <div className="p-4 rounded-full bg-primary/10">
            {steps[step].icon}
          </div>
          <h3 className="text-lg font-bold text-foreground">{steps[step].title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{steps[step].description}</p>

          {/* Step dots */}
          <div className="flex gap-1.5 pt-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${i === step ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30'}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2 w-full">
            {step > 0 && (
              <Button variant="outline" size="sm" className="flex-1" onClick={() => setStep(step - 1)}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Précédent
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button size="sm" className="flex-1" onClick={() => setStep(step + 1)}>
                Suivant
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button size="sm" className="flex-1" onClick={handleClose}>
                C'est parti !
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Walkthrough;
