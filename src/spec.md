# Specification

## Summary
**Goal:** Remove explicit pricing from the “Recommended Transport” gold card and update its bullet list to the user-provided general offerings, without changing the existing WhatsApp CTA.

**Planned changes:**
- Update the “Recommended Transport” highlighted gold card text to remove any mention of “₹1200” and “₹400”.
- Replace the gold card bullet list with exactly these four lines, in order:
  - "🚗 Private Cars available (Self-drive & Chauffeur)."
  - "🛵 Scooters & Bikes available for Couples & Solo Travelers."
  - "✨ Best Market Rates Guaranteed!"
  - "✅ 24/7 Roadside Assistance Included."
- Keep the gold card title (“⭐ Recommended: Rent from Goa Car Rental”) and the “Book Now on WhatsApp” button unchanged (label, styling, and link behavior via the existing WHATSAPP_URL constant).

**User-visible outcome:** Generated itineraries show a “Recommended Transport” section whose highlighted gold card no longer displays prices and instead lists the updated transport offerings, while the WhatsApp booking button works exactly as before.
