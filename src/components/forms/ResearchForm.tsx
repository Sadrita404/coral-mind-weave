import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Upload, Link2, FileText } from "lucide-react";

interface ResearchFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

interface FormData {
  linkedinUrl: string;
  jobDescription: string;
  additionalNotes?: string;
  resume?: File;
}

export const ResearchForm = ({ onSubmit, isLoading }: ResearchFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    linkedinUrl: "",
    jobDescription: "",
    additionalNotes: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      resume: resumeFile || undefined,
    };
    onSubmit(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  return (
    <Card className="p-8 bg-card">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* LinkedIn URL */}
        <div className="space-y-2">
          <Label htmlFor="linkedinUrl" className="text-sm font-medium flex items-center gap-2">
            <Link2 className="w-4 h-4" />
            LinkedIn Profile URL
          </Label>
          <Input
            id="linkedinUrl"
            type="url"
            placeholder="https://linkedin.com/in/candidate-name"
            value={formData.linkedinUrl}
            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
            required
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground">
            Enter the candidate's LinkedIn profile URL for comprehensive research
          </p>
        </div>

        {/* Job Description */}
        <div className="space-y-2">
          <Label htmlFor="jobDescription" className="text-sm font-medium flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Job Description
          </Label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the job description here..."
            value={formData.jobDescription}
            onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
            rows={8}
            required
            disabled={isLoading}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Provide the complete job description to evaluate candidate fit
          </p>
        </div>

        {/* Resume Upload */}
        <div className="space-y-2">
          <Label htmlFor="resume" className="text-sm font-medium flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Resume (Optional)
          </Label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-smooth">
            <input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              disabled={isLoading}
              className="hidden"
            />
            <label htmlFor="resume" className="cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-foreground">
                {resumeFile ? resumeFile.name : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PDF, DOC, DOCX (Max 10MB)
              </p>
            </label>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-2">
          <Label htmlFor="additionalNotes" className="text-sm font-medium">
            Additional Notes (Optional)
          </Label>
          <Textarea
            id="additionalNotes"
            placeholder="Any specific areas to focus on or questions to investigate..."
            value={formData.additionalNotes}
            onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
            rows={4}
            disabled={isLoading}
            className="resize-none"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading}
          variant="default"
        >
          {isLoading ? "Starting Research..." : "Start Research"}
        </Button>
      </form>
    </Card>
  );
};
