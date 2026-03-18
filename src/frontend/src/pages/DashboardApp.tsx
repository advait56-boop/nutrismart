import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  Camera,
  LayoutDashboard,
  Leaf,
  LogOut,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetCallerUserProfile,
  useSaveUserProfile,
} from "../hooks/useQueries";
import type { MealLog, UserProfile } from "../types/nutrismart";
import DashboardTab from "./DashboardTab";
import FoodAnalyzerTab from "./FoodAnalyzerTab";
import MealPlansTab from "./MealPlansTab";
import ProfileSetup from "./ProfileSetup";

export default function DashboardApp() {
  const { clear, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const {
    data: backendProfile,
    isLoading,
    isFetched,
  } = useGetCallerUserProfile();
  const saveProfile = useSaveUserProfile();

  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const stored = localStorage.getItem("nutrismart_profile");
    return stored ? JSON.parse(stored) : null;
  });

  const [logs, setLogs] = useState<MealLog[]>(() => {
    const stored = localStorage.getItem("nutrismart_logs");
    return stored ? JSON.parse(stored) : [];
  });

  const isAuthenticated = !!identity;
  const showProfileSetup =
    isAuthenticated && !isLoading && isFetched && !profile;

  // Sync name from backend profile
  useEffect(() => {
    if (backendProfile && !profile) {
      // Backend has a name but no local profile - not likely but handle it
    }
  }, [backendProfile, profile]);

  const handleProfileComplete = useCallback(
    async (p: UserProfile) => {
      setProfile(p);
      localStorage.setItem("nutrismart_profile", JSON.stringify(p));
      try {
        await saveProfile.mutateAsync({ name: p.name });
      } catch {
        // non-critical
      }
      toast.success("Profile saved! Here's your personalized plan.");
    },
    [saveProfile],
  );

  const handleAddLog = useCallback((log: Omit<MealLog, "id" | "date">) => {
    const newLog: MealLog = {
      ...log,
      id: crypto.randomUUID(),
      date: new Date().toISOString().split("T")[0],
    };
    setLogs((prev) => {
      const updated = [...prev, newLog];
      localStorage.setItem("nutrismart_logs", JSON.stringify(updated));
      return updated;
    });
    toast.success(`${log.name} logged (${log.calories} kcal)`);
  }, []);

  const handleDeleteLog = useCallback((id: string) => {
    setLogs((prev) => {
      const updated = prev.filter((l) => l.id !== id);
      localStorage.setItem("nutrismart_logs", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-nutri-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-nutri-green/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Leaf className="w-6 h-6 text-nutri-green" />
          </div>
          <p className="text-white/60">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (showProfileSetup) {
    return (
      <>
        <ProfileSetup
          initialName={backendProfile?.name}
          onComplete={handleProfileComplete}
        />
        <Toaster />
      </>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-nutri-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-nutri-dark flex flex-col">
      <Toaster />
      {/* Top nav */}
      <header className="sticky top-0 z-50 bg-nutri-nav border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-nutri-green rounded-full flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-white">
              NutriSmart
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{profile.name}</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              data-ocid="nav.button"
              className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />{" "}
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6">
        <Tabs defaultValue="dashboard">
          <TabsList
            data-ocid="nav.tab"
            className="bg-white/5 border border-white/10 rounded-full p-1 mb-6 w-full sm:w-auto"
          >
            {[
              {
                value: "dashboard",
                label: "Dashboard",
                icon: <LayoutDashboard className="w-4 h-4" />,
              },
              {
                value: "mealplans",
                label: "Meal Plans",
                icon: <Calendar className="w-4 h-4" />,
              },
              {
                value: "analyzer",
                label: "Food Analyzer",
                icon: <Camera className="w-4 h-4" />,
              },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                data-ocid="nav.tab"
                className="flex-1 sm:flex-none rounded-full gap-1.5 text-white/60 data-[state=active]:bg-nutri-green data-[state=active]:text-white text-sm"
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="dashboard">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <DashboardTab
                profile={profile}
                logs={logs}
                onAddLog={handleAddLog}
                onDeleteLog={handleDeleteLog}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="mealplans">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <MealPlansTab profile={profile} onAddToLog={handleAddLog} />
            </motion.div>
          </TabsContent>

          <TabsContent value="analyzer">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <FoodAnalyzerTab profile={profile} onAddToLog={handleAddLog} />
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-white/10 py-4 text-center">
        <p className="text-white/30 text-xs">
          © {year}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            className="hover:text-nutri-green transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
