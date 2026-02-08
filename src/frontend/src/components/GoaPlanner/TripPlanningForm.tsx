import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Calendar, DollarSign, Users, MapPin, Loader2 } from 'lucide-react';
import type { TripFormData } from './LandingPage';

type TripPlanningFormProps = {
  formData: TripFormData;
  onFormDataChange: (data: TripFormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

export function TripPlanningForm({ formData, onFormDataChange, onSubmit, isLoading }: TripPlanningFormProps) {
  const updateFormData = (field: keyof TripFormData, value: string | number) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <Card className="shadow-lg border-border/50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Plan Your Trip</CardTitle>
        <CardDescription>
          Customize your Goa experience by selecting your preferences below
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Duration */}
        <div className="space-y-2">
          <Label htmlFor="duration" className="flex items-center gap-2 text-base">
            <Calendar className="h-4 w-4 text-coral-600" />
            Duration
          </Label>
          <Select
            value={formData.duration.toString()}
            onValueChange={(value) => updateFormData('duration', parseInt(value))}
          >
            <SelectTrigger id="duration" className="w-full">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Day</SelectItem>
              <SelectItem value="2">2 Days</SelectItem>
              <SelectItem value="3">3 Days</SelectItem>
              <SelectItem value="4">4 Days</SelectItem>
              <SelectItem value="5">5 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-base">
            <DollarSign className="h-4 w-4 text-coral-600" />
            Budget
          </Label>
          <ToggleGroup
            type="single"
            value={formData.budget}
            onValueChange={(value) => value && updateFormData('budget', value)}
            className="grid grid-cols-3 gap-2"
          >
            <ToggleGroupItem
              value="Low"
              aria-label="Low budget"
              className="data-[state=on]:bg-coral-600 data-[state=on]:text-white"
            >
              Low
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Medium"
              aria-label="Medium budget"
              className="data-[state=on]:bg-coral-600 data-[state=on]:text-white"
            >
              Medium
            </ToggleGroupItem>
            <ToggleGroupItem
              value="High"
              aria-label="High budget"
              className="data-[state=on]:bg-coral-600 data-[state=on]:text-white"
            >
              High
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Travel Type */}
        <div className="space-y-2">
          <Label htmlFor="travelType" className="flex items-center gap-2 text-base">
            <Users className="h-4 w-4 text-coral-600" />
            Travel Type
          </Label>
          <Select value={formData.travelType} onValueChange={(value) => updateFormData('travelType', value)}>
            <SelectTrigger id="travelType" className="w-full">
              <SelectValue placeholder="Select travel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Family">Family</SelectItem>
              <SelectItem value="Couple">Couple</SelectItem>
              <SelectItem value="Friends">Friends</SelectItem>
              <SelectItem value="Solo">Solo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-base">
            <MapPin className="h-4 w-4 text-coral-600" />
            Location
          </Label>
          <ToggleGroup
            type="single"
            value={formData.location}
            onValueChange={(value) => value && updateFormData('location', value)}
            className="grid grid-cols-3 gap-2"
          >
            <ToggleGroupItem
              value="North"
              aria-label="North Goa"
              className="data-[state=on]:bg-teal-600 data-[state=on]:text-white"
            >
              North
            </ToggleGroupItem>
            <ToggleGroupItem
              value="South"
              aria-label="South Goa"
              className="data-[state=on]:bg-teal-600 data-[state=on]:text-white"
            >
              South
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Both"
              aria-label="Both North and South"
              className="data-[state=on]:bg-teal-600 data-[state=on]:text-white"
            >
              Both
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Submit Button */}
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full bg-coral-600 hover:bg-coral-700 text-white font-semibold py-6 text-lg shadow-md transition-all hover:shadow-lg disabled:opacity-50"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Planning Your Trip...
            </>
          ) : (
            'Plan My Trip'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
