import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Minimize2, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface ProcessingState {
  overallProgress: number;
  currentAgent?: string;
  currentTask?: string;
  completedSteps: string[];
  estimatedTimeRemaining?: number;
}

interface ProcessingScreenProps {
  researchId: string;
  processingState: ProcessingState;
  statusMessages: string[];
  onCancel: () => void;
  onMinimize: () => void;
  onError: (error: Error) => void;
}

export const ProcessingScreen = ({
  processingState,
  statusMessages,
  onCancel,
  onMinimize,
}: ProcessingScreenProps) => {
  const {
    overallProgress,
    currentAgent,
    currentTask,
    completedSteps,
    estimatedTimeRemaining,
  } = processingState;

  const formatTime = (seconds?: number) => {
    if (!seconds) return "Calculating...";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 bg-card">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">Research in Progress</h2>
              <p className="text-muted-foreground">
                Our AI agents are analyzing the candidate...
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={onMinimize}>
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={onCancel}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Overall Progress</span>
              <span className="text-muted-foreground">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>

          {/* Current Status */}
          <div className="p-4 bg-muted rounded-lg space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <div>
                <p className="font-medium text-sm">{currentAgent || "Initializing..."}</p>
                <p className="text-xs text-muted-foreground">
                  {currentTask || "Setting up research pipeline"}
                </p>
              </div>
            </div>

            {estimatedTimeRemaining && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Estimated time remaining: {formatTime(estimatedTimeRemaining)}</span>
              </div>
            )}
          </div>

          {/* Completed Steps */}
          {completedSteps.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Completed Steps</h3>
              <div className="space-y-2">
                {completedSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status Messages */}
          {statusMessages.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Activity Log</h3>
              <div className="max-h-64 overflow-y-auto space-y-2 p-4 bg-muted/50 rounded-lg">
                {statusMessages.map((message, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Our multi-agent system is orchestrating specialized AI agents to gather 
              comprehensive information about the candidate. This includes profile analysis, 
              skills assessment, experience verification, and cultural fit evaluation.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
