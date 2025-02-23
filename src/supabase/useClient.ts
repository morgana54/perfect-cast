import { useTokenContext } from "@/components/tokens/TokenContext";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useClient() {
  const { data: tokens } = useTokenContext();
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    if (tokens) {
      const client = createClient(tokens.supabaseUrl, tokens.supabase);
      setSupabase(client);
    }
  }, [tokens]);

  return supabase;
}
