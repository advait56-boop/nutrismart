import { Button } from "@/components/ui/button";
import { Camera, ChevronRight, Leaf, MapPin, Star, Zap } from "lucide-react";
import { motion } from "motion/react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-nutri-dark text-white">
      {/* Sticky Nav */}
      <header className="sticky top-0 z-50 bg-nutri-nav border-b border-white/10 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-nutri-green rounded-full flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-white">
              NutriSmart
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <a
              href="#features"
              className="hover:text-nutri-green transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-nutri-green transition-colors"
            >
              How It Works
            </a>
            <a
              href="#meal-plans"
              className="hover:text-nutri-green transition-colors"
            >
              Meal Plans
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onGetStarted}
              data-ocid="nav.link"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Login
            </button>
            <Button
              onClick={onGetStarted}
              data-ocid="nav.primary_button"
              className="bg-nutri-orange hover:bg-nutri-orange/90 text-white rounded-full px-5 py-2 text-sm font-medium"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/nutrismart-hero.dim_1600x900.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-nutri-dark/80" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-28 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-nutri-green/20 border border-nutri-green/30 rounded-full px-4 py-1.5 mb-6">
              <Star className="w-3.5 h-3.5 text-nutri-green" />
              <span className="text-nutri-green text-sm font-medium">
                AI-Powered Nutrition Intelligence
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
              Your Personalized{" "}
              <span className="text-nutri-green">Nutrition</span>, Powered by AI
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
              Calculate your exact daily calorie needs, get region-specific meal
              plans, and analyze any food with a photo snap.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onGetStarted}
                data-ocid="hero.primary_button"
                className="bg-nutri-orange hover:bg-nutri-orange/90 text-white rounded-full px-8 py-3 text-base font-semibold shadow-lg"
              >
                Start Your Free Trial <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
              <button
                type="button"
                data-ocid="hero.secondary_button"
                className="text-white/80 hover:text-white border border-white/20 rounded-full px-8 py-3 text-base font-medium transition-colors"
                onClick={onGetStarted}
              >
                See How It Works
              </button>
            </div>
          </motion.div>
          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-xl"
          >
            {[
              { label: "Active Users", value: "50K+" },
              { label: "Meal Plans", value: "8 Regions" },
              { label: "Accuracy", value: "95%" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-nutri-green">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-nutri-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Three powerful tools in one smart nutrition platform
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-7 h-7" />,
                color: "bg-nutri-green/10 text-nutri-green",
                title: "Smart Calorie Calculator",
                desc: "Personalized daily targets using BMR + TDEE based on your exact body stats, activity, and health goals.",
              },
              {
                icon: <Camera className="w-7 h-7" />,
                color: "bg-nutri-orange/10 text-nutri-orange",
                title: "AI Food Photo Analyzer",
                desc: "Snap a photo of any meal, get instant calorie counts, macro breakdowns, and health condition warnings.",
              },
              {
                icon: <MapPin className="w-7 h-7" />,
                color: "bg-blue-500/10 text-blue-400",
                title: "Regional Meal Plans",
                desc: "Discover culturally authentic meal plans from 8 global regions, tailored to your conditions and calorie goal.",
              },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${feat.color}`}
                >
                  {feat.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-white/60 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-white/[0.03]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold text-white text-center mb-14"
          >
            Get Started in 3 Steps
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Build Your Profile",
                desc: "Enter your body stats, activity level, health goals, and any conditions.",
              },
              {
                step: "02",
                title: "Get Your Plan",
                desc: "Receive your personalized calorie target and a full regional meal plan.",
              },
              {
                step: "03",
                title: "Track & Analyze",
                desc: "Log meals, snap food photos, and stay on top of your nutrition daily.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-4"
              >
                <div className="text-4xl font-display font-bold text-nutri-green/30 leading-none">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{s.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-nutri-green/20 to-nutri-orange/10 border border-nutri-green/20 rounded-3xl p-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Eat Smarter?
            </h2>
            <p className="text-white/60 mb-8 text-lg">
              Join thousands tracking their nutrition the smart way.
            </p>
            <Button
              onClick={onGetStarted}
              data-ocid="cta.primary_button"
              className="bg-nutri-orange hover:bg-nutri-orange/90 text-white rounded-full px-10 py-3 text-base font-semibold"
            >
              Get Started Free
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nutri-nav border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-nutri-green rounded-full flex items-center justify-center">
              <Leaf className="w-3 h-3 text-white" />
            </div>
            <span className="font-display font-bold text-white text-sm">
              NutriSmart
            </span>
          </div>
          <p className="text-white/40 text-sm">
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
        </div>
      </footer>
    </div>
  );
}
