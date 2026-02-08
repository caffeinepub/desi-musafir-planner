import { useState } from 'react';
import { TripPlanningForm } from './TripPlanningForm';
import { ItineraryResults } from './ItineraryResults';
import { useMockPlanTrip } from '../../hooks/useMockPlanTrip';
import { Palmtree } from 'lucide-react';

export type TripFormData = {
  duration: number;
  budget: 'Low' | 'Medium' | 'High';
  travelType: 'Family' | 'Couple' | 'Friends' | 'Solo';
  location: 'North' | 'South' | 'Both';
};

export function LandingPage() {
  const [formData, setFormData] = useState<TripFormData>({
    duration: 3,
    budget: 'Medium',
    travelType: 'Couple',
    location: 'Both',
  });

  // Always use local-only mutation (no backend calls)
  const mutation = useMockPlanTrip();

  const handleSubmit = () => {
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand-50 via-background to-coral-50">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Palmtree className="h-8 w-8 text-coral-600" />
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Goa Car Rental
                </h1>
              </div>
              <p className="mt-2 text-muted-foreground">
                Best Bike & Car Rental in Goa + Free Travel Planner
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Trip Planning Form */}
          <TripPlanningForm
            formData={formData}
            onFormDataChange={setFormData}
            onSubmit={handleSubmit}
            isLoading={mutation.isPending}
          />

          {/* Results Section */}
          <ItineraryResults
            isLoading={mutation.isPending}
            isError={false}
            error={null}
            data={mutation.data}
            isSuccess={mutation.isSuccess}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © 2026. Built with{' '}
          <span className="inline-block text-coral-600">❤</span> using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:text-coral-600 transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
