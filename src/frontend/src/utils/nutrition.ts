import type {
  ActivityLevel,
  CuisineRegion,
  FoodAnalysis,
  HealthCondition,
  HealthGoal,
  MealPlan,
  UserProfile,
} from "../types/nutrismart";

export function calculateCalorieTarget(
  weight: number,
  height: number,
  age: number,
  gender: "Male" | "Female" | "Other",
  activityLevel: ActivityLevel,
  healthGoal: HealthGoal,
): number {
  let bmr: number;
  if (gender === "Male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender === "Female") {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    const maleBmr = 10 * weight + 6.25 * height - 5 * age + 5;
    const femaleBmr = 10 * weight + 6.25 * height - 5 * age - 161;
    bmr = (maleBmr + femaleBmr) / 2;
  }

  const multipliers: Record<ActivityLevel, number> = {
    Sedentary: 1.2,
    "Lightly Active": 1.375,
    "Moderately Active": 1.55,
    "Very Active": 1.725,
    "Extra Active": 1.9,
  };

  const tdee = bmr * multipliers[activityLevel];

  if (healthGoal === "Weight Loss") return Math.round(tdee - 500);
  if (healthGoal === "Muscle Gain") return Math.round(tdee + 300);
  return Math.round(tdee);
}

const MEAL_PLANS: Record<CuisineRegion, MealPlan[]> = {
  Mediterranean: [
    {
      breakfast: {
        name: "Greek Yogurt Parfait",
        description:
          "Creamy Greek yogurt layered with honey, walnuts, and fresh berries",
        calories: 320,
        tags: ["High Protein", "Probiotic"],
      },
      lunch: {
        name: "Grilled Chicken Salad",
        description:
          "Tender grilled chicken over mixed greens with olives, tomatoes, and feta",
        calories: 450,
        tags: ["Low Carb", "High Protein"],
      },
      dinner: {
        name: "Baked Salmon with Tabbouleh",
        description:
          "Herb-crusted salmon fillet with lemon and fresh tabbouleh salad",
        calories: 520,
        tags: ["Omega-3", "Heart Healthy"],
      },
      snack: {
        name: "Hummus & Veggie Sticks",
        description:
          "Creamy chickpea hummus with cucumber, carrot, and bell pepper",
        calories: 180,
        tags: ["Plant-Based", "Fiber Rich"],
      },
    },
    {
      breakfast: {
        name: "Avocado Toast with Poached Eggs",
        description:
          "Whole grain toast topped with smashed avocado and perfectly poached eggs",
        calories: 380,
        tags: ["Healthy Fats", "High Protein"],
      },
      lunch: {
        name: "Lentil Soup",
        description:
          "Hearty red lentil soup with cumin, turmeric, and a squeeze of lemon",
        calories: 290,
        tags: ["High Fiber", "Plant-Based"],
      },
      dinner: {
        name: "Lamb Kebabs with Roasted Veggies",
        description:
          "Spiced ground lamb kebabs served with roasted eggplant and zucchini",
        calories: 580,
        tags: ["High Protein", "Iron Rich"],
      },
      snack: {
        name: "Mixed Olives & Feta",
        description: "Assorted marinated olives with crumbled feta cheese",
        calories: 150,
        tags: ["Healthy Fats", "Mediterranean"],
      },
    },
    {
      breakfast: {
        name: "Shakshuka",
        description:
          "Eggs poached in spiced tomato and pepper sauce with fresh herbs",
        calories: 340,
        tags: ["High Protein", "Antioxidant Rich"],
      },
      lunch: {
        name: "Falafel Pita Wrap",
        description:
          "Crispy chickpea falafel in warm pita with tzatziki and fresh vegetables",
        calories: 480,
        tags: ["Plant-Based", "High Fiber"],
      },
      dinner: {
        name: "Grilled Sea Bass with Orzo",
        description:
          "Lemon-herb grilled sea bass with saffron orzo and cherry tomatoes",
        calories: 510,
        tags: ["Heart Healthy", "Omega-3"],
      },
      snack: {
        name: "Fresh Fruit Platter",
        description:
          "Seasonal fruits: figs, grapes, and melon with a drizzle of honey",
        calories: 130,
        tags: ["Natural Sugars", "Antioxidants"],
      },
    },
  ],
  Asian: [
    {
      breakfast: {
        name: "Congee with Toppings",
        description:
          "Silky rice porridge topped with soft-boiled egg, scallions, and sesame",
        calories: 280,
        tags: ["Easy to Digest", "Warming"],
      },
      lunch: {
        name: "Vietnamese Pho",
        description:
          "Aromatic bone broth noodle soup with thin beef slices and fresh herbs",
        calories: 420,
        tags: ["Bone Broth", "Low Fat"],
      },
      dinner: {
        name: "Teriyaki Salmon Bowl",
        description:
          "Glazed teriyaki salmon over steamed brown rice with edamame and pickled ginger",
        calories: 540,
        tags: ["Omega-3", "Balanced"],
      },
      snack: {
        name: "Edamame with Sea Salt",
        description: "Steamed young soybeans lightly salted",
        calories: 120,
        tags: ["High Protein", "Plant-Based"],
      },
    },
    {
      breakfast: {
        name: "Tamago Toast",
        description:
          "Japanese-style fluffy egg toast with light mayo and katsu sauce",
        calories: 310,
        tags: ["High Protein", "Energizing"],
      },
      lunch: {
        name: "Thai Green Curry",
        description:
          "Fragrant green curry with tofu, vegetables, and jasmine rice",
        calories: 490,
        tags: ["Plant-Based", "Antioxidant Rich"],
      },
      dinner: {
        name: "Korean Bibimbap",
        description:
          "Rice bowl with assorted vegetables, gochujang, and a fried egg",
        calories: 520,
        tags: ["Balanced", "Vegetable Rich"],
      },
      snack: {
        name: "Miso Soup with Tofu",
        description:
          "Umami-rich miso broth with silken tofu and wakame seaweed",
        calories: 85,
        tags: ["Probiotic", "Low Calorie"],
      },
    },
    {
      breakfast: {
        name: "Dim Sum Breakfast",
        description: "Steamed har gow, siu mai, and congee with ginger tea",
        calories: 360,
        tags: ["Traditional", "Light"],
      },
      lunch: {
        name: "Pad Thai",
        description:
          "Stir-fried rice noodles with shrimp, bean sprouts, and roasted peanuts",
        calories: 460,
        tags: ["High Protein", "Balanced"],
      },
      dinner: {
        name: "Hainanese Chicken Rice",
        description:
          "Poached chicken with fragrant rice, chili sauce, and ginger scallion oil",
        calories: 500,
        tags: ["Lean Protein", "Low Fat"],
      },
      snack: {
        name: "Green Tea & Rice Crackers",
        description:
          "Light rice crackers with a calming cup of matcha green tea",
        calories: 110,
        tags: ["Antioxidant", "Light"],
      },
    },
  ],
  American: [
    {
      breakfast: {
        name: "Blueberry Oat Pancakes",
        description:
          "Fluffy whole grain pancakes studded with fresh blueberries, light maple syrup",
        calories: 380,
        tags: ["Whole Grain", "Antioxidants"],
      },
      lunch: {
        name: "Turkey Club Sandwich",
        description:
          "Sliced turkey breast with avocado, bacon, lettuce, and tomato on whole wheat",
        calories: 480,
        tags: ["High Protein", "Balanced"],
      },
      dinner: {
        name: "Grilled Chicken & Sweet Potato",
        description:
          "Herb-marinated grilled chicken breast with roasted sweet potato and steamed broccoli",
        calories: 520,
        tags: ["Lean Protein", "High Fiber"],
      },
      snack: {
        name: "Apple Slices with Peanut Butter",
        description: "Crisp apple slices with natural creamy peanut butter",
        calories: 200,
        tags: ["Healthy Fats", "Natural Fiber"],
      },
    },
    {
      breakfast: {
        name: "Veggie Egg Scramble",
        description:
          "Fluffy eggs scrambled with bell peppers, onions, mushrooms, and spinach",
        calories: 290,
        tags: ["High Protein", "Low Carb"],
      },
      lunch: {
        name: "Quinoa Power Bowl",
        description:
          "Protein-packed quinoa with roasted chickpeas, kale, and lemon tahini dressing",
        calories: 440,
        tags: ["Plant-Based", "Complete Protein"],
      },
      dinner: {
        name: "Baked Salmon & Asparagus",
        description:
          "Garlic-herb baked salmon with roasted asparagus and wild rice",
        calories: 530,
        tags: ["Omega-3", "Heart Healthy"],
      },
      snack: {
        name: "Greek Yogurt with Granola",
        description:
          "Plain Greek yogurt topped with honey granola and chia seeds",
        calories: 220,
        tags: ["Probiotic", "High Protein"],
      },
    },
    {
      breakfast: {
        name: "Overnight Oats",
        description:
          "Rolled oats soaked in almond milk with banana, chia seeds, and almond butter",
        calories: 350,
        tags: ["High Fiber", "No Cook"],
      },
      lunch: {
        name: "Chicken Caesar Salad",
        description:
          "Romaine lettuce with grilled chicken, parmesan, croutons, and Caesar dressing",
        calories: 420,
        tags: ["High Protein", "Calcium Rich"],
      },
      dinner: {
        name: "Lean Beef Tacos",
        description:
          "Seasoned lean ground beef in corn tortillas with pico de gallo and avocado",
        calories: 490,
        tags: ["High Protein", "Iron Rich"],
      },
      snack: {
        name: "Trail Mix",
        description:
          "Mixed nuts, dried cranberries, dark chocolate chips, and seeds",
        calories: 230,
        tags: ["Healthy Fats", "Energy Boost"],
      },
    },
  ],
  "Middle Eastern": [
    {
      breakfast: {
        name: "Ful Medames",
        description:
          "Slow-cooked fava beans with olive oil, garlic, cumin, and a soft-boiled egg",
        calories: 340,
        tags: ["High Fiber", "Plant-Based"],
      },
      lunch: {
        name: "Chicken Shawarma Bowl",
        description:
          "Marinated rotisserie chicken with hummus, tabbouleh, and warm flatbread",
        calories: 520,
        tags: ["High Protein", "Balanced"],
      },
      dinner: {
        name: "Lamb Kofta with Saffron Rice",
        description:
          "Spiced lamb meatballs with fragrant saffron rice and roasted tomatoes",
        calories: 580,
        tags: ["Iron Rich", "Traditional"],
      },
      snack: {
        name: "Dates & Mixed Nuts",
        description:
          "Medjool dates stuffed with almonds and a sprinkle of cardamom",
        calories: 160,
        tags: ["Natural Energy", "Iron Rich"],
      },
    },
    {
      breakfast: {
        name: "Labneh with Za'atar",
        description:
          "Strained yogurt cheese drizzled with olive oil and za'atar herb blend with pita",
        calories: 290,
        tags: ["Probiotic", "High Protein"],
      },
      lunch: {
        name: "Fattoush Salad with Falafel",
        description:
          "Fresh vegetable salad with crispy pita chips, pomegranate, and herbed falafel",
        calories: 380,
        tags: ["Plant-Based", "High Fiber"],
      },
      dinner: {
        name: "Grilled Sea Bream with Couscous",
        description:
          "Whole grilled fish seasoned with chermoula and served with herbed couscous",
        calories: 490,
        tags: ["Omega-3", "Heart Healthy"],
      },
      snack: {
        name: "Muhammara Dip",
        description: "Roasted red pepper and walnut dip with warm flatbread",
        calories: 180,
        tags: ["Antioxidants", "Healthy Fats"],
      },
    },
    {
      breakfast: {
        name: "Menemen",
        description:
          "Turkish-style scrambled eggs with tomatoes, green peppers, and spices",
        calories: 310,
        tags: ["High Protein", "Vegetable Rich"],
      },
      lunch: {
        name: "Mujaddara",
        description:
          "Lentils and rice caramelized with crispy onions and cumin",
        calories: 350,
        tags: ["High Fiber", "Plant-Based"],
      },
      dinner: {
        name: "Moroccan Chicken Tagine",
        description:
          "Slow-braised chicken with preserved lemon, olives, and couscous",
        calories: 560,
        tags: ["Traditional", "High Protein"],
      },
      snack: {
        name: "Watermelon & Mint",
        description: "Fresh chilled watermelon cubes with fresh mint leaves",
        calories: 85,
        tags: ["Hydrating", "Low Calorie"],
      },
    },
  ],
  "South Asian": [
    {
      breakfast: {
        name: "Masala Omelette",
        description:
          "Fluffy eggs with onions, green chili, tomatoes, and cilantro served with whole wheat toast",
        calories: 320,
        tags: ["High Protein", "Spiced"],
      },
      lunch: {
        name: "Dal Tadka with Brown Rice",
        description:
          "Yellow lentils tempered with ghee, cumin, mustard seeds, and curry leaves",
        calories: 420,
        tags: ["High Protein", "High Fiber"],
      },
      dinner: {
        name: "Tandoori Chicken with Raita",
        description:
          "Yogurt-marinated chicken grilled to perfection with mint raita and naan",
        calories: 520,
        tags: ["High Protein", "Probiotic"],
      },
      snack: {
        name: "Chana Chaat",
        description:
          "Spiced chickpea salad with tamarind chutney, onions, and pomegranate seeds",
        calories: 160,
        tags: ["High Fiber", "Plant-Based"],
      },
    },
    {
      breakfast: {
        name: "Poha with Peanuts",
        description:
          "Flattened rice stir-fried with peanuts, turmeric, curry leaves, and lemon",
        calories: 290,
        tags: ["Light", "Gluten-Free"],
      },
      lunch: {
        name: "Palak Paneer with Roti",
        description:
          "Creamy spinach curry with cottage cheese cubes and whole wheat flatbread",
        calories: 460,
        tags: ["High Calcium", "Iron Rich"],
      },
      dinner: {
        name: "Chicken Biryani",
        description:
          "Fragrant basmati rice layered with spiced chicken, saffron, and fried onions",
        calories: 580,
        tags: ["Complete Meal", "Traditional"],
      },
      snack: {
        name: "Lassi & Fruit",
        description: "Chilled sweet yogurt drink with seasonal fresh fruit",
        calories: 180,
        tags: ["Probiotic", "Calcium Rich"],
      },
    },
    {
      breakfast: {
        name: "Idli Sambar",
        description:
          "Steamed rice cakes with aromatic lentil vegetable sambar and coconut chutney",
        calories: 300,
        tags: ["Probiotic", "Low Fat"],
      },
      lunch: {
        name: "Rajma with Jeera Rice",
        description:
          "Kidney bean curry in tomato gravy with cumin-tempered basmati rice",
        calories: 480,
        tags: ["High Protein", "Plant-Based"],
      },
      dinner: {
        name: "Grilled Fish Tikka with Salad",
        description:
          "Spiced yogurt-marinated fish tikka with a fresh cucumber salad",
        calories: 440,
        tags: ["Lean Protein", "Low Carb"],
      },
      snack: {
        name: "Roasted Makhana",
        description:
          "Lightly spiced and roasted lotus seeds with a hint of ghee",
        calories: 120,
        tags: ["Low Calorie", "Antioxidants"],
      },
    },
  ],
  European: [
    {
      breakfast: {
        name: "Bircher Muesli",
        description:
          "Swiss overnight oats with grated apple, berries, and toasted almonds",
        calories: 340,
        tags: ["High Fiber", "No Cook"],
      },
      lunch: {
        name: "Niçoise Salad",
        description:
          "French-style salad with tuna, green beans, boiled eggs, olives, and anchovies",
        calories: 430,
        tags: ["High Protein", "Omega-3"],
      },
      dinner: {
        name: "Chicken Piccata with Pasta",
        description:
          "Pan-seared chicken in lemon-caper sauce with whole wheat pasta",
        calories: 540,
        tags: ["High Protein", "Balanced"],
      },
      snack: {
        name: "Cheese & Whole Grain Crackers",
        description: "Aged cheese slices with seeded crackers and a few grapes",
        calories: 190,
        tags: ["Calcium Rich", "Satisfying"],
      },
    },
    {
      breakfast: {
        name: "Scandinavian Smørrebrød",
        description:
          "Dark rye bread with smoked salmon, cream cheese, cucumber, and dill",
        calories: 310,
        tags: ["Omega-3", "High Protein"],
      },
      lunch: {
        name: "Minestrone Soup",
        description:
          "Italian vegetable soup with cannellini beans, pasta, and parmesan",
        calories: 320,
        tags: ["High Fiber", "Plant-Based"],
      },
      dinner: {
        name: "Boef Bourguignon with Roasted Vegetables",
        description:
          "Slow-braised beef in Burgundy wine with mushrooms and root vegetables",
        calories: 580,
        tags: ["Iron Rich", "Traditional"],
      },
      snack: {
        name: "Yogurt with Honey Walnuts",
        description:
          "European-style plain yogurt drizzled with wildflower honey and walnuts",
        calories: 200,
        tags: ["Probiotic", "Healthy Fats"],
      },
    },
    {
      breakfast: {
        name: "Poached Eggs & Soldiers",
        description:
          "British-style soft poached eggs with whole grain bread soldiers and smoked salmon",
        calories: 370,
        tags: ["High Protein", "Omega-3"],
      },
      lunch: {
        name: "Greek-Style Stuffed Peppers",
        description:
          "Bell peppers stuffed with herb-seasoned rice, lamb, and tomato sauce",
        calories: 450,
        tags: ["Balanced", "Traditional"],
      },
      dinner: {
        name: "Paella",
        description:
          "Spanish saffron rice with chicken, chorizo, shrimp, and seasonal vegetables",
        calories: 560,
        tags: ["Seafood Rich", "Traditional"],
      },
      snack: {
        name: "Crudités with Tzatziki",
        description: "Raw vegetables with cucumber-dill Greek yogurt dip",
        calories: 110,
        tags: ["Low Calorie", "Probiotic"],
      },
    },
  ],
  African: [
    {
      breakfast: {
        name: "Injera with Scrambled Eggs",
        description:
          "Ethiopian sourdough flatbread with spiced scrambled eggs and fresh tomatoes",
        calories: 340,
        tags: ["Probiotic", "High Protein"],
      },
      lunch: {
        name: "Jollof Rice with Chicken",
        description:
          "West African spiced tomato rice with grilled chicken and fried plantains",
        calories: 540,
        tags: ["Traditional", "Balanced"],
      },
      dinner: {
        name: "Peanut Stew with Fufu",
        description: "Rich groundnut stew with tender beef and cassava fufu",
        calories: 590,
        tags: ["High Protein", "Traditional"],
      },
      snack: {
        name: "Fresh Mango & Coconut",
        description:
          "Ripe mango slices with shredded coconut and a squeeze of lime",
        calories: 140,
        tags: ["Vitamin C", "Natural Sugars"],
      },
    },
    {
      breakfast: {
        name: "Akara (Bean Fritters)",
        description:
          "Crispy black-eyed pea fritters with fresh pepper sauce and pap",
        calories: 310,
        tags: ["Plant-Based", "High Protein"],
      },
      lunch: {
        name: "Moroccan Harira Soup",
        description:
          "Spiced lentil and chickpea soup with lamb, tomatoes, and fresh herbs",
        calories: 380,
        tags: ["High Fiber", "Iron Rich"],
      },
      dinner: {
        name: "Tilapia Egusi Stew",
        description:
          "Melon seed stew with fresh fish, leafy greens, and palm oil served with rice",
        calories: 520,
        tags: ["Omega-3", "Traditional"],
      },
      snack: {
        name: "Roasted Peanuts & Banana",
        description: "Lightly salted roasted peanuts with a fresh banana",
        calories: 200,
        tags: ["Natural Energy", "High Protein"],
      },
    },
    {
      breakfast: {
        name: "Ethiopian Chechebsa",
        description:
          "Flatbread crumbled with spiced butter (niter kibbeh) and berbere spice blend",
        calories: 390,
        tags: ["Energizing", "Traditional"],
      },
      lunch: {
        name: "South African Bobotie",
        description:
          "Spiced minced meat bake with apricots, almonds, and turmeric egg custard topping",
        calories: 460,
        tags: ["High Protein", "Sweet-Savory"],
      },
      dinner: {
        name: "Grilled Tilapia with Ugali",
        description:
          "Herb-marinated grilled tilapia with maize ugali and sukuma wiki greens",
        calories: 490,
        tags: ["Lean Protein", "Traditional"],
      },
      snack: {
        name: "Biltong & Dried Fruit",
        description: "South African air-dried beef biltong with dried apricots",
        calories: 170,
        tags: ["High Protein", "Iron Rich"],
      },
    },
  ],
  "Latin American": [
    {
      breakfast: {
        name: "Huevos Rancheros",
        description:
          "Corn tortillas topped with fried eggs in spiced tomato-chili sauce and black beans",
        calories: 380,
        tags: ["High Protein", "Traditional"],
      },
      lunch: {
        name: "Ceviche with Tostadas",
        description:
          "Fresh lime-cured fish with red onion, cilantro, and avocado on crispy tostadas",
        calories: 320,
        tags: ["Low Calorie", "High Protein"],
      },
      dinner: {
        name: "Chicken Mole with Brown Rice",
        description:
          "Tender chicken in rich dark mole sauce with brown rice and roasted corn",
        calories: 560,
        tags: ["Traditional", "Complex Flavors"],
      },
      snack: {
        name: "Guacamole & Corn Chips",
        description:
          "Fresh avocado dip with garlic, lime, and cilantro with baked corn tortilla chips",
        calories: 240,
        tags: ["Healthy Fats", "Plant-Based"],
      },
    },
    {
      breakfast: {
        name: "Açaí Bowl",
        description:
          "Frozen açaí blend topped with granola, banana, strawberries, and honey",
        calories: 360,
        tags: ["Antioxidants", "Energizing"],
      },
      lunch: {
        name: "Black Bean Soup",
        description:
          "Creamy black bean soup with cumin, smoked paprika, topped with sour cream and lime",
        calories: 350,
        tags: ["High Fiber", "Plant-Based"],
      },
      dinner: {
        name: "Grilled Churrasco Steak",
        description:
          "Brazilian-style grilled skirt steak with chimichurri and potato salad",
        calories: 580,
        tags: ["High Protein", "Iron Rich"],
      },
      snack: {
        name: "Papaya with Lime",
        description:
          "Fresh papaya drizzled with lime juice and a sprinkle of chili powder",
        calories: 85,
        tags: ["Digestive Aid", "Low Calorie"],
      },
    },
    {
      breakfast: {
        name: "Arepas con Huevo",
        description:
          "Crispy cornmeal cakes stuffed with scrambled eggs, cheese, and fresh avocado",
        calories: 410,
        tags: ["Traditional", "High Protein"],
      },
      lunch: {
        name: "Lomo Saltado",
        description:
          "Peruvian stir-fried beef with soy sauce, tomatoes, onions, and French fries",
        calories: 520,
        tags: ["Fusion", "High Protein"],
      },
      dinner: {
        name: "Seafood Paella Latina",
        description:
          "Spiced saffron rice with shrimp, mussels, chorizo, and roasted peppers",
        calories: 540,
        tags: ["Seafood Rich", "Balanced"],
      },
      snack: {
        name: "Tostones with Mojo Sauce",
        description:
          "Twice-fried plantain slices with garlic citrus dipping sauce",
        calories: 180,
        tags: ["Traditional", "Satisfying"],
      },
    },
  ],
};

