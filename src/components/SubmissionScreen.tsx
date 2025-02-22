
import { useParams, useNavigate } from "react-router-dom";
import { submissions } from "@/data/mockData";
import { VideoPlayer } from "./VideoPlayer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const SubmissionScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const submission = submissions.find((s) => s.id === id);

  if (!submission) return <div>Submission not found</div>;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
          <VideoPlayer url={submission.video} />
        </div>
        
        <Card className="p-6 bg-card/80 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={submission.image}
                alt={submission.actorName}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{submission.actorName}</h1>
                <p className="text-muted-foreground">Age: {submission.age}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {submission.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">Performance Summary</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {submission.performanceSummary}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
