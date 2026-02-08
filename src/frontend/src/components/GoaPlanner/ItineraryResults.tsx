import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, MapPinned, Sparkles, UtensilsCrossed, Car, Hotel } from 'lucide-react';
import { WHATSAPP_URL } from '../../constants/whatsapp';

type ItineraryResultsProps = {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data?: string;
  isSuccess: boolean;
};

type ParsedItinerary = {
  days: { title: string; content: string[] }[];
  hotels: string[];
  foodSpots: string[];
  transport: string[];
};

function parseItinerary(data: string): ParsedItinerary {
  const lines = data.split('\n').map(line => line.trim()).filter(line => line);
  
  const result: ParsedItinerary = {
    days: [],
    hotels: [],
    foodSpots: [],
    transport: [],
  };

  let currentSection: 'days' | 'hotels' | 'food' | 'transport' | null = null;
  let currentDay: { title: string; content: string[] } | null = null;

  for (const line of lines) {
    // Check for section headers
    if (line.includes('Day-wise Plan') || line.includes('Day-Wise Plan')) {
      currentSection = 'days';
      continue;
    } else if (line.includes('***Hotels***')) {
      currentSection = 'hotels';
      if (currentDay) {
        result.days.push(currentDay);
        currentDay = null;
      }
      continue;
    } else if (line.includes('Food Spots')) {
      currentSection = 'food';
      continue;
    } else if (line.includes('Recommended Transport')) {
      currentSection = 'transport';
      continue;
    }

    // Skip lines with only asterisks, "Itinerary Details", or the star-title line
    if (
      line.match(/^\*+$/) || 
      line.includes('Itinerary Details') || 
      line.includes('Mock for:') ||
      line.includes('⭐ Recommended:')
    ) {
      continue;
    }

    // Parse content based on current section
    if (currentSection === 'days') {
      const dayMatch = line.match(/Day\s+(\d+)/i);
      if (dayMatch) {
        if (currentDay) {
          result.days.push(currentDay);
        }
        currentDay = { title: `Day ${dayMatch[1]}`, content: [] };
      } else if (currentDay && line) {
        currentDay.content.push(line);
      }
    } else if (currentSection === 'hotels' && line) {
      result.hotels.push(line);
    } else if (currentSection === 'food' && line) {
      result.foodSpots.push(line);
    } else if (currentSection === 'transport' && line) {
      result.transport.push(line);
    }
  }

  // Push the last day if exists
  if (currentDay) {
    result.days.push(currentDay);
  }

  return result;
}

// Helper to detect time of day and add emoji
function formatTimeOfDay(text: string): { emoji: string; text: string } {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('morning')) {
    return { emoji: '🌅', text };
  } else if (lowerText.includes('afternoon')) {
    return { emoji: '🌤️', text };
  } else if (lowerText.includes('evening') || lowerText.includes('night')) {
    return { emoji: '🌙', text };
  }
  
  return { emoji: '', text };
}

export function ItineraryResults({ isLoading, isError, error, data, isSuccess }: ItineraryResultsProps) {
  // Loading state
  if (isLoading) {
    return (
      <Card className="shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-coral-600 animate-pulse" />
            Creating Your Itinerary
          </CardTitle>
          <CardDescription>Please wait while we plan your perfect Goa trip...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (isError) {
    return (
      <Alert variant="destructive" className="shadow-lg">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Planning Trip</AlertTitle>
        <AlertDescription>
          {error?.message || 'An unexpected error occurred while planning your trip. Please try again.'}
        </AlertDescription>
      </Alert>
    );
  }

  // Success state with data
  if (isSuccess && data) {
    const parsed = parseItinerary(data);

    return (
      <Card className="shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPinned className="h-5 w-5 text-teal-600" />
            Your Goa Itinerary
          </CardTitle>
          <CardDescription>Here's your personalized day-by-day plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Transport Section - Highlighted Card (Always at Top) */}
          {parsed.transport.length > 0 && (
            <Card className="border-2 border-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Car className="h-5 w-5 text-yellow-600" />
                  ⭐ Recommended: Rent from Goa Car Rental
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {parsed.transport.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      <p className="text-sm text-foreground/80 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md"
                  size="lg"
                  asChild
                >
                  <a 
                    href={WHATSAPP_URL}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Book Now on WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}

          <Separator />

          {/* Day-wise Plan - Timeline Style */}
          {parsed.days.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MapPinned className="h-5 w-5 text-coral-600" />
                Day-wise Plan
              </h3>
              <div className="relative space-y-6 pl-8 border-l-2 border-coral-300 dark:border-coral-700">
                {parsed.days.map((day, index) => (
                  <div key={index} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-coral-500 border-2 border-background shadow-sm" />
                    
                    {/* Day content */}
                    <div className="space-y-3">
                      <h4 className="text-base font-bold text-coral-700 dark:text-coral-400">
                        {day.title}
                      </h4>
                      <div className="space-y-2">
                        {day.content.length > 0 ? (
                          day.content.map((line, lineIndex) => {
                            const { emoji, text } = formatTimeOfDay(line);
                            return (
                              <div key={lineIndex} className="flex items-start gap-2">
                                {emoji && <span className="text-lg">{emoji}</span>}
                                <p className="text-sm text-foreground/80 leading-relaxed">{text}</p>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-sm text-muted-foreground italic">No activities planned</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Hotels Section */}
          {parsed.hotels.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Hotel className="h-5 w-5 text-teal-600" />
                Recommended Hotels
              </h3>
              <div className="grid gap-3">
                {parsed.hotels.map((hotel, index) => (
                  <Card key={index} className="border-teal-200 dark:border-teal-800 bg-teal-50/30 dark:bg-teal-950/20">
                    <CardContent className="pt-4">
                      <p className="text-sm text-foreground/90 leading-relaxed">{hotel}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Food Spots - Chip Style */}
          {parsed.foodSpots.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <UtensilsCrossed className="h-5 w-5 text-coral-600" />
                Must-Try Food Spots
              </h3>
              <div className="flex flex-wrap gap-2">
                {parsed.foodSpots.map((spot, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="px-3 py-2 text-sm bg-coral-100 dark:bg-coral-900/30 text-coral-800 dark:text-coral-200 hover:bg-coral-200 dark:hover:bg-coral-900/50 transition-colors"
                  >
                    {spot}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Default state (no data yet)
  return null;
}
