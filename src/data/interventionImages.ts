import baitBox from '@/assets/interventions/bait-box-user.png';
import biologicalAgents from '@/assets/interventions/biological-agents.png';
import deerAcaricide from '@/assets/interventions/deer-acaricide-user.png';
import deerRepellents from '@/assets/interventions/deer-repellents-user.png';
import deetRepellent from '@/assets/interventions/deet-repellent.png';
import fencing from '@/assets/interventions/fencing-user.png';
import firewoodStorage from '@/assets/interventions/firewood-storage.png';
import gravelBorder from '@/assets/interventions/gravel-border.png';
import naturalPesticides from '@/assets/interventions/natural-pesticides.png';
import naturalRepellents from '@/assets/interventions/natural-repellents.png';
import permethrinClothing from '@/assets/interventions/permethrin-clothing.png';
import petTreatment from '@/assets/interventions/pet-treatment-user.png';
import protectiveBehaviors from '@/assets/interventions/protective-behaviors.png';
import protectiveClothing from '@/assets/interventions/protective-clothing.png';
import rodentBait from '@/assets/interventions/rodent-bait-user.png';
import rodentElimination from '@/assets/interventions/rodent-elimination-user.png';
import rubberSubstrate from '@/assets/interventions/Substrat de caoutchouc.png';
import selfCheck from '@/assets/interventions/self-check.jpg';
import streamBorder from '@/assets/interventions/stream-border-user.png';
import tickTubes from '@/assets/interventions/tick-tubes-user.png';
import wildlifeManagement from '@/assets/interventions/wildlife-management-user.png';
import woodChipBorder from '@/assets/interventions/wood-chip-border.png';
import yardMaintenance from '@/assets/interventions/yard-maintenance.png';

export const interventionImages: Record<string, string> = {
  'protective-behaviors': protectiveBehaviors,
  'deet-repellent': deetRepellent,
  'protective-clothing': protectiveClothing,
  'self-check': selfCheck,
  'permethrin-clothing': permethrinClothing,
  'natural-repellents': naturalRepellents,
  'permethrin-spray': permethrinClothing,
  'wood-chip-border': wildlifeManagement,
  'gravel-border': gravelBorder,
  'rubber-substrate': rubberSubstrate,
  'aromatic-plants': aromaticPlants,
  pesticides: deerAcaricide,
  'natural-pesticides': naturalPesticides,
  'biological-agents': biologicalAgents,
  'yard-maintenance': wildlifeManagement,
  'firewood-storage': firewoodStorage,
  'stream-border': streamBorder,
  fencing,
  'deer-repellents': deerRepellents,
  'bait-box': baitBox,
  'tick-tubes': tickTubes,
  'rodent-bait': rodentBait,
  'rodent-elimination': rodentElimination,
  'deer-acaricide': deerAcaricide,
  'pet-treatment': petTreatment,
};
