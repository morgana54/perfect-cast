import { Submission } from "@/supabase/types";
import { Link } from "react-router-dom";

interface SubmissionGridProps {
  submissions: Submission[];
}

export const SubmissionGrid = ({ submissions }: SubmissionGridProps) => {
  const thumbnailUrl = "https://coltpedcrfibsozxvgvu.supabase.co/storage/v1/object/public/mock_actor_img//andre-sebastian-X6aMAzoVJzk-unsplash.jpg";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {submissions.map((submission) => (
        <Link
          to={`/cc/submission/${submission.id}`}
          key={submission.id}
          className="relative group cursor-pointer bg-card/80 backdrop-blur-sm rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors"
        >
          <div className="aspect-video relative overflow-hidden">
            <img
              src={thumbnailUrl}
              alt={submission.user_name || "Anonymous Actor"}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="font-medium text-white">
              {submission.user_name || "Anonymous Actor"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
