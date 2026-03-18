import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Camera, CheckCircle, Upload, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import type { FoodAnalysis, MealLog, UserProfile } from "../types/nutrismart";
import { analyzeFoodFromText } from "../utils/nutrition";

interface FoodAnalyzerTabProps {
  profile: UserProfile;
  onAddToLog: (log: Omit<MealLog, "id" | "date">) => void;
}

function MacroChip({
  label,
  value,
  color,
}: { label: string; value: string; color: string }) {
  return (
    <div className={`rounded-xl p-3 text-center ${color}`}>
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs opacity-70 mt-0.5">{label}</div>
    </div>
  );
}

export default function FoodAnalyzerTab({
  profile,
  onAddToLog,
}: FoodAnalyzerTabProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FoodAnalysis | null>(null);
  const [added, setAdded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  };

  const handleAnalyze = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setResult(null);
    setAdded(false);
    await new Promise((r) => setTimeout(r, 1500));
    const analysis = analyzeFoodFromText(description, profile);
    setResult(analysis);
    setLoading(false);
  };

  const handleAddToLog = () => {
    if (!result) return;
    onAddToLog({
      name: description.slice(0, 50) || "Analyzed Meal",
      calories: result.estimatedCalories,
      type: "Snack",
    });
    setAdded(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-white">
          Food Analyzer
        </h2>
        <p className="text-white/60 mt-1">
          Upload a photo and describe your meal to get instant nutrition info
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-4">
          {/* Drop Zone */}
          <div
            ref={dropRef}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
            data-ocid="analyzer.dropzone"
            className="relative border-2 border-dashed border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-nutri-green/50 transition-colors min-h-44 bg-white/3"
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && handleFile(e.target.files[0])
              }
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Food preview"
                className="max-h-36 rounded-xl object-cover"
              />
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-nutri-green/20 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-nutri-green" />
                </div>
                <div className="text-center">
                  <p className="text-white/70 font-medium text-sm">
                    Drop photo here or click to upload
                  </p>
                  <p className="text-white/40 text-xs mt-1">
                    PNG, JPG, WEBP supported
                  </p>
                </div>
              </>
            )}
            <Button
              type="button"
              size="sm"
              data-ocid="analyzer.upload_button"
              onClick={(e) => {
                e.stopPropagation();
                fileRef.current?.click();
              }}
              className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-full text-xs px-4"
            >
              <Upload className="w-3 h-3 mr-1" />{" "}
              {imagePreview ? "Change Photo" : "Choose File"}
            </Button>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="meal-description"
              className="text-white/80 text-sm font-medium"
            >
              Describe Your Meal
            </label>
            <Textarea
              id="meal-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. grilled chicken with rice and broccoli, or large burger with fries"
              data-ocid="analyzer.textarea"
              rows={3}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 resize-none focus:border-nutri-green"
            />
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={loading || !description.trim()}
            data-ocid="analyzer.primary_button"
            className="w-full bg-nutri-orange hover:bg-nutri-orange/90 text-white rounded-full py-3 font-semibold text-base"
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2">⚡</span> Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" /> Analyze Nutrition
              </>
            )}
          </Button>
        </div>

        {/* Results Panel */}
        <div>
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                data-ocid="analyzer.loading_state"
                className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 min-h-64"
              >
                <div className="w-14 h-14 rounded-full bg-nutri-orange/20 flex items-center justify-center animate-pulse">
                  <Zap className="w-7 h-7 text-nutri-orange" />
                </div>
                <p className="text-white/70 font-medium">
                  Analyzing your meal...
                </p>
                <p className="text-white/40 text-sm">
                  Calculating nutrition profile
                </p>
              </motion.div>
            )}

            {!loading && !result && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 min-h-64 text-center"
              >
                <div className="text-5xl">🔬</div>
                <p className="text-white/60 font-medium">
                  Results will appear here
                </p>
                <p className="text-white/40 text-sm">
                  Describe your meal and click Analyze
                </p>
              </motion.div>
            )}

            {!loading && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                data-ocid="analyzer.success_state"
                className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5"
              >
                {/* Calorie Hero */}
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-nutri-orange">
                    {result.estimatedCalories}
                  </div>
                  <div className="text-white/60 text-sm mt-1">
                    estimated calories
                  </div>
                  {result.foodName && (
                    <div className="text-white/40 text-xs mt-1">
                      Detected: {result.foodName}
                    </div>
                  )}
                </div>

                {/* Macros */}
                <div className="grid grid-cols-3 gap-3">
                  <MacroChip
                    label="Protein"
                    value={`${result.protein}g`}
                    color="bg-nutri-green/15 text-nutri-green"
                  />
                  <MacroChip
                    label="Carbs"
                    value={`${result.carbs}g`}
                    color="bg-blue-500/15 text-blue-300"
                  />
                  <MacroChip
                    label="Fat"
                    value={`${result.fat}g`}
                    color="bg-nutri-orange/15 text-nutri-orange"
                  />
                </div>

                {/* Verdict */}
                <div
                  className={`flex items-center gap-3 p-3 rounded-xl ${result.verdict === "fits" ? "bg-nutri-green/15 border border-nutri-green/30" : "bg-red-500/15 border border-red-500/30"}`}
                >
                  {result.verdict === "fits" ? (
                    <CheckCircle className="w-5 h-5 text-nutri-green shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  )}
                  <span
                    className={`font-medium text-sm ${result.verdict === "fits" ? "text-nutri-green" : "text-red-400"}`}
                  >
                    {result.verdict === "fits"
                      ? "Fits your daily budget ✓"
                      : "Exceeds remaining budget ✗"}
                  </span>
                </div>

                {/* Warnings */}
                {result.warnings.length > 0 && (
                  <div className="space-y-2">
                    {result.warnings.map((w) => (
                      <div
                        key={w}
                        className="text-sm text-yellow-300 bg-yellow-500/10 rounded-lg px-3 py-2 border border-yellow-500/20"
                      >
                        {w}
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  onClick={handleAddToLog}
                  disabled={added}
                  data-ocid="analyzer.primary_button"
                  className={`w-full rounded-full font-medium ${
                    added
                      ? "bg-nutri-green/20 text-nutri-green cursor-default"
                      : "bg-nutri-green hover:bg-nutri-green/90 text-white"
                  }`}
                >
                  {added ? "✓ Added to Today's Log" : "+ Add to Today's Log"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
