import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleList } from "./components/RoleList";
import { RoleScreen } from "./components/RoleScreen";
import { SubmissionScreen } from "./components/SubmissionScreen";
import NotFound from "./pages/NotFound";
import { motion, AnimatePresence } from "framer-motion";
import { Submit } from "./pages/Submit/Submit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<RoleList />} />
              <Route path="/role/:id" element={<RoleScreen />} />
              <Route path="/submission/:id" element={<SubmissionScreen />} />
              <Route path="/talent/submit" element={<Submit />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
