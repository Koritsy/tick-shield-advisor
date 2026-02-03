import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'nav.compare': 'Compare Solutions',
    'nav.howItWorks': 'How It Works',
    
    // Hero
    'hero.title': 'Protect Your Property',
    'hero.subtitle': 'From Ticks',
    'hero.description': 'Compare tick prevention solutions based on what matters most to you. Find the right balance between effectiveness, eco-friendliness, and cost.',
    'hero.effectiveness': 'Effectiveness',
    'hero.ecoFriendly': 'Eco-Friendly',
    'hero.affordability': 'Affordability',
    
    // How It Works
    'howItWorks.title': 'How It Works',
    'howItWorks.description': 'Finding the right tick prevention solution is easy with our comparison tool.',
    'howItWorks.step1.title': 'Set Your Priorities',
    'howItWorks.step1.description': 'Adjust the sliders to indicate how much you value effectiveness, eco-friendliness, and affordability.',
    'howItWorks.step2.title': 'View Ranked Solutions',
    'howItWorks.step2.description': 'Solutions are automatically ranked based on your preferences, with the best matches at the top.',
    'howItWorks.step3.title': 'Explore Details',
    'howItWorks.step3.description': 'Click on any solution to see detailed information about how it works, costs, and scientific evidence.',
    
    // Comparison Tool
    'compare.title': 'Compare Tick Prevention Solutions',
    'compare.description': "Adjust your priorities and we'll rank the solutions that best match your values. Click on any solution to see detailed information.",
    'compare.showing': 'Showing',
    'compare.solutions': 'solutions',
    'compare.noResults': 'No solutions match your current filters. Try selecting more categories.',
    
    // Filter Panel
    'filter.title': 'Your Priorities',
    'filter.description': 'Adjust the sliders to prioritize what matters most to you. Solutions will be ranked accordingly.',
    'filter.effectiveness': 'Effectiveness',
    'filter.effectiveness.help': 'How important is proven effectiveness at reducing tick populations?',
    'filter.ecoFriendly': 'Eco-Friendly',
    'filter.ecoFriendly.help': 'How important is minimizing environmental impact?',
    'filter.affordability': 'Affordability',
    'filter.affordability.help': 'How important is keeping costs low?',
    'filter.categories': 'Filter by Category',
    'filter.category.personal': 'Personal Protection',
    'filter.category.landscaping': 'Landscaping',
    'filter.category.wildlife': 'Wildlife Management',
    'filter.category.other': 'Other',
    
    // Intervention Card
    'card.score': 'Score',
    'card.strongEvidence': 'Strong Evidence',
    'card.limitedEvidence': 'Limited evidence',
    'card.showDetails': 'Show Details',
    'card.hideDetails': 'Hide Details',
    'card.effectiveness': 'Effectiveness',
    'card.environmentalImpact': 'Environmental Impact',
    'card.healthSafety': 'Health & Safety',
    'card.costDetails': 'Cost Details',
    'card.annualInvestment': 'Annual investment',
    'card.easeOfUse': 'Ease of Use',
    
    // Effectiveness levels
    'effectiveness.high': 'High',
    'effectiveness.medium': 'Medium',
    'effectiveness.low': 'Low',
    'effectiveness.unknown': 'Unknown',
    
    // Eco levels
    'eco.safe': 'Safe',
    'eco.caution': 'Caution',
    'eco.risk': 'Risk',
    
    // Cost levels
    'cost.low': 'Low',
    'cost.medium': 'Medium',
    'cost.high': 'High',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.disclaimer': 'This tool is for informational purposes only. Always consult with local experts and health authorities for tick prevention advice specific to your region.',
  },
  fr: {
    // Header
    'nav.compare': 'Comparer les solutions',
    'nav.howItWorks': 'Comment ça marche',
    
    // Hero
    'hero.title': 'Protégez votre propriété',
    'hero.subtitle': 'Contre les tiques',
    'hero.description': 'Comparez les solutions de prévention contre les tiques selon ce qui compte le plus pour vous. Trouvez le bon équilibre entre efficacité, respect de l\'environnement et coût.',
    'hero.effectiveness': 'Efficacité',
    'hero.ecoFriendly': 'Écologique',
    'hero.affordability': 'Abordabilité',
    
    // How It Works
    'howItWorks.title': 'Comment ça marche',
    'howItWorks.description': 'Trouver la bonne solution de prévention contre les tiques est facile avec notre outil de comparaison.',
    'howItWorks.step1.title': 'Définissez vos priorités',
    'howItWorks.step1.description': 'Ajustez les curseurs pour indiquer l\'importance que vous accordez à l\'efficacité, au respect de l\'environnement et à l\'abordabilité.',
    'howItWorks.step2.title': 'Consultez le classement',
    'howItWorks.step2.description': 'Les solutions sont automatiquement classées selon vos préférences, avec les meilleures correspondances en haut.',
    'howItWorks.step3.title': 'Explorez les détails',
    'howItWorks.step3.description': 'Cliquez sur n\'importe quelle solution pour voir des informations détaillées sur son fonctionnement, ses coûts et les preuves scientifiques.',
    
    // Comparison Tool
    'compare.title': 'Comparez les solutions de prévention contre les tiques',
    'compare.description': 'Ajustez vos priorités et nous classerons les solutions qui correspondent le mieux à vos valeurs. Cliquez sur une solution pour voir les détails.',
    'compare.showing': 'Affichage de',
    'compare.solutions': 'solutions',
    'compare.noResults': 'Aucune solution ne correspond à vos filtres actuels. Essayez de sélectionner plus de catégories.',
    
    // Filter Panel
    'filter.title': 'Vos priorités',
    'filter.description': 'Ajustez les curseurs pour prioriser ce qui compte le plus pour vous. Les solutions seront classées en conséquence.',
    'filter.effectiveness': 'Efficacité',
    'filter.effectiveness.help': 'Quelle importance accordez-vous à l\'efficacité prouvée pour réduire les populations de tiques?',
    'filter.ecoFriendly': 'Écologique',
    'filter.ecoFriendly.help': 'Quelle importance accordez-vous à la minimisation de l\'impact environnemental?',
    'filter.affordability': 'Abordabilité',
    'filter.affordability.help': 'Quelle importance accordez-vous au maintien de faibles coûts?',
    'filter.categories': 'Filtrer par catégorie',
    'filter.category.personal': 'Protection personnelle',
    'filter.category.landscaping': 'Aménagement paysager',
    'filter.category.wildlife': 'Gestion de la faune',
    'filter.category.other': 'Autre',
    
    // Intervention Card
    'card.score': 'Score',
    'card.strongEvidence': 'Preuves solides',
    'card.limitedEvidence': 'Preuves limitées',
    'card.showDetails': 'Afficher les détails',
    'card.hideDetails': 'Masquer les détails',
    'card.effectiveness': 'Efficacité',
    'card.environmentalImpact': 'Impact environnemental',
    'card.healthSafety': 'Santé et sécurité',
    'card.costDetails': 'Détails des coûts',
    'card.annualInvestment': 'Investissement annuel',
    'card.easeOfUse': 'Facilité d\'utilisation',
    
    // Effectiveness levels
    'effectiveness.high': 'Élevée',
    'effectiveness.medium': 'Moyenne',
    'effectiveness.low': 'Faible',
    'effectiveness.unknown': 'Inconnue',
    
    // Eco levels
    'eco.safe': 'Sûr',
    'eco.caution': 'Prudence',
    'eco.risk': 'Risque',
    
    // Cost levels
    'cost.low': 'Faible',
    'cost.medium': 'Moyen',
    'cost.high': 'Élevé',
    
    // Footer
    'footer.rights': 'Tous droits réservés.',
    'footer.disclaimer': 'Cet outil est fourni à titre informatif uniquement. Consultez toujours des experts locaux et les autorités sanitaires pour des conseils de prévention contre les tiques spécifiques à votre région.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
