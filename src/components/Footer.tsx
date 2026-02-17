import logoIcon from '@/assets/logo-icon.png';

const Footer = () => {
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
              © {new Date().getFullYear()} Preventick. Tous droits réservés.
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center md:text-right max-w-md">
            Cet outil est fourni à titre informatif uniquement. Consultez toujours des experts locaux et les autorités sanitaires pour des conseils de prévention contre les tiques spécifiques à votre région.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
