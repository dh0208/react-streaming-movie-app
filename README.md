# 🎬 MovieStream - React Movie Application

A modern, feature-rich movie streaming web application built with React, TypeScript, and Tailwind CSS. Browse popular movies, search for your favorites, manage your watchlist, and watch trailers!

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- TMDB API key (get one at https://www.themoviedb.org/settings/api)

### Installation

1. **Fix npm cache issues (if needed)**:
   ```bash
   sudo chown -R $(whoami) ~/.npm
   ```

2. **Install dependencies**:
   ```bash
   cd /Users/dhruv/Movie/react-movie-app
   npm install
   ```

   If you encounter issues, try:
   ```bash
   npm cache clean --force
   npm install
   ```

3. **Configure TMDB API**:
   - Open `src/services/tmdb.ts`
   - Replace `'YOUR_TMDB_API_KEY'` with your actual TMDB API key
   - Get your key from: https://www.themoviedb.org/settings/api

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   - The app will automatically open at `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint 

---

## 🔎 Feature Brief

MovieStream provides a compact set of user-facing features focused on discovery and playback:
- Fast search powered by TMDB (type a query and press Enter).
- Browse sections: Popular, Now Playing, Upcoming, and Top Rated.
- Detailed movie pages (overview, cast, trailers).
- Favorites/watchlist management persisted in local storage.
- Responsive UI with lightweight components for a smooth experience on mobile and desktop.

This brief highlights the core capabilities so you can quickly understand what the app offers and where to look when testing or extending functionality.
