import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Shield, Leaf, DollarSign, Info, CheckCircle2, AlertTriangle, HelpCircle, XCircle, HeartPulse, Wrench, Clock } from 'lucide-react';
import type { Intervention, EffectivenessLevel, EcoLevel, CostLevel, HealthSafetyLevel, EaseOfUseLevel, ApplicationFrequency, AspectEvidenceQuality } from '@/data/interventions';

interface InterventionCardProps {
  intervention: Intervention;
  score: number;
  rank: number;
}

const effectivenessConfig: Record<EffectivenessLevel, { icon: typeof CheckCircle2; label: string; className: string }> = {
  high: { icon: CheckCircle2, label: 'Élevée', className: 'text-effectiveness-high bg-effectiveness-high/10' },
  medium: { icon: AlertTriangle, label: 'Moyenne', className: 'text-effectiveness-medium bg-effectiveness-medium/10' },
  low: { icon: XCircle, label: 'Faible', className: 'text-effectiveness-low bg-effectiveness-low/10' },
  unknown: { icon: HelpCircle, label: 'Inconnue', className: 'text-effectiveness-unknown bg-effectiveness-unknown/10' },
};

const ecoConfig: Record<EcoLevel, { icon: typeof CheckCircle2; label: string; className: string }> = {
  safe: { icon: CheckCircle2, label: 'Sûr', className: 'text-eco-safe bg-eco-safe/10' },
  caution: { icon: AlertTriangle, label: 'Prudence', className: 'text-eco-caution bg-eco-caution/10' },
  risk: { icon: XCircle, label: 'Risque', className: 'text-eco-risk bg-eco-risk/10' },
};

const costConfig: Record<CostLevel, { icon: typeof CheckCircle2; label: string; className: string }> = {
  low: { icon: CheckCircle2, label: 'Faible', className: 'text-cost-low bg-cost-low/10' },
  medium: { icon: AlertTriangle, label: 'Moyen', className: 'text-cost-medium bg-cost-medium/10' },
  high: { icon: XCircle, label: 'Élevé', className: 'text-cost-high bg-cost-high/10' },
};

const healthConfig: Record<HealthSafetyLevel, { icon: typeof CheckCircle2; label: string; className: string }> = {
  safe: { icon: CheckCircle2, label: 'Sûr', className: 'text-eco-safe bg-eco-safe/10' },
  caution: { icon: AlertTriangle, label: 'Prudence', className: 'text-eco-caution bg-eco-caution/10' },
  risk: { icon: XCircle, label: 'Risque', className: 'text-eco-risk bg-eco-risk/10' },
};

const easeConfig: Record<EaseOfUseLevel, { icon: typeof CheckCircle2; label: string; className: string }> = {
  easy: { icon: CheckCircle2, label: 'Facile', className: 'text-eco-safe bg-eco-safe/10' },
  medium: { icon: AlertTriangle, label: 'Moyen', className: 'text-eco-caution bg-eco-caution/10' },
  hard: { icon: XCircle, label: 'Difficile', className: 'text-eco-risk bg-eco-risk/10' },
};

const frequencyConfig: Record<ApplicationFrequency, { icon: typeof CheckCircle2; label: string; className: string }> = {
  once: { icon: CheckCircle2, label: 'Une fois', className: 'text-eco-safe bg-eco-safe/10' },
  seasonal: { icon: AlertTriangle, label: 'Saisonnier', className: 'text-effectiveness-medium bg-effectiveness-medium/10' },
  regular: { icon: AlertTriangle, label: 'Régulier', className: 'text-eco-caution bg-eco-caution/10' },
  frequent: { icon: XCircle, label: 'Fréquent', className: 'text-eco-risk bg-eco-risk/10' },
};

const EvidenceIcon = ({ quality }: { quality: AspectEvidenceQuality }) => {
  if (quality === 'na') return null;
  if (quality === 'strong') return <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />;
  return <AlertTriangle className="h-3 w-3 text-amber-500 shrink-0" />;
};

