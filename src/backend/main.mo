import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";



actor {
  public type DayPlan = {
    day : Nat;
    morningActivities : [Text];
    afternoonActivities : [Text];
    eveningActivities : [Text];
    accommodation : Text;
  };

  public type FoodSpot = {
    name : Text;
    description : Text;
  };

  public type Itinerary = {
    id : Nat;
    days : List.List<DayPlan>;
    foodSpots : List.List<FoodSpot>;
    transport : Text;
  };

  public type TripForm = {
    duration : Nat;
    location : Text;
    groupSize : Nat;
  };

  var itineraryCounter = 0;

  func createDayPlan(dayNumber : Nat, location : Text) : DayPlan {
    {
      day = dayNumber;
      morningActivities = ["Sightseeing at landmark " # location];
      afternoonActivities = ["Local experience"];
      eveningActivities = ["Cultural activity"];
      accommodation = "Hotel - Day " # dayNumber.toText();
    };
  };

  func getFoodSpots() : List.List<FoodSpot> {
    let foodSpots = List.empty<FoodSpot>();
    foodSpots.add({
      name = "Desi Diner";
      description = "Authentic local cuisine.";
    });
    foodSpots.add({
      name = "Urban Eatery";
      description = "Modern fusion dishes.";
    });
    foodSpots;
  };

  public shared ({ caller }) func createItinerary(form : TripForm) : async Text {
    itineraryCounter += 1;

    let days = List.empty<DayPlan>();
    for (i in Nat.range(1, form.duration + 1)) {
      days.add(createDayPlan(i, form.location));
    };

    let itinerary : Itinerary = {
      id = itineraryCounter;
      days;
      foodSpots = getFoodSpots();
      transport = "Private vehicle included.";
    };

    formatItinerary(itinerary);
  };

  func formatItinerary(itinerary : Itinerary) : Text {
    let topSection = "***Itinerary Details*** (Mock Data)\n";
    let dayPlanSection = "***Day-wise Plan***\n" # formatDayPlans(itinerary.days);
    let foodSection = "***Food Spots***\n" # formatFoodSpots(itinerary.foodSpots);
    let transportSection = "***Transport Recommendations***\n" # itinerary.transport;
    topSection # dayPlanSection # foodSection # transportSection;
  };

  func formatDayPlans(days : List.List<DayPlan>) : Text {
    var result = "";
    for (dayPlan in days.values()) {
      result #= formatSingleDay(dayPlan);
    };
    result;
  };

  func formatSingleDay(dayPlan : DayPlan) : Text {
    let morning = "\tMorning: " # formatActivities(dayPlan.morningActivities);
    let afternoon = "\tAfternoon: " # formatActivities(dayPlan.afternoonActivities);
    let evening = "\tEvening: " # formatActivities(dayPlan.eveningActivities);
    let hotel = "\tHotel: " # dayPlan.accommodation;
    "Day " # dayPlan.day.toText() # ":\n" # morning # "\n" # afternoon # "\n" # evening # "\n" # hotel # "\n\n";
  };

  func formatActivities(_activities : [Text]) : Text {
    "Not yet implemented";
  };

  func formatFoodSpots(foodSpots : List.List<FoodSpot>) : Text {
    var result = "";
    for (foodSpot in foodSpots.values()) {
      result #= "\t" # foodSpot.name # ": " # foodSpot.description # "\n";
    };
    result;
  };
};
