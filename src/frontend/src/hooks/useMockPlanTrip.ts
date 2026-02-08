import { useMutation } from '@tanstack/react-query';
import type { TripFormData } from '../components/GoaPlanner/LandingPage';
import { generatePlan } from '../mock/generatePlan';

// Local-only mutation that NEVER calls the backend
export function useMockPlanTrip() {
  return useMutation<string, Error, TripFormData>({
    mutationFn: async (formData: TripFormData) => {
      // Simulate a brief delay to mimic API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate itinerary using local datasets only
      return generatePlan(formData);
    },
  });
}