export function getMealPlan(region: CuisineRegion, variant: number): MealPlan {
  const plans = MEAL_PLANS[region];
  return plans[variant % plans.length];
}

export function getMealPlanCount(region: CuisineRegion): number {
  return MEAL_PLANS[region].length;
}

const FOOD_KEYWORDS: Record<string, number> = {
  salad: 150,
  burger: 550,
  pizza: 285,
  rice: 200,
  chicken: 165,
  pasta: 350,
  apple: 95,
  banana: 105,
  sandwich: 350,
  soup: 180,
  eggs: 155,
  oatmeal: 150,
  steak: 400,
  fish: 200,
  bread: 270,
  milk: 150,
  cheese: 300,
  yogurt: 100,
  smoothie: 220,
  juice: 120,
  coffee: 5,
  tea: 2,
  noodles: 300,
  tofu: 120,
  shrimp: 110,
  salmon: 208,
  tuna: 140,
  beef: 250,
  pork: 290,
  lamb: 320,
  broccoli: 55,
  carrot: 52,
  potato: 160,
  corn: 130,
  beans: 130,
  lentils: 230,
  avocado: 160,
  nuts: 580,
  chocolate: 540,
  cake: 350,
  cookie: 200,
  fries: 320,
  sushi: 150,
  ramen: 400,
  burrito: 490,
  taco: 180,
  wrap: 380,
  curry: 350,
  hummus: 180,
  granola: 380,
  waffle: 290,
  pancake: 200,
  muffin: 340,
  bagel: 250,
};

