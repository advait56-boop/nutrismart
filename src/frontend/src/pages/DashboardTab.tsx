import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { MealLog, UserProfile } from "../types/nutrismart";

interface DashboardTabProps {
  profile: UserProfile;
  logs: MealLog[];
  onAddLog: (log: Omit<MealLog, "id" | "date">) => void;
  onDeleteLog: (id: string) => void;
}

function CircularProgress({
  consumed,
  target,
}: { consumed: number; target: number }) {
  const pct = Math.min(consumed / target, 1);
  const radius = 72;
  const circ = 2 * Math.PI * radius;
  const dash = pct * circ;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" className="-rotate-90" aria-hidden="true">
        <title>Progress ring</title>
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="12"
        />
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="oklch(0.72 0.16 55)"
          strokeWidth="12"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-display font-bold text-white">
          {consumed}
        </div>
        <div className="text-xs text-white/50">of {target} kcal</div>
      </div>
    </div>
  );
}

function MacroBar({
  label,
  grams,
  color,
  max,
}: { label: string; grams: number; color: string; max: number }) {
  const pct = Math.min((grams / max) * 100, 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-white/70 text-sm w-16 shrink-0">{label}</span>
      <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-white/60 text-sm w-12 text-right shrink-0">
        {grams}g
      </span>
    </div>
  );
}

function WeeklyChart({ logs, target }: { logs: MealLog[]; target: number }) {
  const days: Array<{ label: string; calories: number; pct: number }> = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const dayLogs = logs.filter((l) => l.date === dateStr);
    const total = dayLogs.reduce((s, l) => s + l.calories, 0);
    days.push({
      label: d.toLocaleDateString("en", { weekday: "short" }),
      calories: total,
      pct: Math.min(total / target, 1.2),
    });
  }

  return (
    <div className="flex items-end gap-2 h-32 pt-4">
      {days.map((day) => (
        <div
          key={day.label}
          className="flex-1 flex flex-col items-center gap-1"
        >
          <div
            className="w-full flex items-end justify-center"
            style={{ height: "96px" }}
          >
            <div
              className="w-full rounded-t-md transition-all duration-500"
              style={{
                height: `${Math.max(day.pct * 96, 4)}px`,
                background:
                  day.calories > 0
                    ? day.pct >= 1
                      ? "oklch(0.72 0.16 55)"
                      : "oklch(0.68 0.14 145)"
                    : "rgba(255,255,255,0.08)",
              }}
            />
          </div>
          <span className="text-white/50 text-xs">{day.label}</span>
        </div>
      ))}
    </div>
  );
}

const MEAL_TYPE_COLORS: Record<string, string> = {
  Breakfast: "bg-yellow-500/20 text-yellow-300",
  Lunch: "bg-nutri-green/20 text-nutri-green",
  Dinner: "bg-blue-500/20 text-blue-300",
  Snack: "bg-nutri-orange/20 text-nutri-orange",
};

