# GitHub Copilot Instructions

This document provides context and guidelines for GitHub Copilot when working with this repository.

## Project Overview

This is a **Chrome Dino Game Clone** - a Progressive Web App (PWA) recreation of the classic Chrome dinosaur game. The game features a T-Rex character that jumps over obstacles (palm trees), with power-ups, bullets, and score tracking.

## Technology Stack

- **HTML5 Canvas** for game rendering
- **Vanilla JavaScript** (ES6+) - no frameworks
- **CSS3** for styling
- **Service Workers** for offline PWA support
- **Web App Manifest** for PWA installation
- **LocalStorage** for high score persistence

## File Structure

```
├── index.html           # Main HTML file with canvas element
├── style.css            # Styling and layout
├── game.js              # Core game logic and mechanics
├── manifest.json        # PWA configuration
├── service-worker.js    # Offline functionality
├── generate-icons.html  # Icon generator utility
├── trex.png             # T-Rex character sprite
├── palm.png             # Obstacle sprite
├── pop.m4a              # Jump sound effect
├── yumyum.m4a           # Power-up collection sound
```

## Coding Conventions

### JavaScript

- Use `const` and `let` instead of `var`
- Use ES6 class syntax for game objects (e.g., `Obstacle`, `Cloud`, `PowerUp`, `Bullet`)
- Use object literals for singleton entities (e.g., `dino`)
- Use `requestAnimationFrame` for the game loop
- Console logging is acceptable for debugging during development
- Handle audio play failures gracefully with `.catch()`

### Game Architecture

- **Game State Variables**: Use module-level variables for game state (`gameRunning`, `gameOver`, `score`, etc.)
- **Entity Pattern**: Each game entity should have `draw()` and `update()` methods
- **Collision Detection**: Use AABB (Axis-Aligned Bounding Box) collision detection
- **Frame Counter**: Use `frameCount` for timing spawns and animations

### Canvas Drawing

- Clear the canvas at the start of each frame with `ctx.clearRect()`
- Use `fillRect()` for simple shapes
- Use `drawImage()` for sprites with fallback rendering
- Draw elements in back-to-front order (clouds → ground → entities → UI)

### CSS

- Use pixel-based styling for game elements to match the retro aesthetic
- Use `Courier New` or monospace fonts for score display
- Maintain the `#535353` color scheme for game elements

## Game Mechanics

### Key Controls

- **SPACE / Up Arrow**: Jump (start game / restart when game over)
- **Z Key**: Shoot bullet (if power-ups collected)
- **Click/Touch**: Jump on mobile devices

### Game Variables

- `gameSpeed`: Starts at 3, increases by 0.5 every 200 points
- `gravity`: 0.6 (affects jump physics)
- `jumpPower`: -12 (initial upward velocity)

### Entity Spawning

- Obstacles spawn every 100 frames
- Power-ups spawn every 250 frames with 30% probability
- Minimum obstacle distance: 200 pixels

## PWA Requirements

- Service worker must cache all game assets for offline play
- Manifest must include icons at 192x192 and 512x512 sizes
- App should be installable and work in standalone mode

## Development Guidelines

1. Test changes across different browsers (Chrome, Firefox, Safari)
2. Ensure touch controls work on mobile devices
3. Verify PWA installation and offline functionality
4. Keep game performance smooth (target 60fps)
5. Update service worker cache version when assets change

## Audio Handling

- Use short audio files (m4a format)
- Reset audio to start (`audio.currentTime = 0`) before playing
- Set reasonable volume levels (0.5 recommended)
- Handle audio play promise rejections

## Adding New Features

When adding new game entities:

1. Create a class with `constructor()`, `draw()`, and `update()` methods
2. Add collision detection if needed
3. Manage entity lifecycle (spawning, updating, removing)
4. Update the game loop to include the new entity
5. Add to service worker cache if adding new assets
