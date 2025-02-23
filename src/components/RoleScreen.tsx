
import { useParams, useNavigate } from "react-router-dom";
import { SubmissionGrid } from "./SubmissionGrid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useClient } from "@/supabase/useClient";
import { useQuery } from "@tanstack/react-query";
import { Listing } from "@/supabase/types";

export const RoleScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = useClient();

  const { data: listing, isLoading } = useQuery({
    queryKey: ["listing", id],
    queryFn: async () => {
      if (!client) throw new Error("No Supabase client");
      const { data, error } = await client
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return data as Listing;
    },
    enabled: !!client && !!id
  });

  const { data: submissions } = useQuery({
    queryKey: ["submissions", id],
    queryFn: async () => {
      if (!client) throw new Error("No Supabase client");
      const { data, error } = await client
        .from("submissions")
        .select("*")
        .eq("listing_id", id);
        
      if (error) throw error;
      return data || [];
    },
    enabled: !!client && !!id
  });

  if (isLoading || !listing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="animate-spin w-8 h-8" />
      </div>
    );
  }

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
          <h2 className="text-2xl font-bold mb-4">{listing.title} - Screenplay</h2>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {listing.screenplay}
              </pre>
            </div>
          </ScrollArea>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Submissions</h2>
          {submissions && submissions.length > 0 ? (
            <SubmissionGrid submissions={submissions} />
          ) : (
            <p className="text-muted-foreground">No submissions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
