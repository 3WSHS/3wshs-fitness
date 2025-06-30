"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from 'react';
import { Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import { searchUSDAFoods, getUSDAFoodDetails } from '../../utils/usdaApi';
import { searchOpenFoodFacts, getOpenFoodFactsDetails } from '../../utils/openFoodFactsApi';
import { Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Helper to get date string
const getDateString = (date: Date) => date.toISOString().slice(0, 10);

// Add at the top, after imports
interface FoodResult {
  id: string;
  name: string;
  brand?: string;
  source: string;
  serving: string;
  calories: number;
}

// Add at the top, after FoodResult interface
interface FoodPortion {
  label: string;
  description: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  gramWeight?: number;
}

// Define the standard units
const STANDARD_UNITS = [
  'egg', 'cup', 'g', 'oz', 'lb', 'fl oz', 'ml', 'L', 'mg', 'tsp', 'tbsp', 'kg', 'ltr'
];

// Define a master list of vitamins and minerals at the top of the file:
const MICRONUTRIENT_MASTER_LIST = [
  'Vitamin A, RAE',
  'Vitamin C, total ascorbic acid',
  'Vitamin D (D2 + D3), International Units',
  'Vitamin E (alpha-tocopherol)',
  'Vitamin K (phylloquinone)',
  'Thiamin',
  'Riboflavin',
  'Niacin',
  'Vitamin B6',
  'Folate, total',
  'Vitamin B12',
  'Calcium, Ca',
  'Iron, Fe',
  'Magnesium, Mg',
  'Phosphorus, P',
  'Potassium, K',
  'Sodium, Na',
  'Zinc, Zn',
  'Copper, Cu',
  'Manganese, Mn',
  'Selenium, Se',
  'Choline, total',
  'Iodine, I',
  'Pantothenic acid',
  'Biotin',
  'Chromium, Cr',
  'Molybdenum, Mo',
  'Fluoride, F',
];

export default function NutritionPage() {
  // Mock data
  const calories = { goal: 2370, food: 1200, exercise: 200 };
  const macros = { carbs: 180, protein: 120, fat: 60 };
  const micros = { sodium: 1200, potassium: 2000, iron: 12 };
  const weight = { current: 180, goal: 170 };
  // Add state for weight goal
  const [weightGoal, setWeightGoal] = useState<number>(170);
  useEffect(() => {
    const stored = localStorage.getItem('weightGoal');
    if (stored) setWeightGoal(Number(stored));
  }, []);
  // Add state for current weight (could be user input in the future)
  const [currentWeight, setCurrentWeight] = useState<number>(180);
  useEffect(() => {
    const stored = localStorage.getItem('currentWeight');
    if (stored) setCurrentWeight(Number(stored));
  }, []);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [newWeight, setNewWeight] = useState(currentWeight);

  // Weight history state
  const [weightHistory, setWeightHistory] = useState<{ date: string; weight: number }[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem('weightHistory');
    try {
      if (stored) setWeightHistory(JSON.parse(stored) as { date: string; weight: number }[]);
      else setWeightHistory([]);
    } catch {
      setWeightHistory([]);
    }
  }, []);
  // For the weight modal
  const [weightDate, setWeightDate] = useState(() => new Date().toISOString().slice(0, 10));

  // Persist weightHistory
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('weightHistory', JSON.stringify(weightHistory));
    }
  }, [weightHistory]);

  // Add new weight entry or update existing for the date
  function logWeight(newWeight: number, date: string) {
    setCurrentWeight(newWeight);
    setWeightHistory(prev => {
      const filtered = prev.filter(entry => entry.date !== date);
      return [...filtered, { date, weight: newWeight }].sort((a, b) => a.date.localeCompare(b.date));
    });
  }

  // Persist currentWeight in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentWeight', String(currentWeight));
    }
  }, [currentWeight]);

  // Update weightGoal in localStorage when changed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('weightGoal', String(weightGoal));
    }
  }, [weightGoal]);

  // When user sets a new goal in the modal, update weightGoal
  function handleSetGoalWeight(newGoal: number) {
    setWeightGoal(newGoal);
  }

  // Water intake state and persistence
  const [waterIntake, setWaterIntake] = useState(0);
  const [waterGoal, setWaterGoal] = useState(3);
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [waterOz, setWaterOz] = useState(8);

  // Water Intake Calculator state
  const [waterCalcWeight, setWaterCalcWeight] = useState(160);
  const [waterCalcWorkout, setWaterCalcWorkout] = useState(30);
  const [waterCalcActivity, setWaterCalcActivity] = useState('light');
  const [waterCalcResult, setWaterCalcResult] = useState<null | { liters: string; ounces: string }>(null);
  const [showWaterCalcModal, setShowWaterCalcModal] = useState(false);

  // Macronutrient Calculator state
  const [showMacroCalcModal, setShowMacroCalcModal] = useState(false);
  const [macroWeight, setMacroWeight] = useState(160);
  const [macroHeight, setMacroHeight] = useState(68);
  const [macroAge, setMacroAge] = useState(30);
  const [macroGender, setMacroGender] = useState('male');
  const [macroActivity, setMacroActivity] = useState('light');
  const [macroGoal, setMacroGoal] = useState('maintain');
  const [macroResult, setMacroResult] = useState<null | { calories: number; protein: number; carbs: number; fat: number }>(null);

  // Micronutrient Calculator state
  const [showMicroCalcModal, setShowMicroCalcModal] = useState(false);
  const [microAge, setMicroAge] = useState(25);
  const [microGender, setMicroGender] = useState('male');
  const [microStatus, setMicroStatus] = useState('none');
  const [microResult, setMicroResult] = useState<null | Record<string, string>>(null);

  // 1. Add state for micronutrients at the top of the component:
  const [micronutrients, setMicronutrients] = useState<{ name: string; value: number; unit: string }[]>([]);

  // Mock data for food group breakdown
  const foodGroupData = [4, 6, 3, 2, 2, 1]; // servings or arbitrary units
  const foodGroupLabels = ['Protein', 'Grains', 'Vegetables', 'Fruits', 'Dairy', 'Fats/Oils'];
  const total = foodGroupData.reduce((a, b) => a + b, 0);
  const foodGroupsPie = {
    labels: foodGroupLabels.map((label, i) => {
      const percentage = ((foodGroupData[i] / total) * 100).toFixed(1);
      return `${label} (${percentage}%)`;
    }),
    datasets: [
      {
        data: foodGroupData,
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',   // Protein - bright blue
          'rgba(30, 64, 175, 0.7)',    // Grains - dark blue
          'rgba(56, 189, 248, 0.7)',   // Vegetables - sky blue
          'rgba(125, 211, 252, 0.7)',  // Fruits - light blue
          'rgba(14, 165, 233, 0.7)',   // Dairy - cyan blue
          'rgba(3, 105, 161, 0.7)',    // Fats/Oils - deep blue
        ],
        borderWidth: 1,
        borderColor: [
          'rgba(59, 130, 246, 0.3)',   // bright blue border
          'rgba(30, 64, 175, 0.3)',    // dark blue border
          'rgba(56, 189, 248, 0.3)',   // sky blue border
          'rgba(125, 211, 252, 0.3)',  // light blue border
          'rgba(14, 165, 233, 0.3)',   // cyan blue border
          'rgba(3, 105, 161, 0.3)',    // deep blue border
        ],
      },
    ],
  };

  // Calculate weekly water intake and goal (client-side only)
  const [weeklyIntake, setWeeklyIntake] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(0);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let intakeSum = 0;
    let goalSum = 0;
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = getDateString(d);
      const intake = parseFloat(localStorage.getItem(`waterIntake-${dateStr}`) || '0');
      const goal = parseFloat(localStorage.getItem(`waterGoal-${dateStr}`) || '3');
      intakeSum += intake;
      goalSum += goal;
    }
    setWeeklyIntake(intakeSum);
    setWeeklyGoal(goalSum);
  }, []);
  const weeklyPct = Math.min(weeklyIntake / weeklyGoal, 1);

  // Calculate weekly calorie intake and goal (client-side only)
  const [weeklyCalories, setWeeklyCalories] = useState(0);
  const [weeklyCaloriesGoal, setWeeklyCaloriesGoal] = useState(0);
  // Calculate weekly calorie goal based on selected daily goal (from macroResult or goalPhysiqueResult)
  const dailyGoalCalories = macroResult?.calories || 2370;
  const weeklyGoalCalories = dailyGoalCalories * 7;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let caloriesSum = 0;
    // let goalSum = 0; // Not needed, we use weeklyGoalCalories
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = getDateString(d);
      const intake = parseFloat(localStorage.getItem(`caloriesIntake-${dateStr}`) || '0');
      caloriesSum += intake;
    }
    setWeeklyCalories(caloriesSum);
    setWeeklyCaloriesGoal(weeklyGoalCalories);
  }, [macroResult]);
  const weeklyCaloriesPct = weeklyCaloriesGoal > 0 ? Math.min(weeklyCalories / weeklyCaloriesGoal, 1) : 0;

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const stored = localStorage.getItem(`waterIntake-${today}`);
    setWaterIntake(stored ? parseFloat(stored) : 0);
    const storedGoal = localStorage.getItem(`waterGoal-${today}`);
    setWaterGoal(storedGoal ? parseFloat(storedGoal) : 3);
  }, []);

  function openWaterModal() {
    setWaterOz(8);
    setShowWaterModal(true);
  }
  function closeWaterModal() {
    setShowWaterModal(false);
  }
  function handleWaterInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWaterOz(Number(e.target.value));
  }
  function handleAddWaterConfirm() {
    if (waterOz <= 0) {
      alert('Please enter a valid positive number.');
      return;
    }
    const amount = waterOz * 0.0295735; // oz to liters
    const today = new Date().toISOString().slice(0, 10);
    const newIntake = Math.min(waterIntake + amount, waterGoal);
    setWaterIntake(newIntake);
    localStorage.setItem(`waterIntake-${today}`, newIntake.toString());
    setShowWaterModal(false);
  }
  const waterPct = Math.min(waterIntake / waterGoal, 1);
  const weightPct = Math.max(0, Math.min((currentWeight - weightGoal) / (currentWeight - weightGoal + 10), 1));

  const [meals, setMeals] = useState<any[]>([]);
  const [dailyConsumed, setDailyConsumed] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0, micros: {} as Record<string, number> });

  useEffect(() => {
    const totals = { calories: 0, protein: 0, carbs: 0, fat: 0, micros: {} as Record<string, number> };
    for (const meal of meals) {
      totals.calories += meal.nutrition?.calories || 0;
      totals.protein += meal.nutrition?.protein || 0;
      totals.carbs += meal.nutrition?.carbs || 0;
      totals.fat += meal.nutrition?.fat || 0;
      if (meal.foods) {
        for (const food of meal.foods) {
          const quantity = food.quantity || 1;
          if (food.details?.foodNutrients) {
            const macroNumbers = ['208', '203', '204', '205'];
            for (const nutrient of food.details.foodNutrients) {
              const name = nutrient.nutrient?.name;
              const number = nutrient.nutrient?.number || '';
              if (name && !macroNumbers.includes(number)) {
                if (!totals.micros[name]) {
                  totals.micros[name] = 0;
                }
                totals.micros[name] += (nutrient.amount || 0) * quantity;
              }
            }
          }
        }
      }
    }
    setDailyConsumed(totals);
  }, [meals]);

  const caloriesPie = {
    labels: ['Consumed', 'Remaining'],
    datasets: [
      {
        data: [dailyConsumed.calories, Math.max(0, (macroResult?.calories || 2370) - dailyConsumed.calories)],
        backgroundColor: ['#60a5fa', '#232428'],
        borderWidth: 0,
      },
    ],
  };

  const parseUnitValue = (str: string) => {
    const match = str.match(/([\d.]+)\s*(\w+|mcg)/);
    return match ? { value: parseFloat(match[1]), unit: match[2] } : { value: parseFloat(str) || 0, unit: '' };
  };

  const macrosPie = {
    labels: ['Carbs', 'Protein', 'Fat'],
    datasets: [
      {
        data: [macros.carbs, macros.protein, macros.fat],
        backgroundColor: ['#38bdf8', '#f472b6', '#fbbf24'],
        borderWidth: 0,
      },
    ],
  };
  const microsPie = {
    labels: ['Sodium', 'Potassium', 'Iron'],
    datasets: [
      {
        data: [micros.sodium, micros.potassium, micros.iron],
        backgroundColor: ['#818cf8', '#34d399', '#f87171'],
        borderWidth: 0,
      },
    ],
  };

  function calculateWaterIntake() {
    // Baseline: 0.5 oz per lb
    let ounces = waterCalcWeight * 0.5;
    // Add 12 oz per 30 min workout
    ounces += (waterCalcWorkout / 30) * 12;
    // Activity multiplier
    let multiplier = 1;
    if (waterCalcActivity === 'light') multiplier = 1.05;
    if (waterCalcActivity === 'active') multiplier = 1.1;
    if (waterCalcActivity === 'very') multiplier = 1.2;
    ounces *= multiplier;
    const liters = (ounces * 0.0295735).toFixed(2);
    setWaterCalcResult({ liters, ounces: ounces.toFixed(0) });
  }

  function setDailyWaterGoal(newGoal: number) {
    const today = new Date().toISOString().slice(0, 10);
    setWaterGoal(newGoal);
    localStorage.setItem(`waterGoal-${today}`, newGoal.toString());
  }

  function calculateMacros() {
    // From a nutritionist's perspective, let's refine the calculation for more accuracy.

    // 1. Convert units for scientific formulas.
    // Mifflin-St Jeor requires weight in kg and height in cm.
    const weightInKg = macroWeight * 0.453592;
    const heightInCm = macroHeight * 2.54;

    // 2. Calculate Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation.
    const bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * macroAge) + (macroGender === 'male' ? 5 : -161);

    // 3. Determine Total Daily Energy Expenditure (TDEE) using activity multiplier.
    const activityMultipliers: Record<string, number> = {
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very: 1.9,
    };
    const tdee = bmr * activityMultipliers[macroActivity];

    // 4. Adjust calories based on the goal using percentage-based adjustments for a more tailored approach.
    let targetCalories;
    switch (macroGoal) {
      case 'cut':
        targetCalories = tdee * 0.85; // 15% deficit for sustainable fat loss.
        break;
      case 'bulk':
        targetCalories = tdee * 1.15; // 15% surplus for lean muscle gain.
        break;
      case 'maintain':
      default:
        targetCalories = tdee;
        break;
    }

    // 5. Calculate macronutrients based on evidence-based recommendations.
    let proteinGrams;
    switch (macroGoal) {
      case 'cut':
        // Higher protein to preserve muscle mass in a deficit.
        proteinGrams = weightInKg * 2.0; // 2.0g per kg
        break;
      case 'bulk':
        // Optimal range for muscle synthesis, as requested.
        proteinGrams = weightInKg * 1.8; // 1.8g per kg
        break;
      case 'maintain':
      default:
        proteinGrams = weightInKg * 1.6; // 1.6g per kg
        break;
    }

    // Fat intake set to 25% of total calories.
    const fatGrams = (targetCalories * 0.25) / 9;

    // Carbohydrates make up the rest of the calories.
    const proteinCalories = proteinGrams * 4;
    const fatCalories = fatGrams * 9;
    const carbGrams = (targetCalories - proteinCalories - fatCalories) / 4;

    setMacroResult({
      calories: Math.round(targetCalories),
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbGrams > 0 ? carbGrams : 0),
      fat: Math.round(fatGrams),
    });
  }

  function calculateMicros() {
    // Determine age group for both male and female
    const getAgeGroup = (age: number) => {
      if (age < 14) return 'child';
      if (age < 19) return 'teen';
      if (age < 51) return 'adult';
      if (age < 71) return 'senior';
      return 'elderly';
    };

    const ageGroup = getAgeGroup(microAge);
    
    // Base values for different age groups
    const ageGroups = {
      child: {
        VitaminA: '600 mcg',
        VitaminC: '45 mg',
        VitaminD: '15 mcg',
        VitaminE: '11 mg',
        VitaminK: '60 mcg',
        Thiamin: '0.9 mg',
        Riboflavin: '1.0 mg',
        Niacin: '12 mg',
        VitaminB6: '1.0 mg',
        Folate: '300 mcg',
        VitaminB12: '1.8 mcg',
        Calcium: '1300 mg',
        Iron: '8 mg',
        Magnesium: '240 mg',
        Zinc: '8 mg',
        Potassium: '2300 mg',
        Sodium: '1900 mg',
      },
      teen: {
        VitaminA: '900 mcg',
        VitaminC: '75 mg',
        VitaminD: '15 mcg',
        VitaminE: '15 mg',
        VitaminK: '75 mcg',
        Thiamin: '1.2 mg',
        Riboflavin: '1.3 mg',
        Niacin: '16 mg',
        VitaminB6: '1.3 mg',
        Folate: '400 mcg',
        VitaminB12: '2.4 mcg',
        Calcium: '1300 mg',
        Iron: '11 mg',
        Magnesium: '410 mg',
        Zinc: '11 mg',
        Potassium: '3000 mg',
        Sodium: '2300 mg',
      },
      adult: {
        VitaminA: '900 mcg',
        VitaminC: '90 mg',
        VitaminD: '15 mcg',
        VitaminE: '15 mg',
        VitaminK: '120 mcg',
        Thiamin: '1.2 mg',
        Riboflavin: '1.3 mg',
        Niacin: '16 mg',
        VitaminB6: '1.3 mg',
        Folate: '400 mcg',
        VitaminB12: '2.4 mcg',
        Calcium: '1000 mg',
        Iron: '8 mg',
        Magnesium: '420 mg',
        Zinc: '11 mg',
        Potassium: '3400 mg',
        Sodium: '2300 mg',
      },
      senior: {
        VitaminA: '900 mcg',
        VitaminC: '90 mg',
        VitaminD: '20 mcg',
        VitaminE: '15 mg',
        VitaminK: '120 mcg',
        Thiamin: '1.2 mg',
        Riboflavin: '1.3 mg',
        Niacin: '16 mg',
        VitaminB6: '1.7 mg',
        Folate: '400 mcg',
        VitaminB12: '2.4 mcg',
        Calcium: '1000 mg',
        Iron: '8 mg',
        Magnesium: '420 mg',
        Zinc: '11 mg',
        Potassium: '3400 mg',
        Sodium: '2300 mg',
      },
      elderly: {
        VitaminA: '900 mcg',
        VitaminC: '90 mg',
        VitaminD: '20 mcg',
        VitaminE: '15 mg',
        VitaminK: '120 mcg',
        Thiamin: '1.2 mg',
        Riboflavin: '1.3 mg',
        Niacin: '16 mg',
        VitaminB6: '1.7 mg',
        Folate: '400 mcg',
        VitaminB12: '2.4 mcg',
        Calcium: '1200 mg',
        Iron: '8 mg',
        Magnesium: '420 mg',
        Zinc: '11 mg',
        Potassium: '3400 mg',
        Sodium: '2300 mg',
      }
    };

    const base = ageGroups[ageGroup];
    const female = {
      ...base,
      VitaminA: ageGroup === 'child' ? '600 mcg' : '700 mcg',
      VitaminC: ageGroup === 'child' ? '45 mg' : '75 mg',
      VitaminK: ageGroup === 'child' ? '60 mcg' : '90 mcg',
      Iron: ageGroup === 'child' ? '8 mg' : '18 mg',
      Magnesium: ageGroup === 'child' ? '240 mg' : '320 mg',
      Zinc: ageGroup === 'child' ? '8 mg' : '8 mg',
      Potassium: ageGroup === 'child' ? '2300 mg' : '2600 mg',
    };
    
    let result = microGender === 'male' ? base : female;
    
    if (microGender === 'female' && (microStatus === 'pregnant' || microStatus === 'breastfeeding')) {
      result = {
        ...female,
        VitaminA: '770 mcg',
        VitaminC: '85 mg',
        VitaminB6: '1.9 mg',
        Folate: '600 mcg',
        VitaminB12: '2.6 mcg',
        Calcium: '1000 mg',
        Iron: microStatus === 'pregnant' ? '27 mg' : '9 mg',
        Magnesium: '350 mg',
        Zinc: '11 mg',
      };
    }
    
    setMicroResult(result);
  }

  // Helper function to get age group label
  const getAgeGroupLabel = (age: number) => {
    if (age < 14) return 'Child (4-13)';
    if (age < 19) return 'Teen (14-18)';
    if (age < 51) return 'Adult (19-50)';
    if (age < 71) return 'Senior (51-70)';
    return 'Elderly (71+)';
  };

  function setDailyCalorieGoal(newGoal: number) {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem(`caloriesGoal-${today}`, newGoal.toString());
    // Optionally, you can update state to reflect immediately
    calories.goal = newGoal;
  }

  function setDailyMicrosGoal(micros: Record<string, string>) {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem(`microsGoal-${today}`, JSON.stringify(micros));
  }
  
  const [microsGoal, setMicrosGoal] = useState<Record<string, string>>({});
  
  // Add state for the new Ideal Weight and Goal Physique calculator
  const [showGoalPhysiqueModal, setShowGoalPhysiqueModal] = useState(false);
  const [goalPhysiqueStep, setGoalPhysiqueStep] = useState(1);
  const [goalPhysiqueResult, setGoalPhysiqueResult] = useState<any | null>(null);

  function getIdealPhysiques(heightInInches: number, gender: string) {
    const baseHeight = 68; // 5'8"
    const heightModifier = heightInInches - baseHeight;

    const leanBfFactor = gender === 'male' ? 5 : 4;
    const olyFactor = gender === 'male' ? 7 : 6;
    const mmaFactor = gender === 'male' ? 6 : 5;
    const classicFactor = gender === 'male' ? 6 : 5;
    const marathonFactor = gender === 'male' ? 4 : 3.5;

    return {
      health: [
        { name: 'Lean (10% BF)', weight: Math.round(185 + heightModifier * leanBfFactor) },
        { name: 'Very Lean (8% BF)', weight: Math.round(181 + heightModifier * leanBfFactor) },
        { name: 'Extremely Lean (5.5% BF)', weight: Math.round(176 + heightModifier * leanBfFactor) },
      ],
      physique: [
        { name: 'Bodybuilding (IFBB Classic)', weight: Math.round(189 + heightModifier * classicFactor), note: 'Based on official height/weight limits.' },
        { name: 'Bodybuilding (Mr. Olympia)', weight: Math.round(277 + heightModifier * 8), note: 'Represents the pinnacle of professional bodybuilding.' },
      ],
      athletic: [
        { name: 'Olympic Weightlifting', weight: Math.round(231 + heightModifier * olyFactor), note: 'Elite weigh-in weight.' },
        { name: 'Mixed Martial Arts', weight: Math.round(155 + heightModifier * mmaFactor), note: 'Varies heavily by weight class.' },
        { name: 'Marathon Running', weight: Math.round(141 + heightModifier * marathonFactor), note: 'Based on elite endurance athletes.' },
        { name: 'Sprinting', weight: Math.round(169 + heightModifier * 5), note: 'Balance of power and leanness.' },
      ]
    };
  }

  function handleCalculateGoalPhysiquePlan(goalWeight: number) {
    const weightInKg = macroWeight * 0.453592;
    const heightInCm = macroHeight * 2.54;
    const bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * macroAge) + (macroGender === 'male' ? 5 : -161);
    const activityMultipliers: Record<string, number> = { light: 1.375, moderate: 1.55, active: 1.725, very: 1.9 };
    const tdee = bmr * activityMultipliers[macroActivity];

    const goalType = macroWeight > goalWeight ? 'cut' : 'bulk';
    let targetCalories;
    if (goalType === 'cut') targetCalories = tdee * 0.85;
    else targetCalories = tdee * 1.15;

    let proteinGrams;
    if (goalType === 'cut') proteinGrams = weightInKg * 2.0;
    else proteinGrams = weightInKg * 1.8;
    
    const fatGrams = (targetCalories * 0.25) / 9;
    const proteinCalories = proteinGrams * 4;
    const fatCalories = fatGrams * 9;
    const carbGrams = (targetCalories - proteinCalories - fatCalories) / 4;

    setGoalPhysiqueResult({
      calories: Math.round(targetCalories),
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbGrams > 0 ? carbGrams : 0),
      fat: Math.round(fatGrams),
      goalWeight: goalWeight
    });
    setGoalPhysiqueStep(3);
  }

  // Get micronutrient daily goal from localStorage or fallback to calculator defaults (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);
    let loaded: Record<string, string> = {};
    try {
      loaded = JSON.parse(localStorage.getItem(`microsGoal-${todayStr}`) || '{}') as Record<string, string>;
    } catch {
      loaded = {};
    }
    // Fallback to calculator defaults if not set
    if (!loaded || Object.keys(loaded).length === 0) {
      const getAgeGroup = (age: number) => {
        if (microAge < 14) return 'child';
        if (microAge < 19) return 'teen';
        if (microAge < 51) return 'adult';
        if (microAge < 71) return 'senior';
        return 'elderly';
      };
      const ageGroup = getAgeGroup(microAge);
      const ageGroups: Record<string, Record<string, string>> = {
        child: { VitaminA: '600 mcg', VitaminC: '45 mg', VitaminD: '15 mcg', VitaminE: '11 mg', VitaminK: '60 mcg', Thiamin: '0.9 mg', Riboflavin: '1.0 mg', Niacin: '12 mg', VitaminB6: '1.0 mg', Folate: '300 mcg', VitaminB12: '1.8 mcg', Calcium: '1300 mg', Iron: '8 mg', Magnesium: '240 mg', Zinc: '8 mg', Potassium: '2300 mg', Sodium: '1900 mg' },
        teen: { VitaminA: '900 mcg', VitaminC: '75 mg', VitaminD: '15 mcg', VitaminE: '15 mg', VitaminK: '75 mcg', Thiamin: '1.2 mg', Riboflavin: '1.3 mg', Niacin: '16 mg', VitaminB6: '1.3 mg', Folate: '400 mcg', VitaminB12: '2.4 mcg', Calcium: '1300 mg', Iron: '11 mg', Magnesium: '410 mg', Zinc: '11 mg', Potassium: '3000 mg', Sodium: '2300 mg' },
        adult: { VitaminA: '900 mcg', VitaminC: '90 mg', VitaminD: '15 mcg', VitaminE: '15 mg', VitaminK: '120 mcg', Thiamin: '1.2 mg', Riboflavin: '1.3 mg', Niacin: '16 mg', VitaminB6: '1.3 mg', Folate: '400 mcg', VitaminB12: '2.4 mcg', Calcium: '1000 mg', Iron: '8 mg', Magnesium: '420 mg', Zinc: '11 mg', Potassium: '3400 mg', Sodium: '2300 mg' },
        senior: { VitaminA: '900 mcg', VitaminC: '90 mg', VitaminD: '20 mcg', VitaminE: '15 mg', VitaminK: '120 mcg', Thiamin: '1.2 mg', Riboflavin: '1.3 mg', Niacin: '16 mg', VitaminB6: '1.7 mg', Folate: '400 mcg', VitaminB12: '2.4 mcg', Calcium: '1000 mg', Iron: '8 mg', Magnesium: '420 mg', Zinc: '11 mg', Potassium: '3400 mg', Sodium: '2300 mg' },
        elderly: { VitaminA: '900 mcg', VitaminC: '90 mg', VitaminD: '20 mcg', VitaminE: '15 mg', VitaminK: '120 mcg', Thiamin: '1.2 mg', Riboflavin: '1.3 mg', Niacin: '16 mg', VitaminB6: '1.7 mg', Folate: '400 mcg', VitaminB12: '2.4 mcg', Calcium: '1200 mg', Iron: '8 mg', Magnesium: '420 mg', Zinc: '11 mg', Potassium: '3400 mg', Sodium: '2300 mg' }
      };
      loaded = ageGroups[ageGroup] as Record<string, string>;
    }
    setMicrosGoal(loaded);
  }, [microAge]);
  // Mock micronutrient intake (all 0 for now)
  const microsIntake: Record<string, number> = Object.fromEntries(Object.keys(microsGoal).map(k => [k, 0]));

  // Meal logging state
  const [showMealModal, setShowMealModal] = useState(false);
  const [mealCategory, setMealCategory] = useState('Breakfast');
  const [foodQuery, setFoodQuery] = useState('');
  const [foodResults, setFoodResults] = useState<FoodResult[]>([]);
  const [foodSearchLoading, setFoodSearchLoading] = useState(false);
  const [addedFoods, setAddedFoods] = useState<any[]>([]);
  const [mealNutrition, setMealNutrition] = useState<any>({ calories: 0, protein: 0, carbs: 0, fat: 0, micros: {} });

  // Add food selection state for quantity/serving
  const [selectedFood, setSelectedFood] = useState<any | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedServing, setSelectedServing] = useState<string>('');
  const [selectedNutrition, setSelectedNutrition] = useState<any | null>(null);

  // Add meal category selection to food selection panel
  const [selectedMealCategory, setSelectedMealCategory] = useState(mealCategory);

  // Add at the top, after FoodResult interface
  const [selectedPortionIndex, setSelectedPortionIndex] = useState<number>(0);

  // Add to NutritionPage component state
  const [servingOptions, setServingOptions] = useState<FoodPortion[]>([]);

  // 1. Add state for the selected date and meal notes
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealNotes, setMealNotes] = useState('');
  // 2. Update the meal loading useEffect to depend on selectedDate
  useEffect(() => {
    const dateStr = selectedDate.toISOString().slice(0, 10);
    const mealsRaw = localStorage.getItem(`meals-${dateStr}`);
    let loaded: any[] = [];
    if (mealsRaw != null) {
      try {
        loaded = JSON.parse(mealsRaw);
        if (!Array.isArray(loaded)) loaded = [];
      } catch {
        loaded = [];
      }
    }
    setMeals(loaded);
  }, [selectedDate, showMealModal]);

  // When opening the modal, reset selectedMealCategory to mealCategory
  useEffect(() => {
    if (showMealModal) setSelectedMealCategory(mealCategory);
  }, [showMealModal, mealCategory]);

  // Search foods (USDA first, fallback to OpenFoodFacts)
  async function handleFoodSearch() {
    setFoodSearchLoading(true);
    try {
      const usda = await searchUSDAFoods(foodQuery);
      if (usda.foods && usda.foods.length > 0) {
        setFoodResults(usda.foods.map((f: any) => {
          let portion: string = '';
          let cals = undefined;
          // If the food is an egg, try to find the best portion for 1 large egg
          const isEgg = (f.description || '').toLowerCase().includes('egg');
          let portionObj = undefined;
          if (isEgg && f.foodPortions && f.foodPortions.length > 0) {
            // Prefer 'large egg' and value 1
            portionObj = f.foodPortions.find((p: any) => {
              const mod = (p.modifier || '').toLowerCase();
              const unit = (p.measureUnit?.name || '').toLowerCase();
              return (mod.includes('large') && (mod.includes('egg') || unit.includes('egg'))) && Number(p.value) === 1;
            });
            // Otherwise, any 'egg' and value 1
            if (!portionObj) {
              portionObj = f.foodPortions.find((p: any) => {
                const mod = (p.modifier || '').toLowerCase();
                const unit = (p.measureUnit?.name || '').toLowerCase();
                return (mod.includes('egg') || unit.includes('egg')) && Number(p.value) === 1;
              });
            }
          }
          if (!portionObj && f.foodPortions && f.foodPortions.length > 0) {
            portionObj = f.foodPortions[0];
          }
          if (portionObj) {
            if (portionObj.modifier && portionObj.measureUnit && portionObj.value) {
              portion = `${portionObj.value} ${portionObj.modifier}`;
            } else if (portionObj.gramWeight) {
              portion = `${portionObj.gramWeight}g`;
            } else {
              portion = '';
            }
            cals = portionObj.calories || undefined;
          }
          // If still not found, hardcode fallback for generic eggs
          if (isEgg && !portionObj) {
            portion = '1 egg';
            cals = 72;
          }
          if (cals === undefined && f.foodNutrients) {
            const n = f.foodNutrients.find((n: any) => n.nutrientName?.toLowerCase().includes('energy'));
            cals = n ? n.value : undefined;
          }
          // Ensure portion is always a string
          if (typeof portion !== 'string') portion = '';
          return {
            id: String(f.fdcId),
            name: String(f.description || ''),
            brand: String(f.brandOwner || ''),
            source: 'usda',
            serving: portion,
            calories: typeof cals === 'number' && !isNaN(cals) ? cals : (typeof cals === 'string' && !isNaN(Number(cals)) ? Number(cals) : 0),
          };
        }));
      } else {
        const off = await searchOpenFoodFacts(foodQuery);
        setFoodResults((off.products || []).map((f: any) => {
          const cals = f.nutriments?.['energy-kcal'] || undefined;
          return {
            id: String(f.code),
            name: String(f.product_name || ''),
            brand: String(f.brands || ''),
            source: 'off',
            serving: '100g',
            calories: typeof cals === 'number' && !isNaN(cals) ? cals : (typeof cals === 'string' && !isNaN(Number(cals)) ? Number(cals) : 0),
          };
        }));
      }
    } catch {
      setFoodResults([]);
    }
    setFoodSearchLoading(false);
  }

  // When a food is selected, fetch details and set serving options
  async function handleSelectFood(food: any) {
    let details;
    let servings: FoodPortion[] = [];
    let nutrition: any = {};
    if (food.source === 'usda') {
      details = await getUSDAFoodDetails(food.id);
      // Build all serving options
      let foodPortions: FoodPortion[] = (details.foodPortions || [])
        .map((p: any) => {
          let label = '';
          let description = '';
          if (p.value && p.measureUnit && p.measureUnit.name) {
            label = `${p.value} ${p.measureUnit.name}`;
            description = `${p.value} ${p.measureUnit.name}`;
            if (p.gramWeight) description += ` (${p.gramWeight}g)`;
          } else if (p.value && p.modifier) {
            label = `${p.value} ${p.modifier}`;
            description = `${p.value} ${p.modifier}`;
            if (p.gramWeight) description += ` (${p.gramWeight}g)`;
          } else if (p.gramWeight) {
            label = `${p.gramWeight}g`;
            description = `${p.gramWeight}g`;
          }
          return {
            label,
            description,
            calories: p.calories || 0,
            protein: p.protein || 0,
            carbs: p.carbohydrate || 0,
            fat: p.fat || 0,
            gramWeight: p.gramWeight,
          };
        })
        .filter((p: FoodPortion) => String(p.label).length > 0)
        .filter((p: FoodPortion, i: number, arr: FoodPortion[]) => arr.findIndex(x => x.label === p.label) === i);

      // If no valid portions, fallback to '1 egg' with default nutrition
      if (foodPortions.length === 0) {
        const isEgg = (food.description || food.name || '').toLowerCase().includes('egg');
        if (isEgg) {
          foodPortions.push({ label: '1 egg', description: '1 egg', calories: 72, protein: 6, carbs: 0, fat: 5, gramWeight: 50 });
        } else {
          // If no portions from API, create a single serving based on the nutrition label info (e.g., "3 slices (35g)")
          // and scale the per-100g nutrient data to match that serving size.
          const servingSizeGrams = details.servingSize && (details.servingSizeUnit?.toLowerCase() === 'g' || details.servingSizeUnit?.toLowerCase() === 'ml') ? details.servingSize : 100;
          const scalingFactor = servingSizeGrams / 100.0;

          let fallbackCalories = 0, fallbackProtein = 0, fallbackCarbs = 0, fallbackFat = 0;
          let macrosFrom100g = false;

          if (details.foodNutrients && details.foodNutrients.length > 0) {
            macrosFrom100g = true;
            for (const n of details.foodNutrients) {
              const name = (n.nutrient?.name || '').toLowerCase();
              const number = n.nutrient?.number || '';
              const value = n.amount || 0;
              const scaledValue = value * scalingFactor;

              if (name.includes('energy') || name.includes('calories') || number === '208') fallbackCalories = scaledValue;
              if (name.includes('protein') || number === '203') fallbackProtein = scaledValue;
              if (name.includes('carbohydrate') || name.includes('carb') || number === '205') fallbackCarbs = scaledValue;
              if (name.includes('total lipid') || name.includes('total fat') || name.includes('fat') || number === '204') fallbackFat = scaledValue;
            }
          }

          if (!macrosFrom100g || fallbackCalories === 0) {
            if (food.calories) fallbackCalories = food.calories;
            if (food.protein) fallbackProtein = food.protein;
            if (food.carbs) fallbackCarbs = food.carbs;
            if (food.fat) fallbackFat = food.fat;
          }
          
          let fallbackDescription = `${Math.round(servingSizeGrams)}g`;
          if (details.householdServingFullText) {
            fallbackDescription = details.householdServingFullText;
            if (servingSizeGrams !== 100 && details.servingSize && details.servingSizeUnit) {
                fallbackDescription += ` (${Math.round(details.servingSize)}${details.servingSizeUnit.toLowerCase()})`;
            }
          }

          foodPortions.push({
            label: '1 serving',
            description: fallbackDescription,
            calories: fallbackCalories || 0,
            protein: fallbackProtein || 0,
            carbs: fallbackCarbs || 0,
            fat: fallbackFat || 0,
            gramWeight: servingSizeGrams,
          });
        }
      }

      // 1. All unique API-provided serving labels (base serving first)
      const apiServingLabels = foodPortions.map(p => p.label.trim().toLowerCase());
      // 2. All standard units (including 'g') not already present as a full label
      const standardUnits = [
        'egg', 'cup', 'g', 'oz', 'lb', 'fl oz', 'ml', 'L', 'mg', 'tsp', 'tbsp', 'kg', 'ltr'
      ];
      const standardServingLabels = standardUnits
        .map(unit => `1 ${unit}`)
        .filter(label => !apiServingLabels.includes(label.trim().toLowerCase()));
      // 3. Merge, base serving first, then other API servings, then standard units not present
      const mergedServingOptions: FoodPortion[] = [
        ...foodPortions,
        ...standardServingLabels.map(label => ({ label, description: label, calories: NaN, protein: NaN, carbs: NaN, fat: NaN, gramWeight: NaN }))
      ];

      setSelectedPortionIndex(0);
      setSelectedServing(foodPortions[0].label);
      // Find the first portion with valid nutrition
      const basePortion = foodPortions.find(p => !isNaN(Number(p.calories))) || foodPortions[0];
      nutrition = {
        calories: basePortion.calories || 0,
        protein: basePortion.protein || 0,
        carbs: basePortion.carbs || 0,
        fat: basePortion.fat || 0,
        micros: {},
      };
      setSelectedFood({ ...food, details, servings: foodPortions });
      setServingOptions(mergedServingOptions);

      // 2. In handleSelectFood, after extracting macros, extract micronutrients:
      const macroNumbers = ['208', '203', '204', '205'];
      let micros: { name: string; value: number; unit: string }[] = [];
      if (details.foodNutrients) {
        micros = details.foodNutrients
          .map((n: any) => {
            const number = n.nutrient?.number || '';
            if (!macroNumbers.includes(number)) {
              return {
                name: n.nutrient?.name || '',
                value: n.amount,
                unit: n.nutrient?.unitName || '',
              };
            }
            return null;
          })
          .filter(Boolean) as { name: string; value: number; unit: string }[];
      }
      setMicronutrients(micros);
    } else {
      details = await getOpenFoodFactsDetails(food.id);
      const n = details.product.nutriments || {};
      // Always use FoodPortion structure for servings
      const foodPortions: FoodPortion[] = [{
        label: '100g',
        description: '100g',
        calories: n['energy-kcal'] || 0,
        protein: n['proteins'] || 0,
        carbs: n['carbohydrates'] || 0,
        fat: n['fat'] || 0,
        gramWeight: 100,
      }];
      setSelectedPortionIndex(0);
      setSelectedServing(foodPortions[0].label);
      nutrition = {
        calories: foodPortions[0].calories,
        protein: foodPortions[0].protein || 0,
        carbs: foodPortions[0].carbs || 0,
        fat: foodPortions[0].fat || 0,
        micros: {
          Sodium: n['sodium'] ? n['sodium'] + ' mg' : '0 mg',
          Potassium: n['potassium'] ? n['potassium'] + ' mg' : '0 mg',
          Iron: n['iron'] ? n['iron'] + ' mg' : '0 mg',
        } as Record<string, string>
      };
      // Add all standard units not present as a full label
      const apiServingLabels = foodPortions.map(p => p.label.trim().toLowerCase());
      const standardUnits = [
        'egg', 'cup', 'g', 'oz', 'lb', 'fl oz', 'ml', 'L', 'mg', 'tsp', 'tbsp', 'kg', 'ltr'
      ];
      const standardServingLabels = standardUnits
        .map(unit => `1 ${unit}`)
        .filter(label => !apiServingLabels.includes(label.trim().toLowerCase()));
      const mergedServingOptions: FoodPortion[] = [
        ...foodPortions,
        ...standardServingLabels.map(label => ({ label, description: label, calories: NaN, protein: NaN, carbs: NaN, fat: NaN, gramWeight: NaN }))
      ];
      setSelectedFood({ ...food, details, servings: foodPortions });
      setServingOptions(mergedServingOptions);
    }
    setSelectedQuantity(1);
    setSelectedNutrition(nutrition);
  }

  // Add selected food to meal
  function handleAddSelectedFood() {
    if (!selectedFood || !selectedNutrition) return;
    setAddedFoods(prev => [...prev, {
      ...selectedFood,
      nutrition: selectedNutrition,
      quantity: selectedQuantity,
      serving: selectedServing,
    }]);
    setSelectedFood(null);
    setSelectedNutrition(null);
    setSelectedQuantity(1);
    setSelectedServing('');
  }

  // Update meal nutrition summary
  useEffect(() => {
    const sum = { calories: 0, protein: 0, carbs: 0, fat: 0, micros: {} as Record<string, string> };
    for (const food of addedFoods) {
      sum.calories += Number(food.nutrition?.calories || 0);
      sum.protein += Number(food.nutrition?.protein || 0);
      sum.carbs += Number(food.nutrition?.carbs || 0);
      sum.fat += Number(food.nutrition?.fat || 0);
      for (const [k, v] of Object.entries(food.nutrition?.micros || {})) {
        if (!sum.micros[k]) sum.micros[k] = v;
      }
    }
    setMealNutrition(sum);
  }, [addedFoods]);

  // Save meal to localStorage
  function handleSaveMeal() {
    const dateStr = selectedDate.toISOString().slice(0, 10);
    const mealsRaw = localStorage.getItem(`meals-${dateStr}`);
    let meals: any[] = [];
    if (mealsRaw != null) {
      try {
        meals = JSON.parse(mealsRaw);
        if (!Array.isArray(meals)) meals = [];
      } catch {
        meals = [];
      }
    }
    meals.push({ category: mealCategory, foods: addedFoods, nutrition: mealNutrition, notes: mealNotes });
    localStorage.setItem(`meals-${dateStr}`, JSON.stringify(meals));
    // Update caloriesIntake-YYYY-MM-DD for weekly bar
    const totalCalories = meals.reduce((sum, meal) => sum + (meal.nutrition?.calories || 0), 0);
    localStorage.setItem(`caloriesIntake-${dateStr}`, String(totalCalories));
    setShowMealModal(false);
    setAddedFoods([]);
    setFoodResults([]);
    setFoodQuery('');
    setMealNotes(''); // Clear notes after saving
  }

  useEffect(() => {
    if (!servingOptions || !servingOptions[selectedPortionIndex]) return;
    const selected = servingOptions[selectedPortionIndex];
    // Find the first API serving with real nutrition (base)
    const base = servingOptions.find(opt => !isNaN(opt.calories)) || servingOptions[0];
    setSelectedNutrition({
      calories: isNaN(Number(selected.calories)) ? Number(base.calories || 0) * selectedQuantity : Number(selected.calories || 0) * selectedQuantity,
      protein: isNaN(Number(selected.protein)) ? Number(base.protein || 0) * selectedQuantity : Number(selected.protein || 0) * selectedQuantity,
      carbs: isNaN(Number(selected.carbs)) ? Number(base.carbs || 0) * selectedQuantity : Number(selected.carbs || 0) * selectedQuantity,
      fat: isNaN(Number(selected.fat)) ? Number(base.fat || 0) * selectedQuantity : Number(selected.fat || 0) * selectedQuantity,
      micros: {},
    });
  }, [selectedQuantity, selectedServing, selectedPortionIndex, servingOptions]);

  // Add this useEffect near your other nutrition-related effects:
  useEffect(() => {
    if (!selectedFood || !selectedFood.details || !selectedFood.details.foodNutrients) {
      setMicronutrients([]);
      return;
    }
    const macroNumbers = ['208', '203', '204', '205'];
    let micros: { name: string; value: number; unit: string }[] = [];
    for (const n of selectedFood.details.foodNutrients) {
      const number = n.nutrient?.number || '';
      if (!macroNumbers.includes(number)) {
        micros.push({
          name: n.nutrient?.name || '',
          value: (n.amount || 0) * selectedQuantity,
          unit: n.nutrient?.unitName || '',
        });
      }
    }
    setMicronutrients(micros);
  }, [selectedFood, selectedPortionIndex, selectedQuantity]);

  // 1. Add state for the weekly summary at the top of the component
  const [weeklySummary, setWeeklySummary] = useState<any[]>([]);
  // 2. Add useEffect to calculate weekly summary
  useEffect(() => {
    const summary = [];
    const today = new Date();
    // Adjust to find the most recent Monday
    const dayOfWeek = (today.getDay() + 6) % 7; // Monday = 0, Sunday = 6
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);

    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
      const calorieGoal = parseFloat(localStorage.getItem(`caloriesGoal-${dateStr}`) || '2370');
      const mealsRaw = localStorage.getItem(`meals-${dateStr}`);
      let consumedCalories = 0;
      if (mealsRaw) {
        try {
          const mealsForDay: any[] = JSON.parse(mealsRaw);
          if (Array.isArray(mealsForDay)) {
            consumedCalories = mealsForDay.reduce((total, meal) => total + (meal.nutrition?.calories || 0), 0);
          }
        } catch {}
      }
      summary.push({
        day: dayName,
        date: dateStr,
        consumed: Math.round(consumedCalories),
        goal: Math.round(calorieGoal),
      });
    }
    setWeeklySummary(summary);
  }, [meals]);

  // Update the legend color boxes to have a cyberpunk blue glow effect
  const legendColorStyle = (color: string) => ({
    backgroundColor: color,
    boxShadow: `0 0 8px ${color.replace('0.7', '0.5')}`,
    border: `1px solid ${color.replace('0.7', '0.4')}`,
  });

  const [waterHistoryData, setWaterHistoryData] = useState<number[]>([]);
  const [calorieHistoryData, setCalorieHistoryData] = useState<number[]>([]);

  useEffect(() => {
    const waterData = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dateStr = d.toISOString().slice(0, 10);
      return parseFloat(localStorage.getItem(`waterIntake-${dateStr}`) || '0');
    });
    setWaterHistoryData(waterData);

    const calorieData = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dateStr = d.toISOString().slice(0, 10);
      return parseFloat(localStorage.getItem(`caloriesIntake-${dateStr}`) || '0');
    });
    setCalorieHistoryData(calorieData);
  }, []);

  return (
    <main className="min-h-screen p-8 bg-[#111215]">
      <div className="max-w-7xl mx-auto">
        <div className="w-full flex justify-center mb-8">
          <div className="w-full max-w-3xl rounded-xl bg-gradient-to-r from-gray-900/90 to-gray-700/80 py-6 px-4 flex items-center justify-center shadow-lg border border-gray-700/60">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center tracking-tight drop-shadow-lg">
              Welcome To Your Nutrition Hub
            </h2>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Todays Nutrition Stats</h1>
        </div>

        {/* Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Daily Calorie Intake Card */}
          <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col items-center p-6">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Daily Calorie Intake</h3>
            <div className="relative w-48 h-48 mx-auto mb-4">
              <Doughnut data={caloriesPie} options={{ cutout: '70%', plugins: { legend: { display: false } } }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">{Math.round(dailyConsumed.calories)}</span>
                <span className="text-sm text-gray-400">Consumed</span>
              </div>
            </div>
            <div className="text-center text-sm text-gray-300 space-y-1">
              <div>Goal: <span className="font-semibold text-white">{macroResult?.calories || 2370}</span></div>
              <div>Food: <span className="font-semibold text-white">{Math.round(dailyConsumed.calories)}</span></div>
              <div>Remaining: <span className="font-semibold text-white">{Math.max(0, (macroResult?.calories || 2370) - Math.round(dailyConsumed.calories))}</span></div>
            </div>
          </div>
          {/* Macronutrients Card */}
          <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg p-6 flex flex-col justify-center h-full">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Macronutrients</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-white">Carbs</span>
                  <span className="text-gray-400">{Math.round(dailyConsumed.carbs)}g / {macroResult?.carbs || 180}g</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-4 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-[rgba(56,189,248,0.7)] rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min((dailyConsumed.carbs / (macroResult?.carbs || 180)) * 100, 100)}%`,
                      boxShadow: '0 0 10px rgba(56,189,248,0.5), 0 0 20px rgba(56,189,248,0.3)',
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-white">Protein</span>
                  <span className="text-gray-400">{Math.round(dailyConsumed.protein)}g / {macroResult?.protein || 120}g</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-4 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-[rgba(59,130,246,0.7)] rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min((dailyConsumed.protein / (macroResult?.protein || 120)) * 100, 100)}%`,
                      boxShadow: '0 0 10px rgba(59,130,246,0.5), 0 0 20px rgba(59,130,246,0.3)',
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-white">Fat</span>
                  <span className="text-gray-400">{Math.round(dailyConsumed.fat)}g / {macroResult?.fat || 60}g</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-4 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-[rgba(30,64,175,0.7)] rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min((dailyConsumed.fat / (macroResult?.fat || 60)) * 100, 100)}%`,
                      boxShadow: '0 0 10px rgba(30,64,175,0.5), 0 0 20px rgba(30,64,175,0.3)',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          {/* Weekly Food Group Breakdown Card */}
          <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Weekly Food Group Breakdown</h3>
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-2">
                {foodGroupLabels.map((label, i) => (
                  <div key={label} className="flex items-center">
                    <div 
                      className="w-4 h-4 mr-2 rounded-sm" 
                      style={legendColorStyle(foodGroupsPie.datasets[0].backgroundColor[i])}
                    ></div>
                    <span className="text-sm">
                      {label} ({((foodGroupData[i] / total) * 100).toFixed(1)}%)
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-64 h-64">
                <Pie data={foodGroupsPie} options={{
                  plugins: {
                    legend: {
                      display: false
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                          const value = context.raw as number;
                          const percentage = ((value / total) * 100).toFixed(1);
                          return `${context.label}: ${percentage}%`;
                        }
                      }
                    }
                  }
                }} />
              </div>
            </div>
          </div>
        </div>
        {/* Micronutrients Chart */}
        <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg p-6 col-span-1 md:col-span-3 mb-10">
          <h3 className="text-xl font-bold text-white mb-4">Micronutrients</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3">
            {Object.entries(microsGoal).map(([name, goalStr]) => {
              const goalStrSafe = String(goalStr);
              const consumed = dailyConsumed.micros[name] || 0;
              const goalData = parseUnitValue(goalStrSafe);
              const goalValue = goalData.value;
              const unit = goalData.unit;
              const percentage = goalValue > 0 ? Math.min((consumed / goalValue) * 100, 100) : 0;
              return (
                <div key={name}>
                  <div className="flex justify-between items-baseline text-sm mb-1">
                    <span className="font-semibold text-white truncate">{name}</span>
                    <span className="text-gray-400 text-xs whitespace-nowrap">{consumed.toFixed(1)}{unit} / {goalStrSafe}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Water & Weight Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Water Intake */}
          <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col p-6">
            <div className="flex items-center justify-between w-full mb-2">
              <h3 className="text-lg font-bold">Water Intake</h3>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={openWaterModal}
              >
                Add Water Intake
              </button>
            </div>
            <div className="w-full space-y-4">
              <div>
                <div className="text-sm text-gray-300 mb-1 font-semibold">Daily Intake</div>
                <div className="w-full bg-gray-800 rounded-full h-8 relative overflow-hidden flex items-center">
                  <div className="bg-blue-500 h-8 rounded-full transition-all duration-500 absolute left-0 top-0" style={{ width: `${waterPct * 100}%` }} />
                  <div className="w-full text-center z-10 font-bold text-white text-base" style={{position: 'relative'}}>
                    {Number(waterIntake).toFixed(2)}L / {Number(waterGoal).toFixed(2)}L
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-300 mb-1 font-semibold">Weekly Intake</div>
                <div className="w-full bg-gray-800 rounded-full h-8 relative overflow-hidden flex items-center">
                  <div className="bg-cyan-400 h-8 rounded-full transition-all duration-500 absolute left-0 top-0" style={{ width: `${weeklyPct * 100}%` }} />
                  <div className="w-full text-center z-10 font-bold text-white text-base" style={{position: 'relative'}}>
                    {Number(weeklyIntake).toFixed(2)}L / {Number(weeklyGoal).toFixed(2)}L
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Weight Progress */}
          <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col items-center p-6">
            <h3 className="text-lg font-bold mb-2">Weight Progress</h3>
            <div className="w-full bg-gray-800 rounded-full h-6 mb-2 overflow-hidden">
              {(() => {
                let progress = 0;
                if (weightGoal > currentWeight) {
                  // Bulking: progress is how close you are to the goal
                  progress = currentWeight / weightGoal;
                } else if (weightGoal < currentWeight) {
                  // Cutting: progress is how close you are to the goal
                  progress = weightGoal / currentWeight;
                } else {
                  progress = 1;
                }
                progress = Math.max(0, Math.min(progress, 1));
                return (
                  <div
                    className="bg-green-500 h-6 rounded-full transition-all duration-500"
                    style={{ width: `${progress * 100}%` }}
                  />
                );
              })()}
            </div>
            <div className="flex justify-center items-center gap-4 text-center text-gray-300 text-sm mb-6">
              <span className="text-white font-bold">{currentWeight} lbs</span> → <span className="text-green-400 font-bold">{weightGoal} lbs</span>
              <button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded-lg text-xs" onClick={() => { setNewWeight(currentWeight); setShowWeightModal(true); }}>Update Weight</button>
            </div>
            {/* Weight Update Modal */}
            {showWeightModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                <div className="bg-gray-900 rounded-xl p-8 shadow-2xl w-full max-w-xs flex flex-col items-center border border-gray-700">
                  <h2 className="text-xl font-bold text-white mb-4">Update Current Weight</h2>
                  <input
                    type="number"
                    min={50}
                    max={500}
                    value={newWeight}
                    onChange={e => setNewWeight(Number(e.target.value))}
                    className="w-full mb-2 px-2 py-1 rounded bg-gray-800 text-white border border-gray-700 text-center"
                  />
                  <label className="w-full text-gray-300 text-sm mb-4">Date
                    <input
                      type="date"
                      value={weightDate}
                      onChange={e => setWeightDate(e.target.value)}
                      className="w-full mt-1 px-2 py-1 rounded bg-gray-800 text-white border border-gray-700 text-center"
                    />
                  </label>
                  <div className="flex gap-4">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
                      onClick={() => { logWeight(newWeight, weightDate); setShowWeightModal(false); }}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-700 hover:bg-gray-800 text-gray-200 font-semibold py-2 px-4 rounded-lg shadow"
                      onClick={() => setShowWeightModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Weekly Calorie Intake */}
            <div className="w-full mb-2">
              <div className="text-sm text-gray-300 mb-1 font-semibold">Weekly Calorie Intake</div>
              <div className="w-full bg-gray-800 rounded-full h-6 mb-2 overflow-hidden">
                <div className="bg-orange-400 h-6 rounded-full transition-all duration-500" style={{ width: `${weeklyCaloriesPct * 100}%` }} />
              </div>
              <div className="text-center text-gray-300 text-sm">
                <span className="text-white font-bold">{Number(weeklyCalories).toLocaleString()}</span> / {Number(weeklyGoalCalories).toLocaleString()} kcal
              </div>
            </div>
          </div>
        </div>
        {/* Water Intake Modal */}
        {showWaterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-gray-900 rounded-xl p-8 shadow-2xl w-full max-w-xs flex flex-col items-center border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Add Water Intake</h2>
              <label className="text-gray-300 mb-2">Fluid Ounces</label>
              <input
                type="range"
                min={1}
                max={64}
                value={waterOz}
                onChange={handleWaterInputChange}
                className="w-full mb-2 accent-blue-500"
              />
              <input
                type="number"
                min={1}
                max={64}
                value={waterOz}
                onChange={handleWaterInputChange}
                className="w-full mb-4 px-2 py-1 rounded bg-gray-800 text-white border border-gray-700 text-center"
              />
              <div className="text-gray-400 mb-4 text-sm">({(waterOz * 0.0295735).toFixed(2)} L)</div>
              <div className="flex gap-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
                  onClick={handleAddWaterConfirm}
                >
                  Add
                </button>
                <button
                  className="bg-gray-700 hover:bg-gray-800 text-gray-200 font-semibold py-2 px-4 rounded-lg shadow"
                  onClick={closeWaterModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Calculators Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-extrabold text-white mb-6">Calculators</h2>
          <div className="flex flex-col md:flex-row gap-8 mb-8 md:justify-center">
            {/* Find Your Goal Physique Card */}
            <div
              className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg p-6 flex flex-col items-center justify-center min-h-[140px] max-w-md cursor-pointer hover:shadow-2xl transition text-center mx-auto"
              onClick={() => {
                setGoalPhysiqueStep(1);
                setGoalPhysiqueResult(null);
                setShowGoalPhysiqueModal(true);
              }}
            >
              <h3 className="text-2xl font-bold mb-2">Find Your Goal Physique & Nutrition Plan</h3>
              <p className="text-gray-300 text-center">Discover your ideal physique and get a custom nutrition plan to achieve it.</p>
            </div>
            {/* Water Intake Calculator Card */}
            <div
              className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg p-6 flex flex-col items-center justify-center min-h-[140px] max-w-md cursor-pointer hover:shadow-2xl transition text-center mx-auto"
              onClick={() => setShowWaterCalcModal(true)}
            >
              <h3 className="text-2xl font-bold mb-2">Water Intake Calculator</h3>
              <p className="text-gray-300 text-center">Find out how much water you should drink today based on your weight, workout, and activity level.</p>
            </div>
            {/* Macronutrient Calculator Card */}
            <div
              className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg p-6 flex flex-col items-center justify-center min-h-[140px] max-w-md cursor-pointer hover:shadow-2xl transition text-center mx-auto"
              onClick={() => setShowMacroCalcModal(true)}
            >
              <h3 className="text-2xl font-bold mb-2">Macronutrient Calculator</h3>
              <p className="text-gray-300 text-center">Calculate your daily calories and macros for your fitness goals.</p>
            </div>
            {/* Micronutrient Calculator Card */}
            <div
              className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg p-6 flex flex-col items-center justify-center min-h-[140px] max-w-md cursor-pointer hover:shadow-2xl transition text-center mx-auto"
              onClick={() => setShowMicroCalcModal(true)}
            >
              <h3 className="text-2xl font-bold mb-2">Micronutrient Calculator</h3>
              <p className="text-gray-300 text-center">See your recommended daily vitamins and minerals based on your age and gender.</p>
            </div>
          </div>

          {/* Goal Physique & Nutrition Plan Modal */}
          {showGoalPhysiqueModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
              <div className="bg-gray-900 rounded-xl p-8 shadow-2xl w-full max-w-3xl flex flex-col border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-white">
                    {goalPhysiqueStep === 1 && "Step 1: Your Current Stats"}
                    {goalPhysiqueStep === 2 && "Step 2: Choose Your Goal Physique"}
                    {goalPhysiqueStep === 3 && `Your Nutrition Plan for ${goalPhysiqueResult.goalWeight} lbs`}
                  </h3>
                  <button onClick={() => setShowGoalPhysiqueModal(false)} className="text-gray-400 hover:text-white">&times;</button>
                </div>
                
                {/* Step 1: Inputs */}
                {goalPhysiqueStep === 1 && (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Form Inputs (same as macro calculator) */}
                      <label className="flex flex-col text-gray-300">Weight (lbs)<input type="number" min={50} max={500} className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white" value={macroWeight} onChange={e => setMacroWeight(Number(e.target.value))} required/></label>
                      <label className="flex flex-col text-gray-300">Height (inches)<input type="number" min={48} max={84} className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white" value={macroHeight} onChange={e => setMacroHeight(Number(e.target.value))} required/></label>
                      <label className="flex flex-col text-gray-300">Age<input type="number" min={10} max={100} className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white" value={macroAge} onChange={e => setMacroAge(Number(e.target.value))} required/></label>
                      <label className="flex flex-col text-gray-300">Gender<select className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white" value={macroGender} onChange={e => setMacroGender(e.target.value)} required><option value="male">Male</option><option value="female">Female</option></select></label>
                      <label className="flex flex-col text-gray-300 col-span-2">Activity Level<select className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white" value={macroActivity} onChange={e => setMacroActivity(e.target.value)} required><option value="light">Lightly Active</option><option value="moderate">Moderately Active</option><option value="active">Active</option><option value="very">Very Active</option></select></label>
                    </div>
                    <button onClick={() => setGoalPhysiqueStep(2)} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg self-center">Next: Choose Your Goal</button>
                  </div>
                )}

                {/* Step 2: Goal Options */}
                {goalPhysiqueStep === 2 && (
                  <div className="max-h-[60vh] overflow-y-auto pr-4">
                    {(() => {
                      const physiques = getIdealPhysiques(macroHeight, macroGender);
                      return (
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xl font-bold text-white mb-2 border-b border-gray-700 pb-1">Health & Body Composition</h4>
                            {physiques.health.map(p => (<div key={p.name} className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg mt-2"><div><span className="font-semibold">{p.name}</span>: {p.weight} lbs</div><button onClick={() => handleCalculateGoalPhysiquePlan(p.weight)} className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg">Calculate Plan</button></div>))}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white mb-2 border-b border-gray-700 pb-1">Athletic & Physique Sports</h4>
                            {physiques.physique.concat(physiques.athletic).map(p => (<div key={p.name} className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg mt-2"><div><span className="font-semibold">{p.name}</span>: {p.weight} lbs<p className="text-xs text-gray-400">{p.note}</p></div><button onClick={() => handleCalculateGoalPhysiquePlan(p.weight)} className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg">Calculate Plan</button></div>))}
                          </div>
                        </div>
                      );
                    })()}
                    <button onClick={() => setGoalPhysiqueStep(1)} className="mt-6 bg-gray-700 hover:bg-gray-800 text-gray-200 font-semibold py-2 px-6 rounded-lg shadow self-start">Back to Stats</button>
                  </div>
                )}

                {/* Step 3: Results */}
                {goalPhysiqueStep === 3 && goalPhysiqueResult && (
                  <div>
                    <div className="text-center w-full">
                      <div className="grid grid-cols-2 gap-4 text-lg mb-4">
                        <div className="bg-gray-800 rounded p-4"><div className="text-gray-400">Calories</div><div className="text-2xl font-bold">{goalPhysiqueResult.calories} kcal</div></div>
                        <div className="bg-gray-800 rounded p-4"><div className="text-gray-400">Protein</div><div className="text-2xl font-bold">{goalPhysiqueResult.protein} g</div></div>
                        <div className="bg-gray-800 rounded p-4"><div className="text-gray-400">Carbs</div><div className="text-2xl font-bold">{goalPhysiqueResult.carbs} g</div></div>
                        <div className="bg-gray-800 rounded p-4"><div className="text-gray-400">Fat</div><div className="text-2xl font-bold">{goalPhysiqueResult.fat} g</div></div>
                      </div>
                      {/* Micronutrients Section */}
                      <div className="mt-8">
                        <div className="text-lg font-bold text-white mb-2">Recommended Daily Micronutrients</div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          {(Object.entries(microsGoal) as [string, string][]).map(([k, v]) => (
                            <div key={k} className="flex justify-between text-gray-300 bg-gray-800 rounded px-3 py-1">
                              <span className="font-semibold text-white">{k}</span>
                              <span>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => { setDailyCalorieGoal(goalPhysiqueResult.calories); handleSetGoalWeight(goalPhysiqueResult.goalWeight); setShowGoalPhysiqueModal(false); }} className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg text-lg">Make This My Daily Goal</button>
                    </div>
                    <button onClick={() => setGoalPhysiqueStep(2)} className="mt-6 bg-gray-700 hover:bg-gray-800 text-gray-200 font-semibold py-2 px-6 rounded-lg shadow self-start">Back to Goals</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Water Intake Calculator Modal */}
          {showWaterCalcModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="bg-gray-900 rounded-xl p-8 shadow-2xl w-full max-w-xl flex flex-col items-center border border-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-white">Water Intake Calculator</h3>
                <form className="w-full flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
                  <label className="flex flex-col text-gray-300">
                    Weight (lbs)
                    <input
                      type="number"
                      min={50}
                      max={500}
                      className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                      value={waterCalcWeight}
                      onChange={e => setWaterCalcWeight(Number(e.target.value))}
                      required
                    />
                  </label>
                  <label className="flex flex-col text-gray-300">
                    Workout Duration (minutes)
                    <input
                      type="number"
                      min={0}
                      max={300}
                      className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                      value={waterCalcWorkout}
                      onChange={e => setWaterCalcWorkout(Number(e.target.value))}
                      required
                    />
                  </label>
                  <label className="flex flex-col text-gray-300">
                    Activity Level
                    <select
                      className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                      value={waterCalcActivity}
                      onChange={e => setWaterCalcActivity(e.target.value)}
                      required
                    >
                      <option value="sedentary">Sedentary</option>
                      <option value="light">Lightly Active</option>
                      <option value="active">Active</option>
                      <option value="very">Very Active</option>
                    </select>
                  </label>
                </form>
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
                  onClick={calculateWaterIntake}
                >
                  Calculate
                </button>
                {waterCalcResult && (
                  <div className="mt-6 text-center">
                    <div className="text-lg text-white font-bold mb-1">Recommended Daily Water Intake:</div>
                    <div className="text-2xl text-blue-400 font-extrabold">{waterCalcResult.liters} L</div>
                    <div className="text-lg text-gray-300">({waterCalcResult.ounces} fl oz)</div>
                    <button
                      className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
                      onClick={() => {
                        setDailyWaterGoal(Number(waterCalcResult.liters));
                        setShowWaterCalcModal(false);
                      }}
                    >
                      Make Daily Goal
                    </button>
                  </div>
                )}
                <button
                  className="mt-6 bg-gray-700 hover:bg-gray-800 text-gray-200 font-semibold py-2 px-6 rounded-lg shadow"
                  onClick={() => setShowWaterCalcModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Macronutrient Calculator Modal */}
          {showMacroCalcModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="bg-gray-900 rounded-xl p-8 shadow-2xl w-full max-w-xl flex flex-col items-center border border-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-white">Macronutrient Calculator</h3>
                <form className="w-full flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
                  <label className="flex flex-col text-gray-300">
                    Weight (lbs)
                    <input
                      type="number"
                      min={50}
                      max={500}
                      className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                      value={macroWeight}
                      onChange={e => setMacroWeight(Number(e.target.value))}
                      required
                    />
                  </label>
                  <label className="flex flex-col text-gray-300">
                    Height (inches)
                    <input
                      type="number"
                      min={48}
                      max={84}
                      className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                      value={macroHeight}
                      onChange={e => setMacroHeight(Number(e.target.value))}
                      required
                    />
                  </label>
                  <label className="flex flex-col text-gray-300">
                    Age
                    <input
                      type="number"
                      min={10}
                      max={100}
                      className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                      value={macroAge}
                      onChange={e => setMacroAge(Number(e.target.value))}
                      required
                    />
                  </label>
                  <label className="flex flex-col text-gray-300">
                    Gender
                    <select
                      className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                      value={macroGender}
                      onChange={e => setMacroGender(e.target.value)}
                      required
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </label>
                  <label className="flex flex-col text-gray-300">
                    Activity Level
                    <select
                      className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                      value={macroActivity}
                      onChange={e => setMacroActivity(e.target.value)}
                      required
                    >
                      <option value="light">Lightly Active</option>
                      <option value="moderate">Moderately Active</option>
                      <option value="active">Active</option>
                      <option value="very">Very Active</option>
                    </select>
                  </label>
                  <label className="flex flex-col text-gray-300">
                    Goal
                    <select
                      className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                      value={macroGoal}
                      onChange={e => setMacroGoal(e.target.value)}
                      required
                    >
                      <option value="cut">Cut (Fat Loss)</option>
                      <option value="maintain">Maintain</option>
                      <option value="bulk">Bulk (Muscle Gain)</option>
                    </select>
                    <div className="text-xs text-gray-400 mt-1">
                      <span className="block"><b>Cut:</b> Lose fat with a calorie deficit.</span>
                      <span className="block"><b>Maintain:</b> Stay at your current weight.</span>
                      <span className="block"><b>Bulk:</b> Build muscle with a calorie surplus.</span>
                    </div>
                  </label>
                </form>
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
                  onClick={calculateMacros}
                >
                  Calculate
                </button>
                {macroResult && (
                  <div className="mt-6 text-center w-full">
                    <div className="text-lg text-white font-bold mb-2">Recommended Daily Macros:</div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div className="flex justify-between text-gray-300 bg-gray-800 rounded px-3 py-1">
                        <span className="font-semibold text-white">Calories</span>
                        <span>{macroResult.calories} kcal</span>
                      </div>
                      <div className="flex justify-between text-gray-300 bg-gray-800 rounded px-3 py-1">
                        <span className="font-semibold text-white">Protein</span>
                        <span>{macroResult.protein} g</span>
                      </div>
                      <div className="flex justify-between text-gray-300 bg-gray-800 rounded px-3 py-1">
                        <span className="font-semibold text-white">Carbs</span>
                        <span>{macroResult.carbs} g</span>
                      </div>
                      <div className="flex justify-between text-gray-300 bg-gray-800 rounded px-3 py-1">
                        <span className="font-semibold text-white">Fat</span>
                        <span>{macroResult.fat} g</span>
                      </div>
                    </div>
                    <button
                      className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
                      onClick={() => {
                        setDailyCalorieGoal(macroResult.calories);
                        setShowMacroCalcModal(false);
                      }}
                    >
                      Make Daily Goal
                    </button>
                  </div>
                )}
                <button
                  className="mt-6 bg-gray-700 hover:bg-gray-800 text-gray-200 font-semibold py-2 px-6 rounded-lg shadow"
                  onClick={() => setShowMacroCalcModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Micronutrient Calculator Modal */}
          {showMicroCalcModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="bg-gray-900 rounded-xl p-8 shadow-2xl w-full max-w-xl flex flex-col items-center border border-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-white">Micronutrient Calculator</h3>
                <form className="w-full flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
                  <label className="flex flex-col text-gray-300">
                    Age ({getAgeGroupLabel(microAge)})
                    <input
                      type="number"
                      min={4}
                      max={100}
                      className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                      value={microAge}
                      onChange={e => setMicroAge(Number(e.target.value))}
                      required
                    />
                  </label>
                  <label className="flex flex-col text-gray-300">
                    Gender
                    <select
                      className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                      value={microGender}
                      onChange={e => setMicroGender(e.target.value)}
                      required
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </label>
                  {microGender === 'female' && (
                    <label className="flex flex-col text-gray-300">
                      Pregnancy/Breastfeeding
                      <select
                        className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                        value={microStatus}
                        onChange={e => setMicroStatus(e.target.value)}
                      >
                        <option value="none">None</option>
                        <option value="pregnant">Pregnant</option>
                        <option value="breastfeeding">Breastfeeding</option>
                      </select>
                    </label>
                  )}
                </form>
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
                  onClick={calculateMicros}
                >
                  Calculate
                </button>
                {microResult && (
                  <div className="mt-6 text-center w-full">
                    <div className="text-lg text-white font-bold mb-2">Recommended Daily Micronutrients:</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(microResult).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-gray-300 bg-gray-800 rounded px-3 py-1">
                          <span className="font-semibold text-white">{k}</span>
                          <span>{v}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
                      onClick={() => {
                        setDailyMicrosGoal(microResult);
                        setShowMicroCalcModal(false);
                      }}
                    >
                      Make Daily Goal
                    </button>
                  </div>
                )}
                <button
                  className="mt-6 bg-gray-700 hover:bg-gray-800 text-gray-200 font-semibold py-2 px-6 rounded-lg shadow"
                  onClick={() => setShowMicroCalcModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Daily Meal Tracking Section */}
        <div className="mt-12">
          <div className="w-full flex justify-center mb-8">
            <div className="w-full max-w-3xl rounded-xl bg-gradient-to-r from-gray-900/90 to-gray-700/80 py-6 px-4 flex items-center justify-center shadow-lg border border-gray-700/60">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center tracking-tight drop-shadow-lg">
                Daily Meal Tracking
              </h2>
            </div>
          </div>
          
          <div className="flex justify-end items-center mb-6 gap-4">
            <input
              type="date"
              value={selectedDate.toISOString().slice(0, 10)}
              onChange={e => setSelectedDate(new Date(e.target.value))}
              className="bg-gray-800 border border-gray-700 text-white rounded px-2 py-1"
            />
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg" 
              onClick={() => setShowMealModal(true)}
            >
              Add Meal
            </button>
          </div>

          {/* Today's Meals List */}
          {meals.length > 0 ? (
            <div className="space-y-4">
              {meals.map((meal, i) => (
                <div key={i} className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold text-white">{meal.category}</h4>
                  </div>
                  <div className="space-y-2">
                    {meal.foods.map((food: any, j: number) => (
                      <div key={j} className="flex justify-between items-center text-sm">
                        <div className="flex-1">
                          <span className="text-white">{food.quantity} {food.serving} {food.name}</span>
                          {food.brand && <span className="text-gray-400 ml-1">({food.brand})</span>}
                        </div>
                        <span className="text-gray-400 ml-4">{Math.round(food.nutrition.calories)} kcal</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-gray-300 text-sm mt-2">Total: <span className="text-white font-bold">{meal.nutrition.calories} kcal</span> | Protein: <span className="text-pink-400 font-bold">{meal.nutrition.protein}g</span> | Carbs: <span className="text-blue-400 font-bold">{meal.nutrition.carbs}g</span> | Fat: <span className="text-yellow-400 font-bold">{meal.nutrition.fat}g</span></div>
                  {meal.notes && <p className="text-sm text-gray-400 mt-2">Notes: {meal.notes}</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400">No meals logged yet today.</div>
          )}

          {/* Meal Logging Modal */}
          {showMealModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="bg-gray-900 rounded-xl p-8 shadow-2xl w-full max-w-2xl flex flex-col items-center border border-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-white">Log a Meal</h3>
                <div className="w-full flex flex-col gap-4">
                  <label className="flex flex-col text-gray-300">
                    Meal Category
                    <select className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white" value={mealCategory} onChange={e => setMealCategory(e.target.value)}>
                      <option>Breakfast</option>
                      <option>Lunch</option>
                      <option>Dinner</option>
                      <option>Snack</option>
                    </select>
                  </label>
                  <label className="flex flex-col text-gray-300">
                    Search Food
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white flex-1"
                        value={foodQuery}
                        onChange={e => setFoodQuery(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleFoodSearch(); }}
                        placeholder="e.g. chicken breast, apple, rice"
                      />
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg" onClick={handleFoodSearch} disabled={foodSearchLoading} type="button">
                        {foodSearchLoading ? 'Searching...' : 'Search'}
                      </button>
                    </div>
                  </label>
                  {/* Food search results with Select button and calories */}
                  {foodResults.length > 0 && !selectedFood && (
                    <div className="w-full bg-gray-800 rounded-lg p-2 max-h-60 overflow-y-auto mb-2">
                      {foodResults.map(food => (
                        <div key={food.id} className="flex justify-between items-center py-1 border-b border-gray-700 last:border-b-0">
                          <div className="flex flex-col">
                            <span className="font-semibold text-white">{food.name}</span>
                            <div className="flex gap-2 items-center text-xs text-gray-400">
                              {food.brand && <span>{String(food.brand)}</span>}
                            </div>
                            <span className="text-xs text-gray-400 mt-0.5">
                              {food.serving ? `${food.serving}, ` : ''}{`${food.calories} calories`}
                            </span>
                          </div>
                          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1 rounded-lg text-xs" onClick={() => handleSelectFood(food)} type="button">Select</button>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Food selection panel for quantity/serving and meal category */}
                  {selectedFood && selectedNutrition && (
                    <div className="w-full bg-gray-800 rounded-lg p-4 mb-2 flex flex-col gap-2">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="font-semibold text-white text-lg">{selectedFood.name}</span>
                          {selectedFood.brand && <span className="ml-2 text-xs text-gray-400">{selectedFood.brand}</span>}
                        </div>
                        <button className="text-xs text-gray-400 hover:text-red-400" onClick={() => setSelectedFood(null)}>Change</button>
                      </div>
                      <div className="flex gap-4 items-center mb-2">
                        <label className="flex flex-col text-gray-300">
                          How much?
                          <input type="number" min={1} max={99} value={selectedQuantity} onChange={e => setSelectedQuantity(Number(e.target.value))} className="mt-1 px-2 py-1 rounded bg-gray-900 border border-gray-700 text-white w-20" />
                        </label>
                        <label className="flex flex-col text-gray-300">
                          Serving Type
                          <select
                            className="mt-1 px-2 py-1 rounded bg-gray-900 border border-gray-700 text-white"
                            value={String(selectedPortionIndex ?? 0)}
                            onChange={e => {
                              const idx = Number(e.target.value);
                              setSelectedPortionIndex(idx);
                              setSelectedServing(String(servingOptions[idx]?.label ?? ''));
                              // If the selected option has NaN calories, use the base serving's nutrition
                              const s = servingOptions[idx];
                              const base = servingOptions.find(opt => !isNaN(opt.calories)) || servingOptions[0];
                              setSelectedNutrition({
                                calories: isNaN(Number(s.calories)) ? Number(base.calories || 0) * selectedQuantity : Number(s.calories || 0) * selectedQuantity,
                                protein: isNaN(Number(s.protein)) ? Number(base.protein || 0) * selectedQuantity : Number(s.protein || 0) * selectedQuantity,
                                carbs: isNaN(Number(s.carbs)) ? Number(base.carbs || 0) * selectedQuantity : Number(s.carbs || 0) * selectedQuantity,
                                fat: isNaN(Number(s.fat)) ? Number(base.fat || 0) * selectedQuantity : Number(s.fat || 0) * selectedQuantity,
                                micros: {},
                              });
                            }}
                          >
                            {servingOptions.map((s: FoodPortion, i: number) => (
                              <option key={i} value={String(i)}>{String(s.label ?? '')}</option>
                            ))}
                          </select>
                          {servingOptions[selectedPortionIndex]?.description && (
                            <span className="text-xs text-gray-400 mt-1">
                              1 serving = {String(servingOptions[selectedPortionIndex]?.description ?? '')}
                            </span>
                          )}
                        </label>
                      </div>
                      <div className="text-sm text-gray-300">
                        <div>Calories: <span className="text-white font-bold">{Math.round(selectedNutrition.calories)} kcal</span></div>
                        <div>Protein: <span className="text-pink-400 font-bold">{Math.round(selectedNutrition.protein)}g</span></div>
                        <div>Carbs: <span className="text-blue-400 font-bold">{Math.round(selectedNutrition.carbs)}g</span></div>
                        <div>Fat: <span className="text-yellow-400 font-bold">{Math.round(selectedNutrition.fat)}g</span></div>
                      </div>
                      <button
                        className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
                        onClick={handleAddSelectedFood}
                      >
                        Add to Meal
                      </button>
                    </div>
                  )}
                  {/* Added foods list */}
                  {addedFoods.length > 0 && (
                    <div className="w-full">
                      <h4 className="text-lg font-semibold text-white mb-2">Added Foods</h4>
                      <div className="space-y-2">
                        {addedFoods.map((food, i) => (
                          <div key={i} className="flex justify-between items-center bg-gray-800 rounded p-2">
                            <div>
                              <div className="text-white">{food.quantity} {food.serving} {food.name}</div>
                              <div className="text-sm text-gray-400">{Math.round(food.nutrition.calories)} kcal</div>
                            </div>
                            <button
                              className="text-red-400 hover:text-red-300"
                              onClick={() => {
                                const newFoods = [...addedFoods];
                                newFoods.splice(i, 1);
                                setAddedFoods(newFoods);
                                // Recalculate meal nutrition
                                const totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
                                for (const f of newFoods) {
                                  totals.calories += f.nutrition.calories;
                                  totals.protein += f.nutrition.protein;
                                  totals.carbs += f.nutrition.carbs;
                                  totals.fat += f.nutrition.fat;
                                }
                                setMealNutrition(totals);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                        <div className="text-lg font-semibold text-white mb-2">Meal Totals</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Calories: <span className="text-white font-bold">{Math.round(mealNutrition.calories)} kcal</span></div>
                          <div>Protein: <span className="text-pink-400 font-bold">{Math.round(mealNutrition.protein)}g</span></div>
                          <div>Carbs: <span className="text-blue-400 font-bold">{Math.round(mealNutrition.carbs)}g</span></div>
                          <div>Fat: <span className="text-yellow-400 font-bold">{Math.round(mealNutrition.fat)}g</span></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Notes field */}
                  <label className="flex flex-col text-gray-300">
                    Notes (optional)
                    <textarea
                      className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                      value={mealNotes}
                      onChange={e => setMealNotes(e.target.value)}
                      rows={3}
                      placeholder="Add any notes about this meal..."
                    />
                  </label>
                  {/* Save and Cancel buttons */}
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      className="bg-gray-700 hover:bg-gray-800 text-gray-200 font-semibold py-2 px-6 rounded-lg shadow"
                      onClick={() => setShowMealModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
                      onClick={handleSaveMeal}
                      disabled={addedFoods.length === 0}
                    >
                      Save Meal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* 3. Add the "This Week's Meals" section below "Today's Meals" */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-2">This Week's Meals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {weeklySummary.map(daySummary => (
              <div key={daySummary.date} className="bg-gray-800/50 rounded-lg p-3">
                <h3 className="text-md font-bold text-white mb-1">{daySummary.day}</h3>
                <div className="text-xs text-gray-400">{daySummary.date}</div>
                <div className="mt-2 text-sm">
                  <span className="text-white font-semibold">{daySummary.consumed}</span> / {daySummary.goal} kcal
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                  <div className="bg-green-500 h-1 rounded-full" style={{ width: `${(daySummary.consumed / daySummary.goal) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* History Charts Row */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Weight History Chart */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Weight History</h2>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="w-full h-64">
                <Line
                  data={{
                    labels: weightHistory.map(entry => entry.date),
                    datasets: [
                      {
                        label: 'Weight (lbs)',
                        data: weightHistory.map(entry => entry.weight),
                        borderColor: '#60a5fa',
                        backgroundColor: 'rgba(59,130,246,0.2)',
                        tension: 0.3,
                        fill: true,
                        pointRadius: 4,
                        pointBackgroundColor: '#60a5fa',
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: true },
                    },
                    scales: {
                      x: {
                        title: { display: true, text: 'Date', color: '#fff' },
                        ticks: { color: '#cbd5e1' },
                        grid: { color: 'rgba(100,116,139,0.1)' },
                      },
                      y: {
                        title: { display: true, text: 'Weight (lbs)', color: '#fff' },
                        ticks: { color: '#cbd5e1' },
                        grid: { color: 'rgba(100,116,139,0.1)' },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
          {/* Water Intake History Chart */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Water Intake (Last 7 Days)</h2>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="w-full h-64">
                {waterHistoryData.length === 7 && (
                  <Line
                    data={{
                      labels: Array.from({ length: 7 }).map((_, i) => {
                        const d = new Date();
                        d.setDate(d.getDate() - (6 - i));
                        return d.toISOString().slice(0, 10);
                      }),
                      datasets: [
                        {
                          label: 'Water Intake (L)',
                          data: waterHistoryData,
                          borderColor: '#38bdf8',
                          backgroundColor: 'rgba(56,189,248,0.2)',
                          tension: 0.3,
                          fill: true,
                          pointRadius: 4,
                          pointBackgroundColor: '#38bdf8',
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { display: false },
                        tooltip: { enabled: true },
                      },
                      scales: {
                        x: {
                          title: { display: true, text: 'Date', color: '#fff' },
                          ticks: { color: '#cbd5e1' },
                          grid: { color: 'rgba(100,116,139,0.1)' },
                        },
                        y: {
                          title: { display: true, text: 'Liters', color: '#fff' },
                          ticks: { color: '#cbd5e1' },
                          grid: { color: 'rgba(100,116,139,0.1)' },
                        },
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          {/* Calorie Intake History Chart */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Daily Calorie Intake (Last 7 Days)</h2>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="w-full h-64">
                {calorieHistoryData.length === 7 && (
                  <Line
                    data={{
                      labels: Array.from({ length: 7 }).map((_, i) => {
                        const d = new Date();
                        d.setDate(d.getDate() - (6 - i));
                        return d.toISOString().slice(0, 10);
                      }),
                      datasets: [
                        {
                          label: 'Calories',
                          data: calorieHistoryData,
                          borderColor: '#fbbf24',
                          backgroundColor: 'rgba(251,191,36,0.2)',
                          tension: 0.3,
                          fill: true,
                          pointRadius: 4,
                          pointBackgroundColor: '#fbbf24',
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { display: false },
                        tooltip: { enabled: true },
                      },
                      scales: {
                        x: {
                          title: { display: true, text: 'Date', color: '#fff' },
                          ticks: { color: '#cbd5e1' },
                          grid: { color: 'rgba(100,116,139,0.1)' },
                        },
                        y: {
                          title: { display: true, text: 'Calories', color: '#fff' },
                          ticks: { color: '#cbd5e1' },
                          grid: { color: 'rgba(100,116,139,0.1)' },
                        },
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 