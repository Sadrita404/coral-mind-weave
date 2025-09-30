import { AlertCircle, Users, Clock, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Problem = () => {
  const problems = [
    {
      icon: Users,
      title: "Application Overload",
      description: "Tens of thousands of applications for every role, making thorough review impossible.",
    },
    {
      icon: Clock,
      title: "Time Constraints",
      description: "Recruiters simply don't have enough hours to properly evaluate each candidate.",
    },
    {
      icon: TrendingDown,
      title: "Missed Opportunities",
      description: "Great candidates get overlooked because of volume, hurting both sides.",
    },
    {
      icon: AlertCircle,
      title: "Impersonal Process",
      description: "Applicants deserve meaningful feedback, not automated rejections.",
    },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            The Recruitment Crisis
          </h2>
          <p className="text-xl text-muted-foreground">
            Today's hiring landscape is broken for everyone involved
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <Card
                key={index}
                className="p-8 bg-gradient-card backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-smooth hover:shadow-glow-primary"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold">{problem.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
