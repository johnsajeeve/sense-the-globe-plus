import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Destination from "./pages/Destination";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import ChatPage from "./pages/chat";

import VoiceToggle from "@/components/voiceToggle";
import CommunityMembers from "./pages/CommunityMembers";


const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Voice & Toast UI */}
        <Toaster />
        <Sonner />

        {/* Accessibility: Skip Link */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          Skip to main content
        </a>

        {/* Semantic main wrapper for all routed pages */}
        <main id="main" className="min-h-screen">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/destination/:country" element={<Destination />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/:id/members" element={<CommunityMembers />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<NotFound />} />
            
          </Routes>
        </main>

        {/* Voice Mode Toggle is always available */}
        <VoiceToggle />
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;