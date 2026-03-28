import { useState, useMemo } from 'react';
import FilterPanel from './FilterPanel';
import InterventionCard from './InterventionCard';
import ComparisonModal from './ComparisonModal';
import Walkthrough from './Walkthrough';
import { Button } from '@/components/ui/button';
import { GitCompareArrows, X, HelpCircle } from 'lucide-react';
import { interventions } from '@/data/interventions';
import type { Intervention, EffectivenessLevel, EcoLevel, CostLevel, HealthSafetyLevel, EaseOfUseLevel, ApplicationFrequency } from '@/data/interventions';

const effectivenessScores: Record<EffectivenessLevel, number> = {
  high: 100, medium: 60, low: 30, unknown: 40,
};
const ecoScores: Record<EcoLevel, number> = {
  safe: 100, caution: 50, risk: 10,
};
const costScores: Record<CostLevel, number> = {
  low: 100, medium: 60, high: 20,
};
const healthSafetyScores: Record<HealthSafetyLevel, number> = {
  safe: 100, caution: 50, risk: 10,
};
const easeOfUseScores: Record<EaseOfUseLevel, number> = {
  easy: 100, medium: 60, hard: 20,
};
const frequencyScores: Record<ApplicationFrequency, number> = {
  once: 100, seasonal: 75, regular: 40, frequent: 15,
};

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
  const score =
    effectivenessScores[intervention.effectiveness] * (effectivenessWeight / totalWeight) +
    ecoScores[intervention.environmentalImpact] * (ecoWeight / totalWeight) +
    costScores[intervention.cost] * (costWeight / totalWeight) +
    healthSafetyScores[intervention.healthSafety] * (healthWeight / totalWeight) +
    easeOfUseScores[intervention.easeOfUse] * (easeWeight / totalWeight) +
    frequencyScores[intervention.applicationFrequency] * (frequencyWeight / totalWeight);
  return score;
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

  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
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
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                Affichage de {rankedInterventions.length} solutions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rankedInterventions.map(({ intervention, score }, index) => (
                <InterventionCard
                  key={intervention.id}
                  intervention={intervention}
                  score={score}
                  rank={index + 1}
                  isComparing={compareIds.includes(intervention.id)}
                  onToggleCompare={handleToggleCompare}
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
    </section>
  );
};

export default ComparisonTool;
