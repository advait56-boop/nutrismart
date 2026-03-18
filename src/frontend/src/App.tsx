import { useInternetIdentity } from "./hooks/useInternetIdentity";
import DashboardApp from "./pages/DashboardApp";
import LandingPage from "./pages/LandingPage";

export default function App() {
  const { identity, login, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-nutri-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-nutri-green border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-white/50 text-sm">Loading NutriSmart...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <DashboardApp />;
  }

  return <LandingPage onGetStarted={login} />;
}
