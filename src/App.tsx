import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index.tsx";
import VendorPage from "./pages/VendorPage.tsx";
import VendorPredictionsPage from "./pages/VendorPredictionsPage.tsx";
import VendorSurplusPage from "./pages/VendorSurplusPage.tsx";
import VendorDonationsPage from "./pages/VendorDonationsPage.tsx";
import VendorAnalyticsPage from "./pages/VendorAnalyticsPage.tsx";
import NGOPage from "./pages/NGOPage.tsx";
import NGODonationsPage from "./pages/NGODonationsPage.tsx";
import NGOHistoryPage from "./pages/NGOHistoryPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole: 'vendor' | 'ngo' }) {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to={`/login?role=${requiredRole}`} replace />;
  if (role !== requiredRole) return <Navigate to={`/${role}`} replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<LoginPage />} />
      {/* Vendor routes */}
      <Route path="/vendor" element={<ProtectedRoute requiredRole="vendor"><VendorPage /></ProtectedRoute>} />
      <Route path="/vendor/predictions" element={<ProtectedRoute requiredRole="vendor"><VendorPredictionsPage /></ProtectedRoute>} />
      <Route path="/vendor/surplus" element={<ProtectedRoute requiredRole="vendor"><VendorSurplusPage /></ProtectedRoute>} />
      <Route path="/vendor/donations" element={<ProtectedRoute requiredRole="vendor"><VendorDonationsPage /></ProtectedRoute>} />
      <Route path="/vendor/analytics" element={<ProtectedRoute requiredRole="vendor"><VendorAnalyticsPage /></ProtectedRoute>} />
      <Route path="/vendor/settings" element={<ProtectedRoute requiredRole="vendor"><SettingsPage role="vendor" /></ProtectedRoute>} />
      {/* NGO routes */}
      <Route path="/ngo" element={<ProtectedRoute requiredRole="ngo"><NGOPage /></ProtectedRoute>} />
      <Route path="/ngo/donations" element={<ProtectedRoute requiredRole="ngo"><NGODonationsPage /></ProtectedRoute>} />
      <Route path="/ngo/history" element={<ProtectedRoute requiredRole="ngo"><NGOHistoryPage /></ProtectedRoute>} />
      <Route path="/ngo/settings" element={<ProtectedRoute requiredRole="ngo"><SettingsPage role="ngo" /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
