// TokenContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { useTokenData } from "./useTokenData";

export interface TokenData {
  openai: string;
  elevenLabs: string;
  imentiv: string;
  supabase: string;
  supabaseUrl: string;
  supabaseServiceKey: string;
}

interface TokenContextType {
  data: TokenData | null;
  isLoading: boolean;
  error: Error | null;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

interface TokenProviderProps {
  children: ReactNode;
}

export const TokenProvider = ({ children }: TokenProviderProps) => {
  const tokenData = useTokenData(); // We'll create this hook next

  return (
    <TokenContext.Provider value={tokenData}>{children}</TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useTokenContext must be used within a TokenProvider");
  }

  return context;
};
