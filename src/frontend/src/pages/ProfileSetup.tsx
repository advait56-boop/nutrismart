import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Leaf } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type {
  ActivityLevel,
  CuisineRegion,
  HealthCondition,
  HealthGoal,
  UserProfile,
} from "../types/nutrismart";
import { calculateCalorieTarget } from "../utils/nutrition";

interface ProfileSetupProps {
  initialName?: string;
  onComplete: (profile: UserProfile) => void;
}

const HEALTH_CONDITIONS: HealthCondition[] = [
  "Diabetes",
  "Hypertension",
  "High Cholesterol",
  "Nut Allergy",
  "Shellfish Allergy",
  "Gluten Intolerance",
  "Lactose Intolerance",
];

export default function ProfileSetup({
  initialName,
  onComplete,
}: ProfileSetupProps) {
  const [name, setName] = useState(initialName || "");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] =
    useState<ActivityLevel>("Moderately Active");
  const [healthGoal, setHealthGoal] = useState<HealthGoal>("Maintenance");
  const [healthConditions, setHealthConditions] = useState<HealthCondition[]>(
    [],
  );
  const [cuisineRegion, setCuisineRegion] =
    useState<CuisineRegion>("Mediterranean");

  const toggleCondition = (cond: HealthCondition) => {
    setHealthConditions((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = calculateCalorieTarget(
      Number.parseFloat(weight),
      Number.parseFloat(height),
      Number.parseInt(age),
      gender,
      activityLevel,
      healthGoal,
    );
    const profile: UserProfile = {
      name,
      age: Number.parseInt(age),
      gender,
      height: Number.parseFloat(height),
      weight: Number.parseFloat(weight),
      activityLevel,
      healthGoal,
      healthConditions,
      cuisineRegion,
      dailyCalorieTarget: target,
    };
    localStorage.setItem("nutrismart_profile", JSON.stringify(profile));
    onComplete(profile);
  };

  const inputClass =
    "bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-nutri-green focus:ring-nutri-green/20";
  const selectTriggerClass =
    "bg-white/5 border-white/20 text-white focus:border-nutri-green";

  return (
    <div className="min-h-screen bg-nutri-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-nutri-green rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            Set Up Your Profile
          </h1>
          <p className="text-white/60">
            Tell us about yourself so we can personalize your nutrition plan
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          data-ocid="profile.modal"
          className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6"
        >
          {/* Name & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-white/80 text-sm">Your Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Johnson"
                required
                data-ocid="profile.input"
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/80 text-sm">Age</Label>
              <Input
                type="number"
                min={10}
                max={100}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 28"
                required
                data-ocid="profile.input"
                className={inputClass}
              />
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <Label className="text-white/80 text-sm">Gender</Label>
            <Select
              value={gender}
              onValueChange={(v) => setGender(v as "Male" | "Female" | "Other")}
            >
              <SelectTrigger
                data-ocid="profile.select"
                className={selectTriggerClass}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Height & Weight */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-white/80 text-sm">Height (cm)</Label>
              <Input
                type="number"
                min={100}
                max={250}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 175"
                required
                data-ocid="profile.input"
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/80 text-sm">Weight (kg)</Label>
              <Input
                type="number"
                min={30}
                max={300}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 70"
                required
                data-ocid="profile.input"
                className={inputClass}
              />
            </div>
          </div>

          {/* Activity Level */}
          <div className="space-y-1.5">
            <Label className="text-white/80 text-sm">Activity Level</Label>
            <Select
              value={activityLevel}
              onValueChange={(v) => setActivityLevel(v as ActivityLevel)}
            >
              <SelectTrigger
                data-ocid="profile.select"
                className={selectTriggerClass}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(
                  [
                    "Sedentary",
                    "Lightly Active",
                    "Moderately Active",
                    "Very Active",
                    "Extra Active",
                  ] as ActivityLevel[]
                ).map((lvl) => (
                  <SelectItem key={lvl} value={lvl}>
                    {lvl}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Health Goal */}
          <div className="space-y-1.5">
            <Label className="text-white/80 text-sm">Health Goal</Label>
            <Select
              value={healthGoal}
              onValueChange={(v) => setHealthGoal(v as HealthGoal)}
            >
              <SelectTrigger
                data-ocid="profile.select"
                className={selectTriggerClass}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(
                  [
                    "Weight Loss",
                    "Muscle Gain",
                    "Maintenance",
                    "Condition Management",
                  ] as HealthGoal[]
                ).map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Health Conditions */}
          <div className="space-y-2">
            <Label className="text-white/80 text-sm">
              Health Conditions (select all that apply)
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {HEALTH_CONDITIONS.map((cond) => (
                <div
                  key={cond}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <Checkbox
                    data-ocid="profile.checkbox"
                    checked={healthConditions.includes(cond)}
                    onCheckedChange={() => toggleCondition(cond)}
                    className="border-white/30 data-[state=checked]:bg-nutri-green data-[state=checked]:border-nutri-green"
                  />
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                    {cond}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cuisine Region */}
          <div className="space-y-1.5">
            <Label className="text-white/80 text-sm">
              Preferred Cuisine Region
            </Label>
            <Select
              value={cuisineRegion}
              onValueChange={(v) => setCuisineRegion(v as CuisineRegion)}
            >
              <SelectTrigger
                data-ocid="profile.select"
                className={selectTriggerClass}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(
                  [
                    "Mediterranean",
                    "Asian",
                    "American",
                    "Middle Eastern",
                    "South Asian",
                    "European",
                    "African",
                    "Latin American",
                  ] as CuisineRegion[]
                ).map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            data-ocid="profile.submit_button"
            className="w-full bg-nutri-green hover:bg-nutri-green/90 text-white rounded-full py-3 font-semibold text-base"
          >
            Calculate My Plan <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
