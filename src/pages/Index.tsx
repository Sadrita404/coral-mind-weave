import { ResearchForm } from "@/components/forms/ResearchForm";
import { ProcessingScreen } from "@/components/processing/ProcessingScreen";
import { ResultsDashboard } from "@/components/results/ResultsDashboard";
import { useResearch, useProcessingUpdates } from "@/hooks";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const {
    currentSession,
    isSubmitting,
    uploadProgress,
    statusMessages,
    isProcessingMinimized,
    activeTab,
    submitResearch,
    cancelResearch,
    exportResults,
    setProcessingMinimized,
    setActiveTab,
    clearCurrentSession,
  } = useResearch();

  const { toast } = useToast();

  useProcessingUpdates(currentSession?.id);

  const handleFormSubmit = async (data: any) => {
    try {
      await submitResearch(data);
      toast({
        title: "Research Started",
        description: "Your candidate research has been submitted successfully.",
      });
    } catch (error) {
      console.error("Failed to submit research:", error);
      toast({
        title: "Submission Failed",
        description: "Failed to start research. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleStartNewResearch = () => {
    clearCurrentSession();
    setActiveTab("form");
  };

  const handleExport = async (format: "pdf" | "json" | "csv") => {
    try {
      await exportResults(format);
      toast({
        title: "Export Successful",
        description: `Results exported as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export results. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderContent = () => {
    if (currentSession?.status === "completed" && currentSession.results) {
      return (
        <ResultsDashboard
          results={currentSession.results}
          candidateData={currentSession.candidateProfile}
          linkedinUrl={currentSession.linkedinUrl}
          onExport={handleExport}
          onStartNewResearch={handleStartNewResearch}
        />
      );
    }

    if (currentSession && ["submitted", "processing"].includes(currentSession.status)) {
      return (
        <ProcessingScreen
          researchId={currentSession.id}
          processingState={currentSession.processingState!}
          statusMessages={statusMessages}
          onCancel={cancelResearch}
          onMinimize={() => setProcessingMinimized(true)}
          onError={(error) => console.error("Processing error:", error)}
        />
      );
    }

    return (
      <div className="max-w-2xl mx-auto">
        <ResearchForm onSubmit={handleFormSubmit} isLoading={isSubmitting} />

        {isSubmitting && uploadProgress > 0 && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">
              Uploading files... {uploadProgress}%
            </div>
            <div className="w-full bg-muted-foreground/20 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-smooth"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Candidate Research Portal</h1>
          <p className="text-muted-foreground text-lg">
            Professional candidate research and evaluation platform
          </p>
        </div>

        {/* Navigation Tabs */}
        {currentSession && (
          <div className="flex justify-center mb-8">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("form")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  activeTab === "form"
                    ? "bg-background text-foreground shadow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Form
              </button>
              <button
                onClick={() => setActiveTab("processing")}
                disabled={!["submitted", "processing"].includes(currentSession.status)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth disabled:opacity-50 ${
                  activeTab === "processing"
                    ? "bg-background text-foreground shadow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Processing
              </button>
              <button
                onClick={() => setActiveTab("results")}
                disabled={currentSession.status !== "completed"}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth disabled:opacity-50 ${
                  activeTab === "results"
                    ? "bg-background text-foreground shadow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Results
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        {renderContent()}

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          Powered by Coral Protocol Multi-Agent System
        </div>

        {/* Minimized Processing Indicator */}
        {isProcessingMinimized &&
          currentSession &&
          ["submitted", "processing"].includes(currentSession.status) && (
            <div className="fixed bottom-4 right-4 z-50">
              <div
                className="bg-background border border-border rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-smooth p-4"
                onClick={() => {
                  setProcessingMinimized(false);
                  setActiveTab("processing");
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <div>
                    <p className="font-medium text-sm">Research in progress</p>
                    <p className="text-xs text-muted-foreground">
                      {currentSession.processingState?.overallProgress || 0}% complete
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Index;