const InterventionCard = ({ intervention, score, rank }: InterventionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card className="group glass-card hover:shadow-lg transition-all duration-300 overflow-hidden animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs font-medium">
                  {intervention.categoryLabel}
                </Badge>
                {intervention.evidenceQuality === 'strong' && (
                  <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                    Preuves solides
                  </Badge>
                )}
                {intervention.evidenceQuality === 'weak' && (
                  <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 border-amber-500/20">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Preuves limitées
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg font-bold leading-tight">
                {intervention.nameFr}
              </CardTitle>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                #{rank}
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                Score: {Math.round(score)}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg ${effectivenessConfig[intervention.effectiveness].className}`}>
              <Shield className="h-4 w-4" />
              <span className="text-xs font-medium">{effectivenessConfig[intervention.effectiveness].label}</span>
              <EvidenceIcon quality={intervention.effectivenessEvidence} />
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg ${ecoConfig[intervention.environmentalImpact].className}`}>
              <Leaf className="h-4 w-4" />
              <span className="text-xs font-medium">{ecoConfig[intervention.environmentalImpact].label}</span>
              <EvidenceIcon quality={intervention.environmentalEvidence} />
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg ${costConfig[intervention.cost].className}`}>
              <DollarSign className="h-4 w-4" />
              <span className="text-xs font-medium">{costConfig[intervention.cost].label}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg ${healthConfig[intervention.healthSafety].className}`}>
              <HeartPulse className="h-4 w-4" />
              <span className="text-xs font-medium">{healthConfig[intervention.healthSafety].label}</span>
              <EvidenceIcon quality={intervention.healthEvidence} />
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg ${easeConfig[intervention.easeOfUse].className}`}>
              <Wrench className="h-4 w-4" />
              <span className="text-xs font-medium">{easeConfig[intervention.easeOfUse].label}</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg ${frequencyConfig[intervention.applicationFrequency].className}`}>
              <Clock className="h-4 w-4" />
              <span className="text-xs font-medium">{frequencyConfig[intervention.applicationFrequency].label}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {intervention.instructions}
          </p>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(true)}
          >
            <span className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Afficher les détails
            </span>
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{intervention.nameFr}</DialogTitle>
            <DialogDescription>{intervention.categoryLabel}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <DetailSection icon={<Shield className="h-4 w-4 text-primary" />} title="Efficacité" content={intervention.effectivenessDetails}
              badge={intervention.evidenceQuality === 'strong' ? 'Preuves solides' : 'Preuves limitées'}
              badgeVariant={intervention.evidenceQuality === 'strong' ? 'default' : 'secondary'} />
            <DetailSection icon={<Leaf className="h-4 w-4 text-primary" />} title="Impact environnemental" content={intervention.environmentalDetails} />
            <DetailSection icon={<HeartPulse className="h-4 w-4 text-primary" />} title="Santé et sécurité" content={intervention.healthRisks} />
            <DetailSection icon={<DollarSign className="h-4 w-4 text-primary" />} title="Détails des coûts" content={`${intervention.costDetails}. Investissement annuel : ${intervention.annualInvestment}`} />
            <DetailSection icon={<Wrench className="h-4 w-4 text-primary" />} title="Facilité d'utilisation" content={`${intervention.easeOfUseDetails} ${intervention.availability}`} />
            <DetailSection icon={<Clock className="h-4 w-4 text-primary" />} title="Fréquence d'application" content={intervention.applicationFrequencyDetails} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const DetailSection = ({ icon, title, content, badge, badgeVariant = 'secondary' }: {
  icon: React.ReactNode; title: string; content: string; badge?: string; badgeVariant?: 'default' | 'secondary';
}) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-sm font-semibold text-foreground">{title}</span>
      {badge && <Badge variant={badgeVariant} className="text-xs ml-auto">{badge}</Badge>}
    </div>
    <p className="text-sm text-muted-foreground pl-6">{content}</p>
  </div>
);

export default InterventionCard;
