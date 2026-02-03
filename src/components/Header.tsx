import logo from '@/assets/logo-title.png';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="Preventick" 
            className="h-10 w-auto"
          />
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="#compare" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Compare Solutions
          </a>
          <a 
            href="#how-it-works" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
