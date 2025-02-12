# 🎬 Netflix GPT

Netflix GPT is a modern, AI-powered movie recommendation platform built with React, Firebase, TMDB API, and GeminiAI API. It allows users to browse trending movies, search for personalized recommendations using GPT, and view detailed movie information via an interactive pop-up modal.

## 🚀 Features

### 🔐 User Authentication
- Sign up and login with Firebase authentication
- Redux state management for user session handling
- Automatic redirection for authenticated users
- User profile management (display name & profile picture update)
- Sign-out functionality with session cleanup

### 🎥 Movie Browsing & Details
- Fetches **Now Playing**, **Popular Movies**, **Upcoming Movies**, **Trending Movies** and **Top Rated Movies** from TMDB API
- Interactive **movie card** UI with smooth hover animations
- Embedded **YouTube trailer player** with autoplay & mute features
- High-quality movie posters & images via TMDB Image CDN

### 🧠 GPT Movie Search
- AI-powered search bar for personalized movie recommendations
- **Multi-language support** with a dynamic language switcher
- Uses GeminiAI API to suggest movies based on user queries
- Redux-based gptSlice for efficient data handling
- Reusable **Movie List & Movie Card** components for consistent UI

### 🎨 Advanced UI/UX
- **Tailwind CSS** for sleek & responsive design
- **Framer Motion** for smooth transitions & animations
- **Glassmorphism effects** and **hover transformations**
- Mobile-first design optimized for all screen sizes

### 📌 Pop-up Modal Feature
- Displays **detailed movie information** in an animated modal
- Includes:
  - Movie poster, title, overview, release date, and rating
  - **Streaming platform icons** (OTT availability)
  - **Top 5 cast members** with profile images
  - **"Watch Trailer" button** linked to YouTube
- **Smooth open/close animations** and full-screen overlay
- Adaptive **responsive layout** (side-by-side for desktop, stacked for mobile)

---

## 🛠️ Technologies Used
- **React** – Component-based UI framework
- **Tailwind CSS** – Utility-first CSS for styling
- **Redux Toolkit** – State management (userSlice, movieSlice, gptSlice)
- **Firebase** – Authentication & user session handling
- **React Router** – Navigation & route management
- **Framer Motion** – UI animations & transitions
- **TMDB API** – Movie database for fetching movie lists & trailers
- **GeminiAI API** – GPT-powered movie recommendations

---

🎯 Usage
🔹 Authentication
Users can sign up or log in using Firebase authentication.
After authentication, users are redirected to the Browse page where movies are displayed.
🔹 Movie Browsing
View trending movies fetched from TMDB.
Click on a movie card to open a detailed pop-up modal.
🔹 GPT Movie Search
Enter a query in the GPT search bar to receive movie recommendations.
Select a preferred language for multi-language support.

---

👥 Contributing
Contributions are welcome! If you have ideas for improvements or bug fixes, feel free to open an issue or submit a pull request.

📜 License
This project is open-source and available under the MIT License.

Netflix GPT is an AI-powered movie discovery platform that blends advanced UI/UX design, interactive pop-ups, and AI-generated movie recommendations. It's a great showcase of modern web development practices.

💻 Happy Coding! 🚀

---