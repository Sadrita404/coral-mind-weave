import { Zap, Network, Target, Layers } from "lucide-react";
import { Card } from "@/components/ui/card";
import orchestrationImg from "@/assets/orchestration.jpg";

export const Solution = () => {
  const features = [
    {
      icon: Network,
      title: "Orchestration-First Architecture",
      description: "A flexible, modular system that delegates tasks intelligently based on recursive knowledge gathering.",
    },
    {
      icon: Layers,
      title: "Separation of Concerns",
      description: "Each agent does what it does best - our orchestrator guides them to unlock maximum potential.",
    },
    {
      icon: Target,
      title: "Targeted Data Enrichment",
      description: "Smart context management transforms simple scrapers into cutting-edge analysis tools.",
    },
    {
      icon: Zap,
      title: "Lightning Fast Results",
      description: "No more context size limits or speed bottlenecks. Scale infinitely with modular design.",
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-card relative overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              The All Aboard Solution
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            One-size-fits-all orchestration that solves deep research at scale
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-glow-primary">
            <img 
              src={orchestrationImg} 
              alt="AI Orchestration Network" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-accent/40 transition-smooth"
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Impact Statement */}
        <Card className="max-w-4xl mx-auto p-8 bg-gradient-card backdrop-blur-sm border-accent/30 shadow-glow-accent">
          <div className="text-center space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold">
              Lower Cost. Less Time. Better Matches.
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              All Aboard gives every applicant the thorough review they deserve, 
              while helping recruiters find the perfect fit faster than ever before.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
