import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster"
import { seedSampleData } from "@/lib/seed";
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Tournaments from "@/pages/Tournaments";
import TournamentDetail from "@/pages/TournamentDetail";
import Traders from "@/pages/Traders";
import TraderProfile from "@/pages/TraderProfile";
import CheckIn from "@/pages/CheckIn";
import Leaderboard from "@/pages/Leaderboard";
import Admin from "@/pages/Admin";
import Referrals from "@/pages/Referrals";
import Transactions from "@/pages/Transactions";

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: "#0A0E27" }}>
        <div className="w-8 h-8 border-4 border-[#1A2050] rounded-full animate-spin" style={{ borderTopColor: "#D4AF37" }}></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournaments/:id" element={<TournamentDetail />} />
        <Route path="/traders" element={<Traders />} />
        <Route path="/traders/:id" element={<TraderProfile />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/transactions" element={<Transactions />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  useEffect(() => { seedSampleData(); }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App