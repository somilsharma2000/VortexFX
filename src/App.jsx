import { AuthProvider, useAuth } from "@/lib/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { queryClientInstance } from "@/lib/query-client";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import Layout from "@/components/Layout";
import Teaser from "@/pages/Teaser";
import Tournaments from "@/pages/Tournaments";
import Leaderboard from "@/pages/Leaderboard";
import Faq from "@/pages/Faq";
import ComingSoonPage from "@/components/ComingSoonPage";

function LoadingScreen() {
  return <div style={{ minHeight: "100vh", backgroundColor: "#0A0E27" }} />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Teaser />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/rex" element={<ComingSoonPage pageName="REX Economy" />} />
        <Route path="/journal" element={<ComingSoonPage pageName="Journal" />} />
        <Route path="/community" element={<ComingSoonPage pageName="Community" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function AuthenticatedApp() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <LoadingScreen />;
  // Public site: all pages are visible to everyone. Only an explicitly
  // flagged not-registered account would see the not-registered screen.
  const notRegistered = !!user && user._notRegistered === true;
  return notRegistered ? <UserNotRegisteredError /> : <AppRoutes />;
}

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster richColors closeButton position="top-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
}