# Pokémon App 🐾

Een moderne, responsive Pokémon-applicatie gebouwd met React, TypeScript, Vite en Tailwind CSS. De app gebruikt de [PokeAPI](https://pokeapi.co/) om Pokémon te zoeken, te bekijken en als favoriet op te slaan.

## ✨ Functionaliteiten

- **Pokémon-overzicht** met paginatie
- **Zoeken** binnen de Pokémon van de huidige pagina
- **Detailpagina's** met afbeeldingen, types, abilities, fysieke kenmerken en base stats
- **Favorieten** opslaan in de browser via `localStorage`
- **Light- en dark theme** met automatische systeemvoorkeur en handmatige toggle
- **Responsive design** voor desktop, tablet en mobiel
- **Glassmorphism UI** met animaties en hover-interacties
- **Caching en background updates** via TanStack React Query
- **React Query Devtools** voor development

## 🛠️ Technologieën

- **Frontend:** React 19 en React DOM
- **Taal:** TypeScript 5.9
- **Build tool:** Vite 8
- **Styling:** Tailwind CSS 4 met de Vite-plugin
- **Data fetching:** TanStack React Query
- **Routing:** React Router DOM
- **HTTP client:** Axios
- **API:** PokeAPI
- **Codekwaliteit:** ESLint 10 en TypeScript ESLint
- **Git hooks:** Husky en lint-staged
- **Commitconventie:** Commitlint met Conventional Commits
- **CI:** GitHub Actions

## 🚀 Installatie

### Vereisten

- Node.js 20.19+ of 22.12+

Vite 8 vereist Node.js 20.19+ of 22.12+.
- npm
- Git

### Project lokaal starten

1. Clone de repository:

   ```bash
   git clone https://github.com/HamedSadim1/pokemon-app.git
   cd pokemon-app
   ```

2. Installeer de dependencies:

   ```bash
   npm install
   ```

   Tijdens de installatie initialiseert het `prepare`-script Husky.

3. Start de development server:

   ```bash
   npm run dev
   ```

4. Open de applicatie op [http://localhost:5173](http://localhost:5173).

## 📜 Beschikbare scripts

| Script | Beschrijving |
| --- | --- |
| `npm run dev` | Start de Vite development server. |
| `npm run build` | Bouwt de applicatie voor productie. |
| `npm run preview` | Serveert de production build lokaal. |
| `npm run typecheck` | Controleert TypeScript zonder bestanden te genereren. |
| `npm run lint` | Voert ESLint uit op het volledige project. |
| `npm run lint:staged` | Voert ESLint uit op staged JavaScript- en TypeScript-bestanden. |
| `npm run prepare` | Initialiseert de Husky Git hooks. |

## 🧭 Gebruik

### Navigatie

- **Home:** introductiepagina van de app
- **Pokémon:** overzicht met paginatie en zoekveld
- **Pokémon-detail:** klik op een kaart om uitgebreide informatie te bekijken
- **Favorites:** bekijk of verwijder opgeslagen favorieten
- **Theme toggle:** wissel tussen light en dark theme via de navigatiebalk

### Routes

| Route | Pagina |
| --- | --- |
| `/` | Homepagina |
| `/Pokemon` | Pokémon-overzicht |
| `/Pokemon/:id` | Detailpagina van een Pokémon |
| `/favorites` | Favorietenpagina |

## 🧪 Codekwaliteit en Git workflow

Het project gebruikt automatische controles om consistente code en duidelijke commits te bewaken.

### ESLint

ESLint controleert JavaScript-, TypeScript- en React-code. Het gebruik van expliciete `any` is verboden:

```bash
npm run lint
```

### lint-staged

Bij een commit worden alleen staged JavaScript- en TypeScript-bestanden automatisch gelint via de Husky `pre-commit` hook.

### Commitlint

Commit messages moeten de [Conventional Commits](https://www.conventionalcommits.org/) conventie volgen. Voorbeelden:

```text
feat: voeg favorietenpagina toe
fix: corrigeer theme-initialisatie
docs: update README
ci: voeg commitlint toe aan GitHub Actions
```

De `commit-msg` hook controleert iedere commit automatisch.

### GitHub Actions CI

Bij pushes naar `main` en bij pull requests naar `main` voert GitHub Actions deze controles uit:

1. Dependencies installeren met `npm ci`
2. Commit messages controleren met Commitlint
3. TypeScript controleren
4. ESLint uitvoeren
5. Production build uitvoeren

De workflow staat in `.github/workflows/ci.yml`.

## 📁 Projectstructuur

```text
pokemon-app/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .husky/
│   ├── commit-msg
│   └── pre-commit
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
│   │   ├── FavoritesContextDefinition.ts
│   │   ├── ThemeContext.tsx
│   │   └── ThemeContextDefinition.ts
│   ├── hooks/
│   │   ├── useFavorites.ts
│   │   ├── usePokemonDetail.ts
│   │   ├── usePokemonList.ts
│   │   ├── usePokemonSearch.ts
│   │   └── useTheme.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── App.tsx
│   ├── index.css
│   └── index.tsx
├── commitlint.config.js
├── eslint.config.js
├── lint-staged.config.js
├── package-lock.json
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

### Architectuur

- **Contexts:** `FavoritesContext` en `ThemeContext` beheren globale applicatiestatus.
- **Custom hooks:** `useFavorites` en `useTheme` lezen contextdata uit; de Pokémon-hooks beheren API-data via React Query.
- **Services:** `src/components/Services/IPokemon.ts` bevat de getypeerde PokeAPI-functies en interfaces.
- **Providers:** `App.tsx` configureert de Query Client, theme provider, favorites provider en router.

## 🤝 Bijdragen

1. Maak een feature branch:

   ```bash
   git checkout -b feature/mijn-wijziging
   ```

2. Implementeer de wijziging.
3. Voer de controles lokaal uit:

   ```bash
   npm run typecheck
   npm run lint
   npm run build
   ```

4. Gebruik een Conventional Commit message.
5. Push de branch en open een pull request.

## 📄 Licentie

Dit project werd ontwikkeld als schoolopdracht voor AP Hogeschool binnen Webframeworks Labo 7.

## 🙏 Credits

- [PokeAPI](https://pokeapi.co/) voor de Pokémon-data
- React, Vite, Tailwind CSS en de open-source community

---

**Ontwikkeld door:** Hamed Sadim
**AP Hogeschool — Webframeworks Labo 7**
