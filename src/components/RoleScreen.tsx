
import { useParams, useNavigate } from "react-router-dom";
import { roles, submissions } from "@/data/mockData";
import { SubmissionGrid } from "./SubmissionGrid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const RoleScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = roles.find((r) => r.id === id);
  const roleSubmissions = submissions.filter((s) => s.roleId === id);

  if (!role) return <div>Role not found</div>;

  return (
    <div className="relative min-h-screen">
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <div className="bg-card backdrop-blur-sm rounded-lg border border-border p-6">
          <h2 className="text-2xl font-bold mb-4">{role.title} - Screenplay</h2>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {role.screenplay}
              </pre>
            </div>
          </ScrollArea>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Submissions</h2>
          <SubmissionGrid submissions={roleSubmissions} />
        </div>
      </div>
    </div>
  );
};
