# Specification

## Summary
**Goal:** Restore deployability by resetting to the last working code version while keeping the current Goa Planner UI, and enforce Simulation (Mock Data) behavior including a dummy WhatsApp CTA and visible Recommended Transport card.

**Planned changes:**
- Reset/undo recent changes that cause the platform safety-flag deployment failure while preserving the current “Desi Musafir - Goa Planner” landing UI layout and rendering.
- Enable Mock Data (Simulation Mode) by default and ensure “Plan My Trip” uses the hardcoded sample itinerary without calling the backend/canister.
- Update the “Book Now on WhatsApp” button to link exactly to `https://wa.me/919999999999` and ensure no other number is used for this CTA.
- Update mock itinerary content and/or results rendering so a parsable “Recommended Transport” section appears as a highlighted card above the Day-wise Plan, titled “⭐ Recommended: Rent from Desi Musafir Rentals”.

**User-visible outcome:** The app deploys successfully; users can load the Goa Planner, click “Plan My Trip” and instantly see a mock itinerary without backend errors, with a visible Recommended Transport card, and the WhatsApp booking button opens the dummy number link.
