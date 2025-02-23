
import { Submission } from "@/supabase/types";
import { VideoPlayer } from "./VideoPlayer";

interface SubmissionGridProps {
  submissions: Submission[];
}

export const SubmissionGrid = ({ submissions }: SubmissionGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {submissions.map((submission) => (
        <div
          key={submission.id}
          className="relative group cursor-pointer bg-card/80 backdrop-blur-sm rounded-lg overflow-hidden border border-border"
        >
          <div className="aspect-video relative overflow-hidden">
            {submission.bucket_video_url && (
              <VideoPlayer url={submission.bucket_video_url} />
            )}
          </div>
          <div className="p-4">
            <p className="font-medium">
              {submission.user_name || "Anonymous Actor"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
