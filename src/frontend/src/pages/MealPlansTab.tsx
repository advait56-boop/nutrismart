import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { MealLog, UserProfile } from "../types/nutrismart";
import { getMealPlan, getMealPlanCount } from "../utils/nutrition";

interface MealPlansTabProps {
  profile: UserProfile;
  onAddToLog: (log: Omit<MealLog, "id" | "date">) => void;
}

const MEAL_EMOJIS: Record<string, string> = {
  breakfast: "🌅",
  lunch: "☀️",
  dinner: "🌙",
  snack: "🍎",
};

const CONDITION_TAG_MAP: Record<string, string[]> = {
  Diabetes: ["Low Sugar", "Diabetic-Friendly", "Low GI"],
  Hypertension: ["Low Sodium", "Heart Healthy"],
  "High Cholesterol": ["Low Saturated Fat", "Heart Healthy"],
  "Gluten Intolerance": ["Gluten-Free Option Available"],
  "Lactose Intolerance": ["Dairy-Free Option Available"],
};

export default function MealPlansTab({
  profile,
  onAddToLog,
}: MealPlansTabProps) {
  const [variant, setVariant] = useState(0);
  const maxVariants = getMealPlanCount(profile.cuisineRegion);
  const plan = getMealPlan(profile.cuisineRegion, variant);

  const conditionTags = profile.healthConditions.flatMap(
    (c) => CONDITION_TAG_MAP[c] || [],
  );
  const uniqueTags = [...new Set(conditionTags)];

  const handleRegenerate = () => {
    setVariant((prev) => (prev + 1) % maxVariants);
  };

  const meals = [
    { key: "breakfast", label: "Breakfast", item: plan.breakfast },
    { key: "lunch", label: "Lunch", item: plan.lunch },
    { key: "dinner", label: "Dinner", item: plan.dinner },
    { key: "snack", label: "Snack", item: plan.snack },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">
            Your Meal Plan
          </h2>
          <p className="text-white/60 mt-1">
            {profile.cuisineRegion} cuisine · {profile.dailyCalorieTarget} kcal
            target · Plan {variant + 1} of {maxVariants}
          </p>
        </div>
        <Button
          onClick={handleRegenerate}
          data-ocid="mealplan.secondary_button"
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10 rounded-full gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Regenerate Plan
        </Button>
      </div>

      {uniqueTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-white/50 text-sm">
            Health-conscious filters:
          </span>
          {uniqueTags.map((tag) => (
            <Badge
              key={tag}
              className="bg-nutri-green/20 text-nutri-green border-nutri-green/30 text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {meals.map(({ key, label, item }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-nutri-green/30 transition-colors"
            data-ocid={`mealplan.item.${i + 1}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{MEAL_EMOJIS[key]}</span>
                <span className="text-white/50 text-xs uppercase tracking-wider font-medium">
                  {label}
                </span>
              </div>
              <span className="text-nutri-orange font-bold text-sm">
                {item.calories} kcal
              </span>
            </div>
            <h3 className="text-white font-semibold text-base mb-1.5">
              {item.name}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {item.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-white/10 text-white/70 text-xs border-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <Button
              onClick={() =>
                onAddToLog({
                  name: item.name,
                  calories: item.calories,
                  type: label as "Breakfast" | "Lunch" | "Dinner" | "Snack",
                })
              }
              data-ocid="mealplan.secondary_button"
              size="sm"
              className="w-full bg-nutri-green/20 hover:bg-nutri-green/30 text-nutri-green border border-nutri-green/30 rounded-full text-sm"
            >
              + Add to Today's Log
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <span className="text-white/70 text-sm">Total Plan Calories</span>
          <span className="text-white font-bold">
            {plan.breakfast.calories +
              plan.lunch.calories +
              plan.dinner.calories +
              plan.snack.calories}{" "}
            kcal
          </span>
        </div>
        <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-nutri-green rounded-full"
            style={{
              width: `${Math.min(((plan.breakfast.calories + plan.lunch.calories + plan.dinner.calories + plan.snack.calories) / profile.dailyCalorieTarget) * 100, 100)}%`,
            }}
          />
        </div>
        <p className="text-white/40 text-xs mt-2">
          {Math.round(
            ((plan.breakfast.calories +
              plan.lunch.calories +
              plan.dinner.calories +
              plan.snack.calories) /
              profile.dailyCalorieTarget) *
              100,
          )}
          % of your daily target
        </p>
      </div>
    </div>
  );
}
