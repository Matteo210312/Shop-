# Markenname – Demo-Shop (HTML, CSS, Vanilla JS)

Statische Website ohne Build-System, direkt für GitHub Pages geeignet. Alles ist **Demo**: keine Zahlungen, keine Bestellungen, keine echten Rechtstexte.

## Struktur
```
index.html   Seitenrahmen (Header, Footer)
style.css    Design (Farben/Schrift oben in :root)
script.js    Routing, Produkte, Warenkorb, Checkout-Oberfläche
products.js  ALLE Produkte und Kategorien
legal.js     Platzhalter für Impressum, Datenschutz, AGB usw.
assets/      Bilder (placeholder.svg)
```

## 1. GitHub-Repository erstellen (iPad, Safari)
1. Auf github.com anmelden oder Konto erstellen.
2. Oben rechts „+“ → „New repository“. Namen vergeben (z. B. `mein-shop`), „Public“, „Create repository“.

## 2. Dateien hochladen
1. ZIP in der Dateien-App antippen, sie wird entpackt.
2. Im Repository „Add file“ → „Upload files“. Dateien **und** den Ordner `assets` auswählen bzw. hineinziehen (Ordner ggf. einzeln hochladen: `assets/placeholder.svg`).
3. „Commit changes“.

## 3. GitHub Pages aktivieren
Settings → Pages → Source „Deploy from a branch“ → Branch `main`, Ordner `/ (root)` → Save. Nach ca. 1–2 Minuten erscheint die Adresse `https://DEINNAME.github.io/mein-shop/`.

## 4. Produkte hinzufügen
`products.js` öffnen → Stift-Symbol → einen Produktblock kopieren, ID eindeutig (`p009`), Werte ändern → „Commit changes“. Eigene Bilder in `assets/` hochladen und bei `image` den Pfad eintragen. Bewertungen, Rabatte (`oldPrice`) und `bestseller` nur mit echten, belegbaren Daten verwenden.

## 5. Design ändern
`style.css`: Farben und Schrift im Block `:root`. Markenname und Slogan in `products.js` (`brand`, `tagline`).

## 6. Mehrsprachigkeit (später)
Sichtbare Texte stehen aktuell in `script.js`/`index.html`. Für Englisch: Texte in eine Datei `i18n.js` auslagern (`de`, `en`) und per Funktion `t("key")` einsetzen. Die Vorbereitung ist bewusst einfach gehalten.

## Zahlung (Vorbereitung)
Zahlungen brauchen ein Backend oder einen gehosteten Checkout. Optionen: Stripe Checkout / Payment Links, Mollie, PayPal. Das Frontend sendet nur Produkt-IDs und Mengen; der Server berechnet Preise neu. **Niemals geheime API-Schlüssel in diese Dateien schreiben.**

## AI-Funktionen (Architektur, nicht implementiert)
Alle brauchen ein Backend (z. B. Serverless-Funktion), das den API-Schlüssel geheim hält:
- Produktrecherche / Beschreibungen / Marketingtexte: Aufruf der Claude-API durch dein Backend, Ergebnis wird von dir geprüft und in `products.js` übernommen.
- Support-Assistent: Chat-Widget → Backend → LLM-API, mit Datenschutzhinweis.
- Empfehlungen: Backend nutzt Produktdaten aus `products.js` (oder Datenbank) und liefert IDs zurück.

## Vor dem Verkaufsstart
Rechtstexte (`legal.js`) von einer verantwortlichen erwachsenen Person bzw. Rechtsberatung prüfen lassen (AT/EU: ECG, DSGVO, FAGG, KSchG), Gewerbeanmeldung klären, echte Produkte, Preise, Lieferzeiten und Impressum eintragen.

## Bekannte Grenzen
Kein echtes Checkout, kein Newsletter-Versand, kein Kontaktformular (alles braucht ein Backend). Der Warenkorb liegt nur lokal im Browser.