export default function DashboardTab({
  profile,
  logs,
  onAddLog,
  onDeleteLog,
}: DashboardTabProps) {
  const [open, setOpen] = useState(false);
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [mealType, setMealType] = useState<
    "Breakfast" | "Lunch" | "Dinner" | "Snack"
  >("Breakfast");

  const todayStr = new Date().toISOString().split("T")[0];
  const todayLogs = logs.filter((l) => l.date === todayStr);
  const consumed = todayLogs.reduce((s, l) => s + l.calories, 0);
  const { dailyCalorieTarget: target } = profile;

  const protein = Math.round((consumed * 0.25) / 4);
  const carbs = Math.round((consumed * 0.45) / 4);
  const fat = Math.round((consumed * 0.3) / 9);

  const handleAdd = () => {
    if (!mealName || !calories) return;
    onAddLog({
      name: mealName,
      calories: Number.parseInt(calories),
      type: mealType,
    });
    setMealName("");
    setCalories("");
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl font-bold text-white">
          Good day, {profile.name}! 👋
        </h2>
        <p className="text-white/60 mt-1">
          Your daily target:{" "}
          <span className="text-nutri-green font-semibold">{target} kcal</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-4"
          data-ocid="dashboard.card"
        >
          <h3 className="text-white/80 font-medium text-sm uppercase tracking-wider">
            Today's Progress
          </h3>
          <CircularProgress consumed={consumed} target={target} />
          <div className="w-full space-y-3">
            <MacroBar
              label="Protein"
              grams={protein}
              color="bg-nutri-green"
              max={Math.round((target * 0.25) / 4)}
            />
            <MacroBar
              label="Carbs"
              grams={carbs}
              color="bg-blue-400"
              max={Math.round((target * 0.45) / 4)}
            />
            <MacroBar
              label="Fat"
              grams={fat}
              color="bg-nutri-orange"
              max={Math.round((target * 0.3) / 9)}
            />
          </div>
        </motion.div>

        {/* Meal Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
          data-ocid="dashboard.panel"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold">Today's Meals</h3>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  data-ocid="dashboard.open_modal_button"
                  className="bg-nutri-green hover:bg-nutri-green/90 text-white rounded-full px-4 py-1.5 text-sm"
                >
                  <Plus className="w-4 h-4 mr-1" /> Log Meal
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-nutri-dark border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">Log a Meal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-2" data-ocid="dashboard.modal">
                  <div className="space-y-1.5">
                    <Label className="text-white/80">Meal Name</Label>
                    <Input
                      value={mealName}
                      onChange={(e) => setMealName(e.target.value)}
                      placeholder="e.g. Grilled chicken salad"
                      data-ocid="dashboard.input"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-white/80">Calories</Label>
                    <Input
                      type="number"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      placeholder="e.g. 450"
                      data-ocid="dashboard.input"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-white/80">Meal Type</Label>
                    <Select
                      value={mealType}
                      onValueChange={(v) =>
                        setMealType(
                          v as "Breakfast" | "Lunch" | "Dinner" | "Snack",
                        )
                      }
                    >
                      <SelectTrigger
                        data-ocid="dashboard.select"
                        className="bg-white/5 border-white/20 text-white"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Breakfast">Breakfast</SelectItem>
                        <SelectItem value="Lunch">Lunch</SelectItem>
                        <SelectItem value="Dinner">Dinner</SelectItem>
                        <SelectItem value="Snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={handleAdd}
                      data-ocid="dashboard.submit_button"
                      className="flex-1 bg-nutri-green hover:bg-nutri-green/90 text-white rounded-full"
                    >
                      Add to Log
                    </Button>
                    <Button
                      variant="outline"
                      data-ocid="dashboard.cancel_button"
                      onClick={() => setOpen(false)}
                      className="border-white/20 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {todayLogs.length === 0 ? (
            <div
              data-ocid="dashboard.empty_state"
              className="flex-1 flex flex-col items-center justify-center py-10 text-white/40"
            >
              <div className="text-4xl mb-2">🍽️</div>
              <p className="text-sm">
                No meals logged today. Click "Log Meal" to start!
              </p>
            </div>
          ) : (
            <div className="space-y-2 flex-1 overflow-y-auto max-h-64">
              {todayLogs.map((log, i) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
                  data-ocid={`dashboard.item.${i + 1}`}
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      className={`text-xs ${MEAL_TYPE_COLORS[log.type] || ""}`}
                    >
                      {log.type}
                    </Badge>
                    <span className="text-white font-medium text-sm">
                      {log.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-nutri-orange font-semibold text-sm">
                      {log.calories} kcal
                    </span>
                    <button
                      type="button"
                      onClick={() => onDeleteLog(log.id)}
                      data-ocid={`dashboard.delete_button.${i + 1}`}
                      className="text-white/30 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Weekly Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6"
        data-ocid="dashboard.panel"
      >
        <h3 className="text-white font-semibold mb-2">Weekly Calories</h3>
        <p className="text-white/50 text-sm mb-4">
          Orange = at/over target · Green = under target
        </p>
        <WeeklyChart logs={logs} target={target} />
      </motion.div>
    </div>
  );
}
