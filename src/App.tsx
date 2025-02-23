import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { RoleList } from "./components/RoleList";
import { RoleScreen } from "./components/RoleScreen";
import { SubmissionScreen } from "./components/SubmissionScreen";
import NotFound from "./pages/NotFound";
import { motion, AnimatePresence } from "framer-motion";
import { Submit } from "./pages/Submit/Submit";
import { TokenProvider } from "./components/tokens/TokenContext";
import { TalentListings } from "./pages/Talent/Listings";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TokenProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Redirect to="/talent/listings" />} />
            <Route path="/cc" element={<RoleList />} />
            <Route path="/cc/role/:id" element={<RoleScreen />} />
            <Route path="/cc/submission/:id" element={<SubmissionScreen />} />
            <Route path="/talent/listings" element={<TalentListings />} />
            <Route path="/talent/listings/:id" element={<Submit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </TokenProvider>
  </QueryClientProvider>
);

interface RedirectProps {
  to: string;
}
function Redirect(props: RedirectProps) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(props.to);
  }, [navigate, props.to]);

  return null;
}

export default App;
