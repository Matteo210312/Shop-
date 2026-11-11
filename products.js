/* =====================================================================
   PRODUKTDATEN – hier verwaltest du alle Produkte.
   Neues Produkt = einen Block { ... } kopieren, Werte ändern, Komma setzen.
   Entfernen = Block löschen.  Alle Texte sind DEMO-Platzhalter.
   WICHTIG (Ehrlichkeit): rating/reviewCount nur mit ECHTEN Bewertungen füllen,
   oldPrice nur bei echter, nachweisbarer Preissenkung, bestseller nur mit echten Verkaufszahlen.
   ===================================================================== */
window.SHOP = {
  brand: "Markenname",            // Platzhalter – später ändern
  tagline: "Ausgewählte Produkte für den Alltag",
  currency: "EUR",
  categories: [
    { id: "wohnen", name: "Wohnen" },
    { id: "technik", name: "Technik" },
    { id: "unterwegs", name: "Unterwegs" }
  ],
  products: [
    { id: "p001", name: "Keramik-Tischlampe Demo", category: "wohnen", price: 59.90, oldPrice: null,
      description: "Demo-Produkt: Schlichte Tischlampe mit mattem Keramikfuß. Beschreibung vor Verkaufsstart durch echte Produktdaten ersetzen.",
      image: "assets/placeholder.svg", rating: null, reviewCount: 0, added: "2026-10-20", bestseller: false, isNew: true },
    { id: "p002", name: "Leinen-Kissenbezug Demo", category: "wohnen", price: 24.00, oldPrice: null,
      description: "Demo-Produkt: Kissenbezug aus Leinenmischung, 45 × 45 cm. Materialangaben bitte prüfen und ergänzen.",
      image: "assets/placeholder.svg", rating: null, reviewCount: 0, added: "2026-08-02", bestseller: true, isNew: false },
    { id: "p003", name: "Duftkerze Demo", category: "wohnen", price: 18.50, oldPrice: null,
      description: "Demo-Produkt: Kerze im Glas. Brenndauer und Inhaltsstoffe laut Hersteller angeben.",
      image: "assets/placeholder.svg", rating: null, reviewCount: 0, added: "2026-09-15", bestseller: false, isNew: true },
    { id: "p004", name: "Kabelloses Ladepad Demo", category: "technik", price: 29.90, oldPrice: null,
      description: "Demo-Produkt: Ladepad für kompatible Geräte. Technische Daten und CE-Kennzeichnung vom Hersteller prüfen.",
      image: "assets/placeholder.svg", rating: null, reviewCount: 0, added: "2026-07-11", bestseller: true, isNew: false },
    { id: "p005", name: "Bluetooth-Lautsprecher Demo", category: "technik", price: 49.00, oldPrice: null,
      description: "Demo-Produkt: Kompakter Lautsprecher. Akkulaufzeit nur mit belegbaren Herstellerangaben nennen.",
      image: "assets/placeholder.svg", rating: null, reviewCount: 0, added: "2026-10-28", bestseller: false, isNew: true },
    { id: "p006", name: "Schreibtisch-Organizer Demo", category: "technik", price: 34.90, oldPrice: null,
      description: "Demo-Produkt: Organizer aus Holz für Schreibtisch und Zubehör.",
      image: "assets/placeholder.svg", rating: null, reviewCount: 0, added: "2026-06-01", bestseller: false, isNew: false },
    { id: "p007", name: "Reiserucksack Demo", category: "unterwegs", price: 79.00, oldPrice: null,
      description: "Demo-Produkt: Rucksack für Alltag und Reisen. Volumen und Maße bitte vom Lieferanten bestätigen lassen.",
      image: "assets/placeholder.svg", rating: null, reviewCount: 0, added: "2026-05-20", bestseller: true, isNew: false },
    { id: "p008", name: "Trinkflasche Edelstahl Demo", category: "unterwegs", price: 22.90, oldPrice: null,
      description: "Demo-Produkt: Isolierte Trinkflasche. Aussagen zur Isolierdauer nur mit Herstellernachweis.",
      image: "assets/placeholder.svg", rating: null, reviewCount: 0, added: "2026-10-05", bestseller: false, isNew: true }
  ]
};
