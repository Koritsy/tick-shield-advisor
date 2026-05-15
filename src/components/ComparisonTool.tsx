import { useState, useMemo } from 'react';
import FilterPanel from './FilterPanel';
import InterventionCard from './InterventionCard';
import ComparisonModal from './ComparisonModal';
import Walkthrough from './Walkthrough';
import { Button } from '@/components/ui/button';
import { GitCompareArrows, X, HelpCircle } from 'lucide-react';
import { interventions, regions, isAvailableInRegion, type Region } from '@/data/interventions';
import type { Intervention } from '@/data/interventions';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const calculateScore = (
  intervention: Intervention,
  effectivenessWeight: number,
  ecoWeight: number,
  costWeight: number,
  healthWeight: number,
  easeWeight: number,
  frequencyWeight: number,
): number => {
  const totalWeight = effectivenessWeight + ecoWeight + costWeight + healthWeight + easeWeight + frequencyWeight;
  if (totalWeight === 0) return 50;
  const weightedScore =
    intervention.effectivenessScore * (effectivenessWeight / totalWeight) +
    intervention.ecoScore * (ecoWeight / totalWeight) +
    intervention.costScore * (costWeight / totalWeight) +
    intervention.healthScore * (healthWeight / totalWeight) +
    intervention.easeScore * (easeWeight / totalWeight) +
    intervention.frequencyScore * (frequencyWeight / totalWeight);

  const finalScore = (weightedScore * intervention.categoryScore) / 100;

  return finalScore;
};

const ComparisonTool = () => {
  const [effectivenessWeight, setEffectivenessWeight] = useState(50);
  const [ecoWeight, setEcoWeight] = useState(30);
  const [costWeight, setCostWeight] = useState(20);
  const [healthWeight, setHealthWeight] = useState(30);
  const [easeWeight, setEaseWeight] = useState(20);
  const [frequencyWeight, setFrequencyWeight] = useState(20);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'personal', 'landscaping', 'wildlife', 'other',
  ]);
  const [selectedRegion, setSelectedRegion] = useState<Region>('qc');

  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [walkthroughOpen, setWalkthroughOpen] = useState(true);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleToggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const compareInterventions = useMemo(() =>
    interventions.filter((i) => compareIds.includes(i.id)),
    [compareIds]
  );

  const rankedInterventions = useMemo(() => {
    return interventions
      .filter((intervention) => selectedCategories.includes(intervention.category))
      .map((intervention) => ({
        intervention,
        score: calculateScore(intervention, effectivenessWeight, ecoWeight, costWeight, healthWeight, easeWeight, frequencyWeight),
      }))
      .sort((a, b) => b.score - a.score);
  }, [effectivenessWeight, ecoWeight, costWeight, healthWeight, easeWeight, frequencyWeight, selectedCategories]);

  const requiredIds = ['protective-behaviors', 'self-check'];

  return (
    <section id="compare" className="py-12 md:py-16 gradient-nature">
      <div className="container px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Comparez les solutions de prévention contre les tiques
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
           Ajustez vos priorités et nous classerons les solutions qui correspondent le mieux à vos valeurs. Cliquez sur une solution pour voir les détails.
          </p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => setWalkthroughOpen(true)}>
            <HelpCircle className="h-4 w-4 mr-1.5" />
            Comment ça marche ?
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1" data-tour="filter-panel">
            <div className="lg:sticky lg:top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <FilterPanel
                effectivenessWeight={effectivenessWeight}
                ecoWeight={ecoWeight}
                costWeight={costWeight}
                healthWeight={healthWeight}
                easeWeight={easeWeight}
                frequencyWeight={frequencyWeight}
                onEffectivenessChange={setEffectivenessWeight}
                onEcoChange={setEcoWeight}
                onCostChange={setCostWeight}
                onHealthChange={setHealthWeight}
                onEaseChange={setEaseWeight}
                onFrequencyChange={setFrequencyWeight}
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex flex-col gap-2 mb-4">
              <div>
                <h3 className="text-lg font-semibold">Toutes les solutions</h3>
                <p className="text-sm text-muted-foreground">
                  Affichage de toutes les interventions correspondant aux filtres de catégorie et de priorité.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">
                  {rankedInterventions.length} interventions trouvées
                </span>
                <div className="flex items-center gap-2">
                  <Label htmlFor="region-select" className="text-sm font-medium whitespace-nowrap">Région :</Label>
                  <Select value={selectedRegion} onValueChange={(v) => setSelectedRegion(v as Region)}>
                    <SelectTrigger id="region-select" className="w-[220px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((r) => (
                        <SelectItem key={r.id} value={r.id}>{r.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rankedInterventions.map(({ intervention }, index) => (
                <InterventionCard
                  key={intervention.id}
                  intervention={intervention}
                  rank={index + 1}
                  isEssential={requiredIds.includes(intervention.id)}
                  isComparing={compareIds.includes(intervention.id)}
                  onToggleCompare={handleToggleCompare}
                  isAvailable={isAvailableInRegion(intervention.id, selectedRegion)}
                />
              ))}
            </div>

            {rankedInterventions.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Aucune solution ne correspond à vos filtres actuels. Essayez de sélectionner plus de catégories.
              </div>
            )}
          </div>
        </div>
      </div>

      {compareIds.length >= 2 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg">
          <span className="text-sm font-medium">{compareIds.length} solutions sélectionnées</span>
          <Button size="sm" variant="secondary" onClick={() => setCompareOpen(true)}>
            <GitCompareArrows className="h-4 w-4 mr-1" />
            Comparer
          </Button>
          <Button size="icon" variant="ghost" className="h-7 w-7 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10" onClick={() => setCompareIds([])}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <ComparisonModal open={compareOpen} onOpenChange={setCompareOpen} interventions={compareInterventions} />
      <Walkthrough 
        open={walkthroughOpen} 
        onOpenChange={setWalkthroughOpen}
        effectivenessWeight={effectivenessWeight}
        onEffectivenessChange={setEffectivenessWeight}
        ecoWeight={ecoWeight}
        onEcoChange={setEcoWeight}
        costWeight={costWeight}
        onCostChange={setCostWeight}
        healthWeight={healthWeight}
        onHealthChange={setHealthWeight}
        easeWeight={easeWeight}
        onEaseChange={setEaseWeight}
        frequencyWeight={frequencyWeight}
        onFrequencyChange={setFrequencyWeight}
      />
    </section>
  );
};

export default ComparisonTool;
