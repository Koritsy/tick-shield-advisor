import logo from '@/assets/logo-title.png';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const { t } = useLanguage();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="Preventick" 
            className="h-14 w-auto"
          />
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="#compare" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.compare')}
          </a>
          <a 
            href="#how-it-works" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.howItWorks')}
          </a>
          <LanguageToggle />
        </nav>
        <div className="md:hidden">
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
