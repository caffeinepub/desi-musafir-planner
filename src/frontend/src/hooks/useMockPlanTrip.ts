import { useMutation } from '@tanstack/react-query';
import type { TripFormData } from '../components/GoaPlanner/LandingPage';
import { SAMPLE_ITINERARY } from '../mock/sampleItinerary';

// Mock mutation that returns hardcoded sample data without calling the backend
export function useMockPlanTrip() {
  return useMutation<string, Error, TripFormData>({
    mutationFn: async () => {
      // Simulate a brief delay to mimic API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Always return the hardcoded sample itinerary, no backend usage
      return SAMPLE_ITINERARY;
    },
  });
}
