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
import { useLanguage } from '@/contexts/LanguageContext';

interface InterventionCardProps {
  intervention: Intervention;
  score: number;
  rank: number;
}

const InterventionCard = ({ intervention, score, rank }: InterventionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { language, t } = useLanguage();

  const effectivenessConfig: Record<EffectivenessLevel, { icon: typeof CheckCircle2; label: string; className: string }> = {
    high: { icon: CheckCircle2, label: t('effectiveness.high'), className: 'text-effectiveness-high bg-effectiveness-high/10' },
    medium: { icon: AlertTriangle, label: t('effectiveness.medium'), className: 'text-effectiveness-medium bg-effectiveness-medium/10' },
    low: { icon: XCircle, label: t('effectiveness.low'), className: 'text-effectiveness-low bg-effectiveness-low/10' },
    unknown: { icon: HelpCircle, label: t('effectiveness.unknown'), className: 'text-effectiveness-unknown bg-effectiveness-unknown/10' },
  };

  const ecoConfig: Record<EcoLevel, { icon: typeof CheckCircle2; label: string; className: string }> = {
    safe: { icon: CheckCircle2, label: t('eco.safe'), className: 'text-eco-safe bg-eco-safe/10' },
    caution: { icon: AlertTriangle, label: t('eco.caution'), className: 'text-eco-caution bg-eco-caution/10' },
    risk: { icon: XCircle, label: t('eco.risk'), className: 'text-eco-risk bg-eco-risk/10' },
  };

  const costConfig: Record<CostLevel, { icon: typeof CheckCircle2; label: string; className: string }> = {
    low: { icon: CheckCircle2, label: t('cost.low'), className: 'text-cost-low bg-cost-low/10' },
    medium: { icon: AlertTriangle, label: t('cost.medium'), className: 'text-cost-medium bg-cost-medium/10' },
    high: { icon: XCircle, label: t('cost.high'), className: 'text-cost-high bg-cost-high/10' },
  };

  const categoryLabels: Record<string, Record<string, string>> = {
    en: {
      personal: 'Personal Protection',
      landscaping: 'Landscaping',
      wildlife: 'Wildlife Management',
      other: 'Other',
    },
    fr: {
      personal: 'Protection personnelle',
      landscaping: 'Aménagement paysager',
      wildlife: 'Gestion de la faune',
      other: 'Autre',
    },
  };

  const displayName = language === 'fr' ? intervention.nameFr : intervention.name;
  const categoryLabel = categoryLabels[language][intervention.category] || intervention.categoryLabel;

  return (
    <Card className="group glass-card hover:shadow-lg transition-all duration-300 overflow-hidden animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs font-medium">
                {categoryLabel}
              </Badge>
              {intervention.evidenceQuality === 'strong' && (
                <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                  {t('card.strongEvidence')}
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg font-bold leading-tight">
              {displayName}
            </CardTitle>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-sm">
              #{rank}
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {t('card.score')}: {Math.round(score)}
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
            {isExpanded ? t('card.hideDetails') : t('card.showDetails')}
          </span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-4 animate-fade-in">
            <DetailSection 
              icon={<Shield className="h-4 w-4 text-primary" />}
              title={t('card.effectiveness')}
              content={intervention.effectivenessDetails}
              badge={intervention.evidenceQuality === 'strong' ? t('card.strongEvidence') : t('card.limitedEvidence')}
              badgeVariant={intervention.evidenceQuality === 'strong' ? 'default' : 'secondary'}
            />
            
            <DetailSection 
              icon={<Leaf className="h-4 w-4 text-primary" />}
              title={t('card.environmentalImpact')}
              content={intervention.environmentalDetails}
            />
            
            <DetailSection 
              icon={<AlertTriangle className="h-4 w-4 text-primary" />}
              title={t('card.healthSafety')}
              content={intervention.healthRisks}
            />
            
            <DetailSection 
              icon={<DollarSign className="h-4 w-4 text-primary" />}
              title={t('card.costDetails')}
              content={`${intervention.costDetails}. ${t('card.annualInvestment')}: ${intervention.annualInvestment}`}
            />
            
            <DetailSection 
              icon={<Info className="h-4 w-4 text-primary" />}
              title={t('card.easeOfUse')}
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
