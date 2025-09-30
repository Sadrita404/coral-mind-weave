import { useState } from "react";

interface ProcessingState {
  overallProgress: number;
  currentAgent?: string;
  currentTask?: string;
  completedSteps: string[];
  estimatedTimeRemaining?: number;
}

interface ResearchSession {
  id: string;
  status: "submitted" | "processing" | "completed" | "failed";
  linkedinUrl: string;
  candidateProfile?: any;
  results?: any;
  processingState?: ProcessingState;
}

export const useResearch = () => {
  const [currentSession, setCurrentSession] = useState<ResearchSession | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessages, setStatusMessages] = useState<string[]>([]);
  const [isProcessingMinimized, setProcessingMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "processing" | "results">("form");

  const submitResearch = async (data: any) => {
    setIsSubmitting(true);
    setUploadProgress(0);

    // Simulate file upload
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setUploadProgress(i);
    }

    // Create mock session
    const sessionId = Math.random().toString(36).substring(7);
    const session: ResearchSession = {
      id: sessionId,
      status: "processing",
      linkedinUrl: data.linkedinUrl,
      processingState: {
        overallProgress: 0,
        currentAgent: "LinkedIn Scraper Agent",
        currentTask: "Fetching candidate profile data",
        completedSteps: [],
        estimatedTimeRemaining: 120,
      },
    };

    setCurrentSession(session);
    setIsSubmitting(false);
    setActiveTab("processing");

    // Simulate processing
    simulateProcessing(session);
  };

  const simulateProcessing = async (session: ResearchSession) => {
    const steps = [
      { agent: "LinkedIn Scraper Agent", task: "Fetching profile data", progress: 20 },
      { agent: "Skills Analysis Agent", task: "Analyzing technical skills", progress: 40 },
      { agent: "Experience Evaluator Agent", task: "Evaluating work history", progress: 60 },
      { agent: "Cultural Fit Agent", task: "Assessing cultural alignment", progress: 80 },
      { agent: "Report Generator Agent", task: "Compiling final report", progress: 100 },
    ];

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setCurrentSession((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          processingState: {
            ...prev.processingState!,
            overallProgress: step.progress,
            currentAgent: step.agent,
            currentTask: step.task,
            completedSteps: [...(prev.processingState?.completedSteps || []), step.task],
          },
        };
      });

      setStatusMessages((prev) => [
        ...prev,
        `${new Date().toLocaleTimeString()}: ${step.task} completed`,
      ]);
    }

    // Complete the research
    setCurrentSession((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        status: "completed",
        results: {
          overallScore: 85,
          skillsMatch: 90,
          experienceMatch: 82,
          culturalFit: 83,
          strengths: [
            "Strong technical background in required technologies",
            "Proven track record of leading successful projects",
            "Excellent communication and collaboration skills",
            "Continuous learner with recent certifications",
          ],
          concerns: [
            "Limited experience with specific industry domain",
            "May require relocation or remote work arrangement",
          ],
          recommendation:
            "Strong candidate with excellent technical skills and experience. The candidate demonstrates a solid track record of delivering complex projects and shows strong potential for growth. Minor concerns about domain experience can be addressed through onboarding. Recommend proceeding to technical interview stage.",
          detailedAnalysis:
            "The candidate presents a compelling profile with 8 years of software engineering experience, primarily focused on full-stack development. Their technical skill set aligns well with our requirements, particularly in React, TypeScript, and cloud technologies.\n\nTheir current role at Tech Corp demonstrates leadership capabilities, having led a team of 5 engineers on a major platform migration project. The candidate's educational background from MIT provides a strong foundation in computer science fundamentals.\n\nRecent certifications in AWS and Google Cloud show commitment to staying current with industry trends. Their experience spans both startup and enterprise environments, suggesting adaptability to different organizational cultures.",
        },
        candidateProfile: {
          name: "John Doe",
          current_title: "Senior Software Engineer",
          years_experience: 8,
          industry_experience: ["Technology", "E-commerce"],
          skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"],
          education: ["B.S. Computer Science - MIT"],
          certifications: ["AWS Solutions Architect", "Google Cloud Professional"],
          location: "San Francisco, CA",
          company: "Tech Corp",
        },
      };
    });

    setActiveTab("results");
  };

  const cancelResearch = () => {
    setCurrentSession(null);
    setActiveTab("form");
    setStatusMessages([]);
  };

  const exportResults = async (format: "pdf" | "json" | "csv") => {
    // Simulate export
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Exporting results as ${format}`);
  };

  const clearCurrentSession = () => {
    setCurrentSession(null);
    setStatusMessages([]);
    setUploadProgress(0);
  };

  return {
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
  };
};
