# NutriSmart

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- User profile setup: age, gender, height, weight, activity level, health goals (weight loss, muscle gain, maintenance, condition management)
- Health conditions multi-select: diabetes, hypertension, high cholesterol, food allergies (nuts, shellfish), gluten intolerance, lactose intolerance
- BMR + TDEE calorie calculator based on profile
- Regional meal plan generator: user selects their region/cuisine preference, app generates daily meal plan respecting calorie budget and health conditions
- Food photo analyzer: user uploads or captures a photo of food, app uses HTTP outcall to identify food, estimate calories, and check if it fits their daily diet
- Daily meal logging: users log meals eaten, track remaining calorie budget
- Dashboard showing daily calorie target, consumed, remaining, and macro breakdown

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend: user profile storage (age, gender, height, weight, activity, goals, conditions, region), meal log storage per user, calorie calculation logic (Mifflin-St Jeor BMR + activity multiplier), meal plan generation logic, food analysis via HTTP outcall to nutrition API
2. Authorization: each user manages their own profile and logs
3. Blob storage: store uploaded food photos
4. HTTP outcalls: call external nutrition/food recognition API for photo analysis
5. Frontend: onboarding flow (profile setup), dashboard (calorie ring, today's log), meal plan tab, food analyzer tab (camera/upload + results)
