import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Shield, Leaf, DollarSign, Filter } from 'lucide-react';

interface FilterPanelProps {
  effectivenessWeight: number;
  ecoWeight: number;
  costWeight: number;
  onEffectivenessChange: (value: number) => void;
  onEcoChange: (value: number) => void;
  onCostChange: (value: number) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
}

const categories = [
  { id: 'personal', label: 'Protection personnelle' },
  { id: 'landscaping', label: 'Aménagement paysager' },
  { id: 'wildlife', label: 'Gestion de la faune' },
  { id: 'other', label: 'Autre' },
];

const FilterPanel = ({
  effectivenessWeight, ecoWeight, costWeight,
  onEffectivenessChange, onEcoChange, onCostChange,
  selectedCategories, onCategoryToggle,
}: FilterPanelProps) => {
  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Vos priorités</h2>
      </div>
      
      <p className="text-sm text-muted-foreground mb-6">
        Ajustez les curseurs pour prioriser ce qui compte le plus pour vous. Les solutions seront classées en conséquence.
      </p>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Shield className="h-4 w-4 text-effectiveness-high" />
              Efficacité
            </Label>
            <span className="text-sm font-semibold text-primary">{effectivenessWeight}%</span>
          </div>
          <Slider value={[effectivenessWeight]} onValueChange={([v]) => onEffectivenessChange(v)} max={100} step={5} className="w-full" />
          <p className="text-xs text-muted-foreground">Quelle importance accordez-vous à l'efficacité prouvée pour réduire les populations de tiques?</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Leaf className="h-4 w-4 text-eco-safe" />
              Écologique
            </Label>
            <span className="text-sm font-semibold text-primary">{ecoWeight}%</span>
          </div>
          <Slider value={[ecoWeight]} onValueChange={([v]) => onEcoChange(v)} max={100} step={5} className="w-full" />
          <p className="text-xs text-muted-foreground">Quelle importance accordez-vous à la minimisation de l'impact environnemental?</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <DollarSign className="h-4 w-4 text-cost-low" />
              Abordabilité
            </Label>
            <span className="text-sm font-semibold text-primary">{costWeight}%</span>
          </div>
          <Slider value={[costWeight]} onValueChange={([v]) => onCostChange(v)} max={100} step={5} className="w-full" />
          <p className="text-xs text-muted-foreground">Quelle importance accordez-vous au maintien de faibles coûts?</p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <Label className="text-sm font-medium mb-3 block">Filtrer par catégorie</Label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategories.includes(category.id) ? 'default' : 'outline'}
              className="cursor-pointer transition-all hover:scale-105"
              onClick={() => onCategoryToggle(category.id)}
            >
              {category.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
