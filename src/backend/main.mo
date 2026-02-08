import List "mo:core/List";
import Array "mo:core/Array";
import Text "mo:core/Text";

actor {
  public type DayPlan = {
    day : Nat;
    activities : [Text];
    accommodation : Text;
  };

  public type FoodSpot = {
    restaurantName : Text;
    location : Text;
  };

  public type Itinerary = {
    id : Nat;
    days : [DayPlan];
    foodSpots : [FoodSpot];
  };

  public type TripForm = {
    duration : Nat;
    budget : Nat;
    travelType : Text;
    location : Text;
    numPersons : Nat;
    useRental : Bool;
  };

  public type Trip = {
    form : TripForm;
    id : Nat;
    itinerary : ?Itinerary;
  };

  var itineraryId = 0;
  var tripId = 0;

  func generateDaysList(duration : Nat, location : Text) : List.List<DayPlan> {
    let days = List.empty<DayPlan>();
    for (i in Nat.range(1, duration + 1)) {
      let activities = ["Sightseeing in " # location, "Local shopping", "Cultural tour"];
      let dayPlan : DayPlan = {
        day = i;
        activities = activities;
        accommodation = "Hotel " # location # " - Day " # i.toText();
      };
      days.add(dayPlan);
    };
    days;
  };

  func generateFoodList(location : Text) : List.List<FoodSpot> {
    let foodSpots = List.empty<FoodSpot>();
    foodSpots.add({
      restaurantName = "Desi Diner";
      location;
    });
    foodSpots.add({
      restaurantName = "Local Tastes";
      location = location # " Center";
    });
    foodSpots;
  };

  public shared ({ caller }) func planTrip(form : TripForm) : async Text {
    itineraryId += 1;
    let daysList = generateDaysList(form.duration, form.location);
    let foodList = generateFoodList(form.location);

    let itinerary : Itinerary = {
      id = itineraryId;
      days = daysList.toArray();
      foodSpots = foodList.toArray();
    };

    tripId += 1;
    let trip : Trip = {
      form;
      id = tripId;
      itinerary = ?itinerary;
    };

    let tripDetails = "
***Itinerary Details (Mock for: " # form.location # ")***

***Day-wise Plan***" # concatDayPlans(itinerary.days) #
      "\n***Food Spots***\n" # concatFoodSpots(itinerary.foodSpots) #
      "\n***Recommended Transport (Desi Musafir Rentals)***\n" # transportDetails();
    tripDetails;
  };

  func concatDayPlans(days : [DayPlan]) : Text {
    days.foldLeft("", func(acc, day) { acc # "\tDay " # day.day.toText() # ": " });
  };

  func concatFoodSpots(spots : [FoodSpot]) : Text {
    spots.foldLeft("", func(acc, spot) { acc # "\t" # spot.restaurantName });
  };

  func transportDetails() : Text {
    "\t- Private vehicles available on request.\n\t- Shared transport recommended for groups of 4 or more.\n";
  };
};
