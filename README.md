# Pokémon App 🐾

Een moderne, responsive webapplicatie voor het verkennen van Pokémon, gebouwd met React, TypeScript en moderne webtechnologieën. Deze app maakt gebruik van de [PokeAPI](https://pokeapi.co/) om uitgebreide informatie over Pokémon op te halen en weer te geven.

![Pokemon App Preview](./public/pokemon-manifest.json) <!-- Placeholder voor screenshot -->

## ✨ Features

- **Moderne UI met Glassmorphism Design**: Hedendaagse visuele effecten met blur en transparantie
- **Responsief Ontwerp**: Werkt perfect op desktop, tablet en mobiele apparaten
- **Geoptimaliseerde Data Fetching**: TanStack Query voor efficiënt caching en achtergrond-updates
- **Zoekfunctionaliteit**: Vind snel je favoriete Pokémon
- **Favorieten Systeem**: Bewaar je favoriete Pokémon voor later
- **Dark/Light Thema**: Automatische thema-detectie met handmatige schakelaar
- **Paginatie**: Gemakkelijke navigatie door grote hoeveelheden Pokémon
- **Detailweergave**: Uitgebreide informatie over elke Pokémon inclusief stats, types en evolutieketen

## 🛠️ Technologieën

- **Frontend Framework**: React 19 met TypeScript
- **Build Tool**: Vite voor snelle development en productie-builds
- **Styling**: Tailwind CSS met custom glassmorphism effecten
- **Data Fetching**: TanStack React Query voor geoptimaliseerde API calls
- **Routing**: React Router DOM voor client-side navigatie
- **HTTP Client**: Axios voor API communicatie
- **State Management**: React Context API voor thema en favorieten
- **API**: PokeAPI voor Pokémon data

## 🚀 Installatie

### Vereisten

- Node.js (versie 16 of hoger)
- npm of yarn

### Stappen

1. **Repository klonen**

   ```bash
   git clone https://github.com/HamedSadim1/pokemon-app.git
   cd pokemon-app
   ```

2. **Dependencies installeren**

   ```bash
   npm install
   ```

3. **Development server starten**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   ```text
   http://localhost:5173
   ```

## 📖 Gebruik

### Navigatie

- **Home**: Overzicht van alle Pokémon met paginatie
- **Zoeken**: Gebruik de zoekbalk om Pokémon te vinden op naam
- **Favorieten**: Klik op het hart-icoon om Pokémon toe te voegen/verwijderen
- **Details**: Klik op een Pokémon kaart voor gedetailleerde informatie

### Thema Schakelaar

Gebruik de thema-toggle in de navbar om tussen licht en donker modus te schakelen.

## 🏃‍♂️ Scripts

| Script            | Beschrijving                               |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start development server op localhost:5173 |
| `npm run build`   | Bouw applicatie voor productie             |
| `npm run preview` | Preview productie build lokaal             |

## 📁 Project Structuur

```bash
pokemon-app/
├── public/
│   ├── pokemon-manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Favorites.tsx
│   │   ├── Footer.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Navbar.tsx
│   │   ├── Pagination.tsx
│   │   ├── Pokemon.tsx
│   │   ├── PokemonCard.tsx
│   │   ├── PokemonDetail.tsx
│   │   ├── Root.tsx
│   │   ├── SearchBar.tsx
│   │   └── Services/
│   │       └── IPokemon.ts
│   ├── contexts/
│   │   ├── FavoritesContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/
│   │   ├── usePokemonDetail.ts
│   │   ├── usePokemonList.ts
│   │   └── usePokemonSearch.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── App.tsx
│   ├── index.css
│   └── index.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 Ontwikkeling

### Code Stijl

- **TypeScript**: Strikt getypeerd voor betere ontwikkelervaring
- **JSDoc**: Uitgebreide documentatie in het Nederlands
- **DRY Principes**: Herbruikbare componenten en hooks
- **ESLint**: Code kwaliteit en consistentie

### Custom Hooks

- `usePokemonList`: Ophalen van Pokémon lijsten met caching
- `usePokemonDetail`: Gedetailleerde Pokémon informatie
- `usePokemonSearch`: Zoekfunctionaliteit met debouncing

## 🤝 Bijdragen

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/nieuwe-feature`)
3. Commit je wijzigingen (`git commit -m 'Voeg nieuwe feature toe'`)
4. Push naar de branch (`git push origin feature/nieuwe-feature`)
5. Open een Pull Request

### Richtlijnen

- Volg de bestaande code stijl
- Voeg JSDoc commentaar toe voor nieuwe functies
- Test je wijzigingen grondig
- Update de README indien nodig

## 📄 Licentie

Dit project is ontwikkeld als onderdeel van een schoolopdracht voor AP Hogeschool. Alle rechten voorbehouden.

## 🙏 Credits

- **PokeAPI**: Voor de uitgebreide Pokémon database
- **React Community**: Voor het geweldige React ecosysteem
- **Tailwind CSS**: Voor het utility-first CSS framework

---

**Ontwikkeld door**: Hamed Sadim  
**AP Hogeschool** - Webframeworks Labo 7  
**Datum**: December 2025
