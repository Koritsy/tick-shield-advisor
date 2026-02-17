import { useState, useMemo } from 'react';
import FilterPanel from './FilterPanel';
import InterventionCard from './InterventionCard';
import { interventions } from '@/data/interventions';
import type { Intervention, EffectivenessLevel, EcoLevel, CostLevel } from '@/data/interventions';

const effectivenessScores: Record<EffectivenessLevel, number> = {
  high: 100, medium: 60, low: 30, unknown: 40,
};
const ecoScores: Record<EcoLevel, number> = {
  safe: 100, caution: 50, risk: 10,
};
const costScores: Record<CostLevel, number> = {
  low: 100, medium: 60, high: 20,
};

const calculateScore = (
  intervention: Intervention,
  effectivenessWeight: number,
  ecoWeight: number,
  costWeight: number
): number => {
  const totalWeight = effectivenessWeight + ecoWeight + costWeight;
  if (totalWeight === 0) return 50;
  const score =
    effectivenessScores[intervention.effectiveness] * (effectivenessWeight / totalWeight) +
    ecoScores[intervention.environmentalImpact] * (ecoWeight / totalWeight) +
    costScores[intervention.cost] * (costWeight / totalWeight);
  return score;
};

const ComparisonTool = () => {
  const [effectivenessWeight, setEffectivenessWeight] = useState(50);
  const [ecoWeight, setEcoWeight] = useState(30);
  const [costWeight, setCostWeight] = useState(20);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'personal', 'landscaping', 'wildlife', 'other',
  ]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const rankedInterventions = useMemo(() => {
    return interventions
      .filter((intervention) => selectedCategories.includes(intervention.category))
      .map((intervention) => ({
        intervention,
        score: calculateScore(intervention, effectivenessWeight, ecoWeight, costWeight),
      }))
      .sort((a, b) => b.score - a.score);
  }, [effectivenessWeight, ecoWeight, costWeight, selectedCategories]);

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
                onEffectivenessChange={setEffectivenessWeight}
                onEcoChange={setEcoWeight}
                onCostChange={setCostWeight}
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
    </section>
  );
};

export default ComparisonTool;
