import logoIcon from '@/assets/logo-icon.png';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="py-8 border-t border-border bg-muted/30">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={logoIcon} 
              alt="Preventick" 
              className="h-8 w-8"
            />
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Preventick. {t('footer.rights')}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center md:text-right max-w-md">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
