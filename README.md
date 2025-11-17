# 🎬 MovieStream - React Movie Application

A modern, feature-rich movie streaming web application built with React, TypeScript, and Tailwind CSS. Browse popular movies, search for your favorites, manage your watchlist, and watch trailers!

## ✨ Features

### Authentication
- 🔐 Email/Password registration and login
- 🌐 Social login support (Google, Facebook, Apple)
- 💾 Persistent session storage
- 🔒 Protected routes

### Movie Features
- 🎥 Browse Popular, Now Playing, Upcoming, and Top Rated movies
- 🔍 Search movies by keywords with debounced input
- 📝 Comprehensive movie details (cast, crew, ratings, synopsis, release date, budget, revenue)
- ▶️ Watch movie trailers (YouTube integration)
- ❤️ Add/remove movies to favorites
- 📊 View and manage your favorites list

### Technical Features
- ⚡ High-performance React with TypeScript
- 🎨 Beautiful UI with Tailwind CSS
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎭 Custom reusable components
- 🪝 Custom hooks for forms and inputs
- 🏗️ Clean, maintainable code architecture
- 🎯 TMDB API integration
- 💾 Local storage for data persistence

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

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/              # Authentication components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── SocialLoginButton.tsx
│   ├── common/            # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Loading.tsx
│   │   └── ErrorMessage.tsx
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── movie/             # Movie-related components
│   │   ├── MovieCard.tsx
│   │   ├── MovieGrid.tsx
│   │   ├── MovieSection.tsx
│   │   ├── MovieDetails.tsx
│   │   └── TrailerPlayer.tsx
│   └── favorites/         # Favorites components
│       └── FavoritesList.tsx
├── hooks/                 # Custom React hooks
│   ├── useForm.ts
│   ├── useInput.ts
│   ├── useAuth.ts
│   ├── useMovies.ts
│   ├── useFavorites.ts
│   └── useDebounce.ts
├── pages/                 # Page components
│   ├── AuthPage.tsx
│   ├── HomePage.tsx
│   ├── MovieDetailsPage.tsx
│   ├── FavoritesPage.tsx
│   └── SearchPage.tsx
├── services/              # API and storage services
│   ├── api.ts
│   ├── tmdb.ts
│   └── storage.ts
├── types/                 # TypeScript type definitions
│   ├── auth.types.ts
│   ├── movie.types.ts
│   └── index.ts
├── utils/                 # Utility functions
│   ├── validators.ts
│   └── helpers.ts
├── context/               # React Context providers
│   └── AuthContext.tsx
├── App.tsx                # Main App component
├── main.tsx               # App entry point
└── index.css              # Global styles
```

## 🎨 Design Philosophy

### Code Quality
- **Reusable Components**: All UI elements are modular and reusable
- **Custom Hooks**: Form handling and input management without external libraries
- **Type Safety**: Full TypeScript coverage for better developer experience
- **Clean Architecture**: Separation of concerns with clear folder structure

### User Experience
- **Modern UI**: Dark theme with smooth animations and transitions
- **Responsive Design**: Mobile-first approach, works on all screen sizes
- **Performance**: Optimized with lazy loading, debouncing, and efficient rendering
- **Accessibility**: Proper ARIA labels and semantic HTML

## 🛠️ Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Vite** - Build tool
- **TMDB API** - Movie data

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Features Implemented

✅ Social login (Google, Facebook, Apple)  
✅ Email/password authentication  
✅ Session persistence  
✅ Popular, Now Playing, Upcoming, Top Rated movies  
✅ Movie search with debouncing  
✅ Comprehensive movie details  
✅ Favorites management  
✅ TMDB API integration  
✅ Trailer playback  
✅ React + TypeScript  
✅ High-performance optimizations  
✅ Fully responsive design  
✅ Reusable components  
✅ Custom form hooks  
✅ Clean code structure  
✅ Tailwind CSS styling  
✅ Well-documented code  

## 🔑 Getting Your TMDB API Key

1. Go to https://www.themoviedb.org/
2. Create a free account
3. Go to Settings → API
4. Request an API key (choose "Developer" option)
5. Copy your API key
6. Paste it in `src/services/tmdb.ts`

## 💡 Usage

1. **Register**: Create an account using email/password or social login
2. **Browse**: Explore movies by category (Popular, Now Playing, etc.)
3. **Search**: Use the search bar to find specific movies
4. **Details**: Click on any movie to see full details
5. **Favorites**: Add movies to your favorites with the heart icon
6. **Watch**: Play trailers for available movies

## 🚧 Troubleshooting

### npm install fails
```bash
sudo chown -R $(whoami) ~/.npm
npm cache clean --force
npm install
```

### Port already in use
```bash
# Change port in vite.config.ts or kill the process using port 3000
lsof -ti:3000 | xargs kill
```

### TMDB API not working
- Make sure you've replaced 'YOUR_TMDB_API_KEY' with your actual key
- Check that your API key is active on TMDB dashboard
- The app will work with mock data if API key is not set

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Developer

Built with ❤️ using React, TypeScript, and Tailwind CSS

---

**Note**: This is a front-end application. All data is stored in browser's local storage and will persist across sessions but will be cleared if you clear browser data.
