import { Shield, Leaf, DollarSign } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent py-16 md:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container relative z-10 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Protect Your Property
            <span className="block mt-2 text-primary-foreground/90">From Ticks</span>
          </h1>
          <p className="mb-10 text-lg text-primary-foreground/80 md:text-xl">
            Compare tick prevention solutions based on what matters most to you. 
            Find the right balance between effectiveness, eco-friendliness, and cost.
          </p>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center justify-center gap-3 rounded-xl bg-primary-foreground/10 px-4 py-3 backdrop-blur-sm">
              <Shield className="h-6 w-6 text-primary-foreground" />
              <span className="font-semibold text-primary-foreground">Effectiveness</span>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-xl bg-primary-foreground/10 px-4 py-3 backdrop-blur-sm">
              <Leaf className="h-6 w-6 text-primary-foreground" />
              <span className="font-semibold text-primary-foreground">Eco-Friendly</span>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-xl bg-primary-foreground/10 px-4 py-3 backdrop-blur-sm">
              <DollarSign className="h-6 w-6 text-primary-foreground" />
              <span className="font-semibold text-primary-foreground">Affordability</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L60 108C120 96 240 72 360 66C480 60 600 72 720 78C840 84 960 84 1080 78C1200 72 1320 60 1380 54L1440 48V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
