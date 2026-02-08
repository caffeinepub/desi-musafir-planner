import { useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { TripFormData } from '../components/GoaPlanner/LandingPage';
import type { TripForm } from '../backend';

export function usePlanTrip() {
  const { actor } = useActor();

  return useMutation<string, Error, TripFormData>({
    mutationFn: async (formData: TripFormData) => {
      if (!actor) {
        throw new Error('Backend actor is not initialized. Please try again.');
      }

      try {
        // Map UI budget to numeric values
        const budgetMap: Record<'Low' | 'Medium' | 'High', bigint> = {
          Low: BigInt(5000),
          Medium: BigInt(15000),
          High: BigInt(30000),
        };

        // Convert UI form data to backend TripForm format
        const backendForm: TripForm = {
          duration: BigInt(formData.duration),
          budget: budgetMap[formData.budget],
          travelType: formData.travelType,
          location: formData.location,
          numPersons: BigInt(2), // Default value
          useRental: true, // Default to true for Desi Musafir Rentals
        };

        // Call the backend planTrip function with the form data
        const itinerary = await actor.planTrip(backendForm);
        
        return itinerary;
      } catch (err) {
        throw new Error(
          err instanceof Error ? err.message : 'Failed to plan trip. Please try again later.'
        );
      }
    },
  });
}
