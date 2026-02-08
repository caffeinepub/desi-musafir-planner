import { useState } from 'react';
import { TripPlanningForm } from './TripPlanningForm';
import { ItineraryResults } from './ItineraryResults';
import { usePlanTrip } from '../../hooks/usePlanTrip';
import { useMockPlanTrip } from '../../hooks/useMockPlanTrip';
import { Palmtree, Sparkles } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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

  const [mockMode, setMockMode] = useState(true); // Default to Mock Mode enabled

  // Real backend mutation
  const realMutation = usePlanTrip();
  
  // Mock mutation
  const mockMutation = useMockPlanTrip();

  // Use the appropriate mutation based on mock mode
  const activeMutation = mockMode ? mockMutation : realMutation;

  const handleSubmit = () => {
    activeMutation.mutate(formData);
  };

  // In Mock Mode, never show errors - always use mock data
  const displayData = mockMode ? mockMutation.data : realMutation.data;
  const displayIsSuccess = mockMode ? mockMutation.isSuccess : realMutation.isSuccess;
  const displayIsError = mockMode ? false : realMutation.isError;

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
                  Desi Musafir - Goa Planner
                </h1>
              </div>
              <p className="mt-2 text-muted-foreground">
                Plan your perfect Goa getaway with personalized itineraries
              </p>
            </div>
            
            {/* Mock Mode Toggle */}
            <div className="flex items-center gap-3 bg-background/60 backdrop-blur-sm px-4 py-3 rounded-lg border border-border/50 shadow-sm">
              <Sparkles className={`h-4 w-4 ${mockMode ? 'text-yellow-500' : 'text-muted-foreground'}`} />
              <Label htmlFor="mock-mode" className="text-sm font-medium cursor-pointer">
                Mock Mode
              </Label>
              <Switch
                id="mock-mode"
                checked={mockMode}
                onCheckedChange={setMockMode}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Mock Mode Info Banner */}
          {mockMode && (
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                  Simulation Mode Active
                </p>
                <p className="text-xs text-yellow-800 dark:text-yellow-200 mt-1">
                  Using hardcoded sample data. No backend calls will be made. Toggle off to use real backend.
                </p>
              </div>
            </div>
          )}

          {/* Trip Planning Form */}
          <TripPlanningForm
            formData={formData}
            onFormDataChange={setFormData}
            onSubmit={handleSubmit}
            isLoading={activeMutation.isPending}
          />

          {/* Results Section */}
          <ItineraryResults
            isLoading={activeMutation.isPending}
            isError={displayIsError}
            error={realMutation.error}
            data={displayData}
            isSuccess={displayIsSuccess}
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
