const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let gameRunning = false;
let gameOver = false;
let score = 0;
let highScore = localStorage.getItem('dinoHighScore') || 0;
let animationId;
let gameSpeed = 5;
let gravity = 0.6;

// Update high score display
document.getElementById('highScore').textContent = String(highScore).padStart(5, '0');

console.log('Game initialized. gameRunning:', gameRunning, 'gameOver:', gameOver);

// Dino object
const dino = {
  x: 50,
  y: 150,
  width: 40,
  height: 44,
  dy: 0,
  jumpPower: -12,
  grounded: false,
  jumping: false,

  draw() {
    ctx.fillStyle = '#535353';
    const legOffset = Math.floor(score / 5) % 2 === 0 ? 0 : 3;

    // Body (main torso)
    ctx.fillRect(this.x + 6, this.y + 10, 28, 24);

    // Neck
    ctx.fillRect(this.x + 28, this.y + 4, 6, 16);

    // Head
    ctx.fillRect(this.x + 28, this.y, 16, 10);
    ctx.fillRect(this.x + 34, this.y - 4, 10, 8);

    // Snout/mouth
    ctx.fillRect(this.x + 40, this.y + 2, 4, 4);

    // Eye
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x + 36, this.y + 1, 3, 3);
    ctx.fillStyle = '#000';
    ctx.fillRect(this.x + 37, this.y + 1, 2, 2);

    // Tail
    ctx.fillStyle = '#535353';
    ctx.fillRect(this.x, this.y + 14, 8, 6);
    ctx.fillRect(this.x - 4, this.y + 10, 6, 6);
    ctx.fillRect(this.x - 6, this.y + 6, 4, 6);

    // Arms (tiny T-Rex arms)
    ctx.fillRect(this.x + 26, this.y + 18, 3, 8);
    ctx.fillRect(this.x + 26, this.y + 24, 4, 2);

    // Legs (with animation)
    if (!this.grounded) {
      // Both legs together when jumping
      ctx.fillRect(this.x + 10, this.y + 34, 6, 10);
      ctx.fillRect(this.x + 22, this.y + 34, 6, 10);
    } else {
      // Alternating legs when running
      ctx.fillRect(this.x + 10, this.y + 34 - legOffset, 6, 10 + legOffset);
      ctx.fillRect(this.x + 22, this.y + 34 + legOffset, 6, 10 - legOffset);
    }

    // Feet
    ctx.fillRect(this.x + 8, this.y + 44, 8, 2);
    ctx.fillRect(this.x + 20, this.y + 44, 8, 2);
  },

  update() {
    // Apply gravity
    if (this.y < 150) {
      this.dy += gravity;
      this.grounded = false;
    } else {
      this.dy = 0;
      this.y = 150;
      this.grounded = true;
      this.jumping = false;
    }

    this.y += this.dy;
  },

  jump() {
    console.log('Jump called! grounded:', this.grounded, 'jumping:', this.jumping);
    if (this.grounded && !this.jumping) {
      this.dy = this.jumpPower;
      this.jumping = true;
      console.log('JUMP! dy set to:', this.dy);
    } else {
      console.log('Cannot jump - conditions not met');
    }
  }
};

// Obstacle class
class Obstacle {
  constructor() {
    this.x = canvas.width;
    this.y = 150;
    this.width = 20;
    this.height = 40 + Math.random() * 20;
    this.speed = gameSpeed;
  }

  draw() {
    ctx.fillStyle = '#535353';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x -= this.speed;
  }
}

// Cloud class (background decoration)
class Cloud {
  constructor() {
    this.x = canvas.width + Math.random() * 200;
    this.y = 20 + Math.random() * 60;
    this.width = 40 + Math.random() * 20;
    this.height = 20;
    this.speed = 1;
  }

  draw() {
    ctx.fillStyle = '#d3d3d3';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillRect(this.x + 10, this.y - 8, this.width - 20, this.height);
  }

  update() {
    this.x -= this.speed;
    if (this.x + this.width < 0) {
      this.x = canvas.width;
      this.y = 20 + Math.random() * 60;
    }
  }
}

// Game arrays
let obstacles = [];
let clouds = [new Cloud(), new Cloud(), new Cloud()];
let frameCount = 0;

// Collision detection
function checkCollision(dino, obstacle) {
  return (
    dino.x < obstacle.x + obstacle.width &&
    dino.x + dino.width > obstacle.x &&
    dino.y < obstacle.y + obstacle.height &&
    dino.y + dino.height > obstacle.y
  );
}

