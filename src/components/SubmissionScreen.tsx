
import { useParams, useNavigate } from "react-router-dom";
import { VideoPlayer } from "./VideoPlayer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useClient } from "@/supabase/useClient";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "./ui/scroll-area";

// Mock data for fields not yet in Supabase
const mockActorDetails = {
  age: 28,
  skills: ["Method Acting", "Stage Combat", "Voice-over", "Improvisation"],
  performanceSummary: "A compelling performance that showcases strong emotional range and character understanding. The actor brings authenticity to the scene while maintaining excellent vocal control and physical presence. Notable moments include the subtle transitions between emotional states and the effective use of non-verbal communication.",
  experience: "10 years of professional acting experience across theater, film, and television. Trained at the Royal Academy of Dramatic Arts.",
};

export const SubmissionScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = useClient();

  const { data: submission, isLoading } = useQuery({
    queryKey: ["submission", id],
    queryFn: async () => {
      if (!client) throw new Error("No Supabase client");
      const { data, error } = await client
        .from("submissions")
        .select("*, listings(*)")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading || !submission) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

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
          {submission.bucket_video_url && (
            <VideoPlayer url={submission.bucket_video_url} />
          )}
        </div>
        
        <Card className="p-6 bg-card/80 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={`https://coltpedcrfibsozxvgvu.supabase.co/storage/v1/object/public/mock_actor_img//andre-sebastian-X6aMAzoVJzk-unsplash.jpg`}
                alt={submission.user_name || "Anonymous Actor"}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {submission.user_name || "Anonymous Actor"}
                </h1>
                <p className="text-muted-foreground">Age: {mockActorDetails.age}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {mockActorDetails.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">Experience</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {mockActorDetails.experience}
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">Performance Review</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {mockActorDetails.performanceSummary}
                </p>
              </div>

              {submission.listings && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Audition Details</h2>
                  <ScrollArea className="h-[200px] rounded-md border p-4">
                    <div className="prose prose-sm max-w-none">
                      <h3 className="text-lg font-medium">
                        {submission.listings.title}
                      </h3>
                      <p className="text-muted-foreground">
                        Role: {submission.listings.userRole}
                      </p>
                      <pre className="mt-2 text-sm whitespace-pre-wrap">
                        {submission.listings.screenplay}
                      </pre>
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

