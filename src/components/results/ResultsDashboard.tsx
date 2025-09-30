import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  RefreshCw,
  User,
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Building2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface CandidateProfile {
  name: string;
  current_title: string;
  years_experience: number;
  industry_experience: string[];
  skills: string[];
  education: string[];
  certifications: string[];
  location: string;
  company: string;
}

interface ResearchResults {
  overallScore: number;
  skillsMatch: number;
  experienceMatch: number;
  culturalFit: number;
  strengths: string[];
  concerns: string[];
  recommendation: string;
  detailedAnalysis: string;
}

interface ResultsDashboardProps {
  results: ResearchResults;
  candidateData: CandidateProfile;
  linkedinUrl: string;
  onExport: (format: "pdf" | "json" | "csv") => void;
  onStartNewResearch: () => void;
}

export const ResultsDashboard = ({
  results,
  candidateData,
  linkedinUrl,
  onExport,
  onStartNewResearch,
}: ResultsDashboardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500/10 border-green-500/20";
    if (score >= 60) return "bg-yellow-500/10 border-yellow-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Research Results</h2>
          <p className="text-muted-foreground mt-1">
            Comprehensive candidate evaluation completed
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onExport("pdf")}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={onStartNewResearch}>
            <RefreshCw className="w-4 h-4 mr-2" />
            New Research
          </Button>
        </div>
      </div>

      {/* Overall Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={`p-6 border ${getScoreBg(results.overallScore)}`}>
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Overall Match</p>
            <p className={`text-4xl font-bold ${getScoreColor(results.overallScore)}`}>
              {results.overallScore}%
            </p>
          </div>
        </Card>
        <Card className={`p-6 border ${getScoreBg(results.skillsMatch)}`}>
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Skills Match</p>
            <p className={`text-4xl font-bold ${getScoreColor(results.skillsMatch)}`}>
              {results.skillsMatch}%
            </p>
          </div>
        </Card>
        <Card className={`p-6 border ${getScoreBg(results.experienceMatch)}`}>
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Experience</p>
            <p className={`text-4xl font-bold ${getScoreColor(results.experienceMatch)}`}>
              {results.experienceMatch}%
            </p>
          </div>
        </Card>
        <Card className={`p-6 border ${getScoreBg(results.culturalFit)}`}>
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Cultural Fit</p>
            <p className={`text-4xl font-bold ${getScoreColor(results.culturalFit)}`}>
              {results.culturalFit}%
            </p>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">Candidate Profile</TabsTrigger>
          <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Key Strengths
              </h3>
              <ul className="space-y-2">
                {results.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 mt-0.5">•</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Concerns */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-yellow-500" />
                Areas of Concern
              </h3>
              <ul className="space-y-2">
                {results.concerns.map((concern, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    <span>{concern}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">{candidateData.name}</h3>
                  <p className="text-muted-foreground">{candidateData.current_title}</p>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    View LinkedIn Profile
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Experience */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Briefcase className="w-4 h-4" />
                    Experience
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{candidateData.company}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {candidateData.years_experience} years experience
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="w-4 h-4" />
                    Location
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {candidateData.location}
                  </p>
                </div>

                {/* Skills */}
                <div className="space-y-3 md:col-span-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Award className="w-4 h-4" />
                    Skills
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {candidateData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-3 md:col-span-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <GraduationCap className="w-4 h-4" />
                    Education
                  </div>
                  <ul className="space-y-1">
                    {candidateData.education.map((edu, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Detailed Analysis</h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground whitespace-pre-wrap">
                {results.detailedAnalysis}
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="recommendation">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Hiring Recommendation</h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground whitespace-pre-wrap">
                {results.recommendation}
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
