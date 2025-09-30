import { Card } from "@/components/ui/card";
import { GitBranch, Database, Brain, CheckCircle } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: GitBranch,
      number: "01",
      title: "Task Delegation",
      description: "The orchestrator analyzes the problem and delegates specialized tasks to the most suitable agents.",
    },
    {
      icon: Database,
      number: "02",
      title: "Knowledge Gathering",
      description: "Agents recursively collect and enrich data, building comprehensive context without hitting limits.",
    },
    {
      icon: Brain,
      number: "03",
      title: "Intelligent Analysis",
      description: "Powerful context management synthesizes findings into actionable insights and recommendations.",
    },
    {
      icon: CheckCircle,
      number: "04",
      title: "Perfect Matches",
      description: "Candidates receive detailed feedback and recruiters get ranked recommendations with full justification.",
    },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
          <p className="text-xl text-muted-foreground">
            Four simple steps to transform recruitment at scale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className="p-8 bg-gradient-card backdrop-blur-sm border-primary/20 hover:border-accent/40 transition-smooth relative overflow-hidden group"
              >
                {/* Number Background */}
                <div className="absolute top-4 right-4 text-6xl font-bold text-primary/5 group-hover:text-accent/10 transition-smooth">
                  {step.number}
                </div>
                
                <div className="relative space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-accent/10 transition-smooth">
                    <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-smooth" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-accent">Step {step.number}</div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
