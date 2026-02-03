import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Leaf, 
  DollarSign, 
  ChevronDown, 
  ChevronUp,
  Info,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  XCircle
} from 'lucide-react';
import type { Intervention, EffectivenessLevel, EcoLevel, CostLevel } from '@/data/interventions';

interface InterventionCardProps {
  intervention: Intervention;
  score: number;
  rank: number;
}

const effectivenessConfig: Record<EffectivenessLevel, { icon: typeof CheckCircle2; label: string; className: string }> = {
  high: { icon: CheckCircle2, label: 'High', className: 'text-effectiveness-high bg-effectiveness-high/10' },
  medium: { icon: AlertTriangle, label: 'Medium', className: 'text-effectiveness-medium bg-effectiveness-medium/10' },
  low: { icon: XCircle, label: 'Low', className: 'text-effectiveness-low bg-effectiveness-low/10' },
  unknown: { icon: HelpCircle, label: 'Unknown', className: 'text-effectiveness-unknown bg-effectiveness-unknown/10' },
};

const ecoConfig: Record<EcoLevel, { icon: typeof CheckCircle2; label: string; className: string }> = {
  safe: { icon: CheckCircle2, label: 'Safe', className: 'text-eco-safe bg-eco-safe/10' },
  caution: { icon: AlertTriangle, label: 'Caution', className: 'text-eco-caution bg-eco-caution/10' },
  risk: { icon: XCircle, label: 'Risk', className: 'text-eco-risk bg-eco-risk/10' },
};

const costConfig: Record<CostLevel, { icon: typeof CheckCircle2; label: string; className: string }> = {
  low: { icon: CheckCircle2, label: 'Low', className: 'text-cost-low bg-cost-low/10' },
  medium: { icon: AlertTriangle, label: 'Medium', className: 'text-cost-medium bg-cost-medium/10' },
  high: { icon: XCircle, label: 'High', className: 'text-cost-high bg-cost-high/10' },
};

const InterventionCard = ({ intervention, score, rank }: InterventionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const EffectivenessIcon = effectivenessConfig[intervention.effectiveness].icon;
  const EcoIcon = ecoConfig[intervention.environmentalImpact].icon;
  const CostIcon = costConfig[intervention.cost].icon;

  return (
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
                  Strong Evidence
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg font-bold leading-tight">
              {intervention.name}
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
        {/* Quick Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg ${effectivenessConfig[intervention.effectiveness].className}`}>
            <Shield className="h-4 w-4" />
            <span className="text-xs font-medium">{effectivenessConfig[intervention.effectiveness].label}</span>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg ${ecoConfig[intervention.environmentalImpact].className}`}>
            <Leaf className="h-4 w-4" />
            <span className="text-xs font-medium">{ecoConfig[intervention.environmentalImpact].label}</span>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg ${costConfig[intervention.cost].className}`}>
            <DollarSign className="h-4 w-4" />
            <span className="text-xs font-medium">{costConfig[intervention.cost].label}</span>
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {intervention.instructions}
        </p>

        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between text-muted-foreground hover:text-foreground"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            {isExpanded ? 'Hide Details' : 'Show Details'}
          </span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-4 animate-fade-in">
            <DetailSection 
              icon={<Shield className="h-4 w-4 text-primary" />}
              title="Effectiveness"
              content={intervention.effectivenessDetails}
              badge={intervention.evidenceQuality === 'strong' ? 'Strong evidence' : 'Limited evidence'}
              badgeVariant={intervention.evidenceQuality === 'strong' ? 'default' : 'secondary'}
            />
            
            <DetailSection 
              icon={<Leaf className="h-4 w-4 text-primary" />}
              title="Environmental Impact"
              content={intervention.environmentalDetails}
            />
            
            <DetailSection 
              icon={<AlertTriangle className="h-4 w-4 text-primary" />}
              title="Health & Safety"
              content={intervention.healthRisks}
            />
            
            <DetailSection 
              icon={<DollarSign className="h-4 w-4 text-primary" />}
              title="Cost Details"
              content={`${intervention.costDetails}. Annual investment: ${intervention.annualInvestment}`}
            />
            
            <DetailSection 
              icon={<Info className="h-4 w-4 text-primary" />}
              title="Ease of Use"
              content={`${intervention.easeOfUse}. ${intervention.availability}`}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface DetailSectionProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  badge?: string;
  badgeVariant?: 'default' | 'secondary';
}

const DetailSection = ({ icon, title, content, badge, badgeVariant = 'secondary' }: DetailSectionProps) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-sm font-semibold text-foreground">{title}</span>
      {badge && (
        <Badge variant={badgeVariant} className="text-xs ml-auto">
          {badge}
        </Badge>
      )}
    </div>
    <p className="text-sm text-muted-foreground pl-6">{content}</p>
  </div>
);

export default InterventionCard;
