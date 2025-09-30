import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";

export const CTA = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto">
        <Card className="max-w-4xl mx-auto p-12 bg-gradient-card backdrop-blur-sm border-primary/30 shadow-glow-primary relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="relative text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to Transform
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Your Recruitment Process?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join the waitlist to be among the first to experience 
                intelligent orchestration that scales infinitely.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="xl" variant="hero">
                Join Waitlist
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="xl" variant="outline">
                <Mail className="w-5 h-5" />
                Contact Us
              </Button>
            </div>

            <div className="pt-8 text-sm text-muted-foreground">
              Built for scale. Designed for humans.
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
