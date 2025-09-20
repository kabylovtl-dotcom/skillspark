import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import Index from "./pages/Index";
import About from "./pages/About";
import Simulations from "./pages/Simulations";
import SimulationDetail from "./pages/SimulationDetail";
import PendulumDemo from "./pages/PendulumDemo";
import OnlineLessons from "./pages/OnlineLessons";
import PhysicsLessons from "./pages/PhysicsLessons";
import ChatGPT from "./pages/ChatGPT";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="skillspark-theme">
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/simulations" element={<Simulations />} />
                <Route path="/simulations/:id" element={<SimulationDetail />} />
                <Route path="/pendulum-demo" element={<PendulumDemo />} />
                <Route path="/online-lessons" element={<OnlineLessons />} />
                <Route path="/online-lessons/physics" element={<PhysicsLessons />} />
                <Route path="/chatgpt" element={<ChatGPT />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
