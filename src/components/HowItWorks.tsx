import { SlidersHorizontal, LayoutGrid, Info } from 'lucide-react';

const steps = [
  {
    icon: SlidersHorizontal,
    title: 'Set Your Priorities',
    description: 'Adjust the sliders to indicate how much you value effectiveness, eco-friendliness, and affordability.',
  },
  {
    icon: LayoutGrid,
    title: 'View Ranked Solutions',
    description: 'Solutions are automatically ranked based on your preferences, with the best matches at the top.',
  },
  {
    icon: Info,
    title: 'Explore Details',
    description: 'Click on any solution to see detailed information about how it works, costs, and scientific evidence.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-card">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Finding the right tick prevention solution is easy with our comparison tool.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative text-center group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
                )}
                
                <div className="relative z-10 mb-4 inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Icon className="h-10 w-10" />
                </div>
                
                <div className="absolute -top-2 -right-2 md:relative md:top-0 md:right-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold md:mb-4">
                  {index + 1}
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
