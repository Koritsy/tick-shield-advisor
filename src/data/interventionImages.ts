import baitBox from '@/assets/interventions/bait-box-user.png';
import biologicalAgents from '@/assets/interventions/biological-agents.jpg';
import deerAcaricide from '@/assets/interventions/deer-acaricide-user.png';
import deerRepellents from '@/assets/interventions/deer-repellents-user.png';
import deetRepellent from '@/assets/interventions/deet-repellent.jpg';
import fencing from '@/assets/interventions/fencing-user.png';
import firewoodStorage from '@/assets/interventions/firewood-storage.jpg';
import gravelBorder from '@/assets/interventions/gravel-border.jpg';
import naturalPesticides from '@/assets/interventions/natural-pesticides.jpg';
import naturalRepellents from '@/assets/interventions/natural-repellents.jpg';
import permethrinClothing from '@/assets/interventions/permethrin-clothing.jpg';
import petTreatment from '@/assets/interventions/pet-treatment-user.png';
import protectiveBehaviors from '@/assets/interventions/protective-behaviors.jpg';
import protectiveClothing from '@/assets/interventions/protective-clothing.jpg';
import rodentElimination from '@/assets/interventions/rodent-elimination-user.png';
import selfCheck from '@/assets/interventions/self-check.jpg';
import tickTubes from '@/assets/interventions/tick-tubes-user.png';
import wildlifeManagement from '@/assets/interventions/wildlife-management-user.png';
import woodChipBorder from '@/assets/interventions/stream-border-user.png';

export const interventionImages: Record<string, string> = {
  'protective-behaviors': protectiveBehaviors,
  'deet-repellent': deetRepellent,
  'protective-clothing': protectiveClothing,
  'self-check': selfCheck,
  'permethrin-clothing': permethrinClothing,
  'natural-repellents': naturalRepellents,
  'wood-chip-border': woodChipBorder,
  'gravel-border': gravelBorder,
  pesticides: deerAcaricide,
  'natural-pesticides': naturalPesticides,
  'biological-agents': biologicalAgents,
  'yard-maintenance': wildlifeManagement,
  'firewood-storage': firewoodStorage,
  fencing,
  'deer-repellents': deerRepellents,
  'bait-box': baitBox,
  'tick-tubes': tickTubes,
  'rodent-elimination': rodentElimination,
  'pet-treatment': petTreatment,
};
