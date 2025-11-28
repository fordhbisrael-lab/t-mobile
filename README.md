# Chrome Dino Game Clone

A fun, installable Progressive Web App (PWA) recreation of the classic Chrome dinosaur game. Jump over obstacles, beat your high score, and enjoy the game offline!

![Chrome Dino Game](https://img.shields.io/badge/game-playable-brightgreen)

## Features

- 🦖 Detailed T-Rex dinosaur character
- 🎮 Smooth jumping mechanics
- 📊 Score tracking with persistent high scores
- 🏃 Progressive difficulty (game speeds up over time)
- 📱 Mobile-friendly with touch controls
- 💾 Installable as a PWA (works offline!)
- ☁️ Animated background clouds
- 🎨 Retro pixel-art style graphics

## How to Play

- Press **SPACE** or **↑ (Up Arrow)** to jump
- Avoid obstacles (cacti) to keep playing
- Your score increases the longer you survive
- Game speed increases as you progress
- Beat your high score!

## Running the Game

### Option 1: Simple Local Server (Recommended for PWA features)

Using Python (if installed):
```bash
python3 -m http.server 8000
```

Using Node.js:
```bash
npx serve
```

Or using PHP:
```bash
php -S localhost:8000
```

Then open your browser and navigate to:
```
http://localhost:8000
```

### Option 2: Direct File Access

Simply open `index.html` directly in your web browser. 

**Note:** PWA features (offline mode, installation) require a server with HTTPS or localhost.

## Installing as a Progressive Web App

1. Serve the game using one of the methods above
2. First, open `generate-icons.html` in your browser to download the app icons
3. Move the downloaded `icon-192.png` and `icon-512.png` files to the project root
4. Open the game in Chrome or Edge
5. Look for the install icon in the address bar (or "Install App" in the menu)
6. Click "Install" to add it to your home screen/applications

The installed app will:
- Work offline
- Launch in its own window
- Appear in your app drawer/start menu
- Feel like a native application

## Project Structure

```
├── index.html           # Main HTML file
├── style.css            # Styling and layout
├── game.js              # Game logic and mechanics
├── manifest.json        # PWA configuration
├── service-worker.js    # Offline functionality
├── generate-icons.html  # Icon generator utility
├── icon-192.png         # App icon (generated)
└── icon-512.png         # App icon (generated)
```

## Technologies Used

- HTML5 Canvas for rendering
- Vanilla JavaScript (no frameworks!)
- CSS3 for styling
- Service Workers for offline support
- Web App Manifest for PWA installation
- LocalStorage for high score persistence

## Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Development

To modify the game:

1. Edit `game.js` for game logic (dino behavior, obstacles, scoring)
2. Edit `style.css` for visual appearance
3. Edit `index.html` for structure
4. Update `manifest.json` to change PWA settings

The game uses a simple game loop with `requestAnimationFrame` for smooth 60fps gameplay.

## License

Free to use and modify for personal or educational purposes.

---

**Have fun playing! 🦖**