// Spawn obstacles
function spawnObstacle() {
  const minDistance = 200;
  const lastObstacle = obstacles[obstacles.length - 1];

  if (!lastObstacle || canvas.width - lastObstacle.x > minDistance) {
    obstacles.push(new Obstacle());
  }
}

// Update score
function updateScore() {
  if (gameRunning && !gameOver) {
    score++;
    document.getElementById('currentScore').textContent = String(Math.floor(score / 10)).padStart(5, '0');

    // Increase difficulty
    if (score % 200 === 0) {
      gameSpeed += 0.5;
    }
  }
}

// Draw ground
function drawGround() {
  ctx.strokeStyle = '#535353';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 194);
  ctx.lineTo(canvas.width, 194);
  ctx.stroke();

  // Dashed ground pattern
  ctx.setLineDash([10, 10]);
  const offset = (frameCount * gameSpeed) % 20;
  ctx.beginPath();
  ctx.moveTo(-offset, 196);
  ctx.lineTo(canvas.width, 196);
  ctx.stroke();
  ctx.setLineDash([]);
}

// Game over screen
function drawGameOver() {
  ctx.fillStyle = '#535353';
  ctx.font = 'bold 30px Courier New';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);

  ctx.font = '16px Courier New';
  ctx.fillText('Press SPACE to restart', canvas.width / 2, canvas.height / 2 + 20);
}

// Draw start screen
function drawStartScreen() {
  ctx.fillStyle = '#535353';
  ctx.font = '20px Courier New';
  ctx.textAlign = 'center';
  ctx.fillText('Press SPACE to Start', canvas.width / 2, canvas.height / 2);
}

// Reset game
function resetGame() {
  obstacles = [];
  score = 0;
  gameSpeed = 5;
  frameCount = 0;
  dino.y = 150;
  dino.dy = 0;
  dino.jumping = false;
  dino.grounded = false;
  gameOver = false;
  document.getElementById('currentScore').textContent = '00000';
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw clouds
  clouds.forEach(cloud => {
    cloud.update();
    cloud.draw();
  });

  // Draw ground
  drawGround();

  if (!gameRunning) {
    dino.draw();
    drawStartScreen();
    animationId = requestAnimationFrame(gameLoop);
    return;
  }

  if (gameOver) {
    dino.draw();
    obstacles.forEach(obstacle => obstacle.draw());
    drawGameOver();
    animationId = requestAnimationFrame(gameLoop);
    return;
  }

  // Update and draw dino
  dino.update();
  dino.draw();

  // Spawn obstacles
  frameCount++;
  if (frameCount % 100 === 0) {
    spawnObstacle();
  }

  // Update and draw obstacles
  obstacles.forEach((obstacle, index) => {
    obstacle.update();
    obstacle.draw();

    // Check collision
    if (checkCollision(dino, obstacle)) {
      gameOver = true;
      gameRunning = false;

      // Update high score
      const finalScore = Math.floor(score / 10);
      if (finalScore > highScore) {
        highScore = finalScore;
        localStorage.setItem('dinoHighScore', highScore);
        document.getElementById('highScore').textContent = String(highScore).padStart(5, '0');
      }
    }

    // Remove off-screen obstacles
    if (obstacle.x + obstacle.width < 0) {
      obstacles.splice(index, 1);
    }
  });

  // Update score
  updateScore();

  animationId = requestAnimationFrame(gameLoop);
}

// Event listeners
document.addEventListener('keydown', (e) => {
  console.log('Key pressed:', e.code, 'gameRunning:', gameRunning, 'gameOver:', gameOver);

  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault();
    console.log('Space/Arrow detected!');

    if (!gameRunning && !gameOver) {
      // Start game
      console.log('Starting game...');
      gameRunning = true;
    } else if (gameOver) {
      // Restart game
      console.log('Restarting game...');
      resetGame();
      gameRunning = true;
    } else if (gameRunning) {
      // Jump during game
      console.log('Attempting to jump...');
      dino.jump();
    }
  }
});

// Touch/click support for mobile
canvas.addEventListener('click', () => {
  if (!gameRunning && !gameOver) {
    gameRunning = true;
  } else if (gameOver) {
    resetGame();
    gameRunning = true;
  } else if (gameRunning) {
    dino.jump();
  }
});

// Initial draw
console.log('Starting game loop...');
gameLoop();
