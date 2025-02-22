
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Submission } from "@/data/mockData";

interface SubmissionGridProps {
  submissions: Submission[];
}

export const SubmissionGrid = ({ submissions }: SubmissionGridProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {submissions.map((submission, index) => (
        <motion.div
          key={submission.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="relative group cursor-pointer"
          onClick={() => navigate(`/submission/${submission.id}`)}
        >
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img
              src={submission.image}
              alt={submission.actorName}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-medium">
                {submission.actorName}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
