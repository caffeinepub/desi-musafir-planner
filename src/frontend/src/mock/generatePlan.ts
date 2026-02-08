import type { TripFormData } from '../components/GoaPlanner/LandingPage';
import { FIVE_DAY_ITINERARY, BUDGET_DATASETS, type BudgetLevel } from './advancedLocalDatasets';

// Generate a complete itinerary with duration slicing and budget switching
export function generatePlan(formData: TripFormData): string {
  const { duration, budget } = formData;
  
  // Get budget-specific dataset
  const budgetData = BUDGET_DATASETS[budget as BudgetLevel];
  
  // Slice the 5-day itinerary based on selected duration (1-5 days)
  const selectedDays = FIVE_DAY_ITINERARY.slice(0, duration);
  
  // Generate day-wise plan text
  const dayWisePlan = selectedDays.map(day => {
    return `Day ${day.day}: ${day.title}
Morning: ${day.morning}
Afternoon: ${day.afternoon}
Evening: ${day.evening}`;
  }).join('\n\n');
  
  // Assemble the complete itinerary with all sections
  return `
***Itinerary Details - Your Perfect Goa Getaway***

***Day-wise Plan***

${dayWisePlan}

***Hotels***
${budgetData.hotels.join('\n')}

***Food Spots***
${budgetData.food.join('\n')}

***Recommended Transport***
⭐ Recommended: Rent from Goa Car Rental
${budgetData.transport.join('\n')}
`.trim();
}
