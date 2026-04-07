import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

interface TourStep {
  target: string; // data-tour attribute value
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    target: 'filter-panel',
    title: '1. Ajustez vos priorités',
    description: 'Déplacez les curseurs pour indiquer ce qui compte le plus pour vous : efficacité, impact environnemental, coût, santé, facilité et fréquence. Le classement se met à jour instantanément.',
    position: 'right',
  },
  {
    target: 'category-filter',
    title: '2. Filtrez par catégorie',
    description: 'Cliquez sur les badges pour afficher ou masquer les solutions par type : protection personnelle, aménagement paysager, gestion de la faune, etc.',
    position: 'right',
  },
  {
    target: 'first-card',
    title: '3. Explorez les solutions',
    description: 'Chaque carte affiche un score et des indicateurs visuels. Les icônes ✓ et ⚠ montrent la qualité des preuves scientifiques. Cliquez « Détails » pour tout voir, y compris le mode d\'emploi.',
    position: 'left',
  },
  {
    target: 'compare-button',
    title: '4. Comparez côte à côte',
    description: 'Sélectionnez 2 solutions ou plus avec ce bouton, puis un panneau flottant apparaîtra en bas pour ouvrir le comparatif détaillé.',
    position: 'top',
  },
];

interface WalkthroughProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Walkthrough = ({ open, onOpenChange }: WalkthroughProps) => {
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (!open) return;
    const currentStep = tourSteps[step];
    const el = document.querySelector(`[data-tour="${currentStep.target}"]`);
    if (el) {
      const rect = el.getBoundingClientRect();
      const currentY = window.scrollY || document.documentElement.scrollTop;
      const targetY = currentY + rect.top - window.innerHeight / 2 + rect.height / 2;

      window.scrollTo({ top: targetY, behavior: 'auto' });
      setTargetRect(el.getBoundingClientRect());
    }
  }, [step, open]);

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [updatePosition]);

  const handleClose = () => {
    setStep(0);
    onOpenChange(false);
  };

  const handleNext = () => {
    if (step < tourSteps.length - 1) setStep(step + 1);
    else handleClose();
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  if (!open || !targetRect) return null;

  const pad = 8;
  const highlightStyle = {
    top: targetRect.top - pad,
    left: targetRect.left - pad,
    width: targetRect.width + pad * 2,
    height: targetRect.height + pad * 2,
  };

  const currentStep = tourSteps[step];

  // Calculate tooltip position
  const getTooltipStyle = (): React.CSSProperties => {
    const gap = 16;
    switch (currentStep.position) {
      case 'right':
        return {
          top: targetRect.top + targetRect.height / 2,
          left: targetRect.right + pad + gap,
          transform: 'translateY(-50%)',
          maxWidth: 340,
        };
      case 'left':
        return {
          top: targetRect.top + targetRect.height / 2,
          right: window.innerWidth - targetRect.left + pad + gap,
          transform: 'translateY(-50%)',
          maxWidth: 340,
        };
      case 'bottom':
        return {
          top: targetRect.bottom + pad + gap,
          left: targetRect.left + targetRect.width / 2,
          transform: 'translateX(-50%)',
          maxWidth: 340,
        };
      case 'top':
        return {
          bottom: window.innerHeight - targetRect.top + pad + gap,
          left: targetRect.left + targetRect.width / 2,
          transform: 'translateX(-50%)',
          maxWidth: 340,
        };
    }
  };

  // Arrow pointing from tooltip toward the target
  const getArrowStyle = (): { className: string; style: React.CSSProperties } => {
    const size = 10;
    switch (currentStep.position) {
      case 'right':
        return {
          className: '',
          style: {
            position: 'absolute',
            top: '50%',
            left: -size,
            transform: 'translateY(-50%)',
            width: 0,
            height: 0,
            borderTop: `${size}px solid transparent`,
            borderBottom: `${size}px solid transparent`,
            borderRight: `${size}px solid hsl(var(--card))`,
          },
        };
      case 'left':
        return {
          className: '',
          style: {
            position: 'absolute',
            top: '50%',
            right: -size,
            transform: 'translateY(-50%)',
            width: 0,
            height: 0,
            borderTop: `${size}px solid transparent`,
            borderBottom: `${size}px solid transparent`,
            borderLeft: `${size}px solid hsl(var(--card))`,
          },
        };
      case 'bottom':
        return {
          className: '',
          style: {
            position: 'absolute',
            top: -size,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: `${size}px solid transparent`,
            borderRight: `${size}px solid transparent`,
            borderBottom: `${size}px solid hsl(var(--card))`,
          },
        };
      case 'top':
        return {
          className: '',
          style: {
            position: 'absolute',
            bottom: -size,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: `${size}px solid transparent`,
            borderRight: `${size}px solid transparent`,
            borderTop: `${size}px solid hsl(var(--card))`,
          },
        };
    }
  };

  const arrow = getArrowStyle();

  return createPortal(
    <div className="fixed inset-0 z-[9999]" onClick={handleClose}>
      {/* Dark overlay with cutout */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <defs>
          <mask id="tour-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <rect
              x={highlightStyle.left}
              y={highlightStyle.top}
              width={highlightStyle.width}
              height={highlightStyle.height}
              rx="12"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.6)"
          mask="url(#tour-mask)"
          style={{ pointerEvents: 'auto' }}
        />
      </svg>

      {/* Highlight ring */}
      <div
        className="absolute rounded-xl ring-2 ring-primary ring-offset-2 transition-all duration-500 ease-in-out"
        style={{
          top: highlightStyle.top,
          left: highlightStyle.left,
          width: highlightStyle.width,
          height: highlightStyle.height,
          pointerEvents: 'none',
        }}
      />

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed bg-card border border-border rounded-xl shadow-2xl p-5 z-[10000] animate-fade-in"
        style={{
          ...getTooltipStyle(),
          transition: 'all 0.4s ease-in-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={arrow.style} />

        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-foreground">{currentStep.title}</h3>
          <button onClick={handleClose} className="text-muted-foreground hover:text-foreground shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {currentStep.description}
        </p>

        {/* Step dots */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {tourSteps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === step ? 'w-5 bg-primary' : 'w-1.5 bg-muted-foreground/30'}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {step > 0 && (
              <Button variant="ghost" size="sm" className="h-8 px-2" onClick={handlePrev}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            <Button size="sm" className="h-8" onClick={handleNext}>
              {step < tourSteps.length - 1 ? (
                <>Suivant <ChevronRight className="h-4 w-4 ml-1" /></>
              ) : (
                "C'est parti !"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Walkthrough;
