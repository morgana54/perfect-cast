
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Listing } from "@/supabase/types";
import { useClient } from "@/supabase/useClient";
import { LoaderCircle } from "lucide-react";
import { Header } from "./Header";

export const RoleList = () => {
  const navigate = useNavigate();
  const client = useClient();

  const { data: listings, isLoading } = useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      if (!client) throw new Error("No Supabase client");
      const { data, error } = await client
        .from("listings")
        .select("*")
        .order("id", { ascending: false });
      
      if (error) throw error;
      return data as Listing[];
    },
    enabled: !!client
  });

  if (isLoading || !listings) {
    return (
      <div>
        <Header className="max-w-[1200px]" />
        <div className="max-w-4xl mx-auto py-12 px-4 flex items-center justify-center">
          <LoaderCircle className="animate-spin w-8 h-8" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header className="max-w-[1200px]" />
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-foreground">
          Casting Offers
        </h1>
        <div className="space-y-4">
          {listings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card backdrop-blur-sm border border-border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => navigate(`./role/${listing.id}`)}
            >
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {listing.title}
              </h2>
              <p className="text-muted-foreground">{listing.context_setting}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
