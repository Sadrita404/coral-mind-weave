import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero z-0" />
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/30">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Orchestration-First AI Architecture</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              All Aboard
            </span>
            <br />
            The Future of Intelligent Recruitment
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A flexible, modular orchestration agent that delegates tasks through recursive knowledge gathering. 
            Solving the impossible: matching tens of thousands of candidates with the perfect role.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="xl" variant="hero">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button size="xl" variant="outline">
              Learn More
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">10x</div>
              <div className="text-sm text-muted-foreground">Faster Candidate Review</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Application Coverage</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent-glow">∞</div>
              <div className="text-sm text-muted-foreground">Scalability Potential</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
