
import biologicalAgents from '@/assets/interventions/Agents_biologiques.png';
import deerAcaricide from '@/assets/interventions/deer-acaricide-user.png';
import deerRepellents from '@/assets/interventions/Repulsifs_à_cerfs.png';
import deetRepellent from '@/assets/interventions/deet-repellent.png';
import fencing from '@/assets/interventions/fencing-user.png';
import firewoodStorage from '@/assets/interventions/Entreposage_du_bois.png';
import pesticidesImg from '@/assets/interventions/Traitement_avec_pesticides.png';
import gravelBorder from '@/assets/interventions/gravel-border.png';
import naturalPesticides from '@/assets/interventions/Pesticides_naturels.png';
import naturalRepellents from '@/assets/interventions/natural-repellents.png';
import permethrinClothing from '@/assets/interventions/vaporisateur_perméthrines_vêtements.png';
import petTreatment from '@/assets/interventions/pet-treatment-user.png';
import protectiveBehaviors from '@/assets/interventions/protective-behaviors.png';
import protectiveClothing from '@/assets/interventions/vetements_protecteurs.png';
import rodentBait from '@/assets/interventions/rodent-bait-user.png';
import rodentElimination from '@/assets/interventions/Elimination_des_rongeurs.png';
import rubberSubstrate from '@/assets/interventions/rubber.png';
import selfCheck from '@/assets/interventions/auto-inspection.png';
import streamBorder from '@/assets/interventions/stream-border-user.png';
import tickTubes from '@/assets/interventions/tick_tubes.png';
import woodChipBorder from '@/assets/interventions/wood-chip-border.png';
import yardMaintenance from '@/assets/interventions/yard-maintenance.png';
import aromaticPlants from '@/assets/interventions/plants.png';
import permethrinTreatment from '@/assets/interventions/permethrin-treated-clothing.png';

export const interventionImages: Record<string, string> = {
  'protective-behaviors': protectiveBehaviors,
  'deet-repellent': deetRepellent,
  'protective-clothing': protectiveClothing,
  'self-check': selfCheck,
  'permethrin-clothing': permethrinTreatment,
  'natural-repellents': naturalRepellents,
  'permethrin-spray': permethrinClothing,
  'wood-chip-border': woodChipBorder,
  'gravel-border': gravelBorder,
  'rubber-substrate': rubberSubstrate,
  'aromatic-plants': aromaticPlants,
  'pesticides': pesticidesImg,
  'natural-pesticides': naturalPesticides,
  'biological-agents': biologicalAgents,
  'yard-maintenance': yardMaintenance,
  'firewood-storage': firewoodStorage,
  'stream-border': streamBorder,
  'fencing': fencing,
  'deer-repellents': deerRepellents,
  
  'tick-tubes': tickTubes,
  'rodent-bait': rodentBait,
  'rodent-elimination': rodentElimination,
  'deer-acaricide': deerAcaricide,
  'pet-treatment': petTreatment,
};