export function analyzeFoodFromText(
  description: string,
  profile: UserProfile,
): FoodAnalysis {
  const lower = description.toLowerCase();
  let totalCalories = 0;
  let matchedFoods: string[] = [];

  for (const [keyword, calories] of Object.entries(FOOD_KEYWORDS)) {
    if (lower.includes(keyword)) {
      totalCalories += calories;
      matchedFoods.push(keyword);
    }
  }

  if (totalCalories === 0) totalCalories = 350; // default estimate
  if (matchedFoods.length === 0)
    matchedFoods = [description.split(" ")[0] || "meal"];

  // Macro estimate: balanced macros
  const protein = Math.round((totalCalories * 0.25) / 4);
  const carbs = Math.round((totalCalories * 0.45) / 4);
  const fat = Math.round((totalCalories * 0.3) / 9);

  // Get today's consumed
  const todayStr = new Date().toISOString().split("T")[0];
  const logs: Array<{ date: string; calories: number }> = JSON.parse(
    localStorage.getItem("nutrismart_logs") || "[]",
  );
  const consumed = logs
    .filter((l) => l.date === todayStr)
    .reduce((s, l) => s + l.calories, 0);
  const remaining = profile.dailyCalorieTarget - consumed;
  const verdict = totalCalories <= remaining ? "fits" : "exceeds";

  const warnings: string[] = [];
  const conditions = profile.healthConditions || [];

  if (
    conditions.includes("Diabetes") &&
    (lower.includes("cake") ||
      lower.includes("cookie") ||
      lower.includes("juice") ||
      lower.includes("sugar") ||
      lower.includes("candy"))
  ) {
    warnings.push("⚠️ High sugar content — caution for diabetics");
  }
  if (
    conditions.includes("Hypertension") &&
    (lower.includes("salt") ||
      lower.includes("fries") ||
      lower.includes("chips") ||
      lower.includes("burger"))
  ) {
    warnings.push("⚠️ High sodium — caution for hypertension");
  }
  if (
    conditions.includes("High Cholesterol") &&
    (lower.includes("cheese") ||
      lower.includes("butter") ||
      lower.includes("steak") ||
      lower.includes("beef"))
  ) {
    warnings.push("⚠️ High saturated fat — caution for high cholesterol");
  }
  if (
    conditions.includes("Nut Allergy") &&
    (lower.includes("nuts") ||
      lower.includes("peanut") ||
      lower.includes("almond") ||
      lower.includes("walnut"))
  ) {
    warnings.push("🚫 Contains nuts — allergen alert!");
  }
  if (
    conditions.includes("Shellfish Allergy") &&
    (lower.includes("shrimp") ||
      lower.includes("crab") ||
      lower.includes("lobster") ||
      lower.includes("shellfish"))
  ) {
    warnings.push("🚫 Contains shellfish — allergen alert!");
  }
  if (
    conditions.includes("Gluten Intolerance") &&
    (lower.includes("bread") ||
      lower.includes("pasta") ||
      lower.includes("wheat") ||
      lower.includes("flour") ||
      lower.includes("noodles"))
  ) {
    warnings.push("⚠️ Contains gluten — avoid if gluten intolerant");
  }
  if (
    conditions.includes("Lactose Intolerance") &&
    (lower.includes("milk") ||
      lower.includes("cheese") ||
      lower.includes("yogurt") ||
      lower.includes("butter") ||
      lower.includes("cream"))
  ) {
    warnings.push("⚠️ Contains dairy — avoid if lactose intolerant");
  }

  return {
    estimatedCalories: totalCalories,
    protein,
    carbs,
    fat,
    verdict,
    warnings,
    foodName: matchedFoods.join(" + "),
  };
}
