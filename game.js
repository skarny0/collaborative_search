// ------------------------------------------------------------------------------------------------------------------------//
// Initialitize Game Environments

// Get the main game canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Get the mini-map canvas and context
const miniMapCanvas = document.getElementById('miniMapCanvas');
const miniMapCtx = miniMapCanvas.getContext('2d');

// Get the score canvas and context
const scoreCanvas = document.getElementById('scoreCanvas');
const scoreCtx = scoreCanvas.getContext('2d'); // This should be 'scoreCtx', not 'scoreCanvas'


// Define the game world boundaries
const world = {
  width: 2400, // Example width, you can set it as needed
  height: 2400 // Example height, you can set it as needed
};

// Mini-map configuration
const miniMap = {
  width: 150,
  height: 100,
  scale: 0.1, // Scale of the mini-map compared to the main canvas
  x: canvas.width - 150,
  y: canvas.height - 100
};

// ------------------------------------------------------------------------------------------------------------------------//

// Function to generate a random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256); // Random between 0-255
  const g = Math.floor(Math.random() * 256); // Random between 0-255
  const b = Math.floor(Math.random() * 256); // Random between 0-255
  return `rgb(${r}, ${g}, ${b})`; // Construct an RGB color string
}

let objects = [];

// Define the number of dummy objects you want
const numberDummies = 50; // Example number

// Function to create a dummy object
function createDummy() {
  return {
    x: Math.random() * world.width, // Random position within the world
    y: Math.random() * world.height,
    vx: Math.random() * 4 - 2, // Random velocity between -2 and 2
    vy: Math.random() * 4 - 2,
    color: 'red', // getRandomColor(), // Dummy objects will be grey
    speed: 2, // Same speed as labeled objects for simplicity
    label: ''
  };
}

// Create dummy objects and add them to the objects array
for (let i = 0; i < numberDummies; i++) {
  objects.push(createDummy());
}

const numberTargets = 5;

function getFirstTarget(){
  return {
    x: Math.random() * world.width,
    y: Math.random() * world.height,
    vx: 1,
    vy: 0,
    color: 'red',
    speed: 2,
    label: 'A'
  }
}

function getSecondTarget(){
  return{
    x: Math.random() * world.width,
    y: Math.random() * world.height,
    vx: 0,
    vy: 1,
    color: 'red',
    speed: 2,
    label: 'B'
  }
}

// Create dummy objects and add them to the objects array
for (let i = 0; i < numberTargets; i++) {
  objects.push(getFirstTarget());
}

for (let i = 0; i < numberTargets; i++) {
  objects.push(getSecondTarget());
}

// ------------------------------------------------------------------------------------------------------------------------//

// Player object
const player = { x: canvas.width / 2, y: canvas.height / 2, speed: 1.5 };

// // Function to draw the player
function drawPlayer() {
  ctx.fillStyle = 'green';
  // Draw the player in the center of the canvas
  ctx.fillRect(canvas.width / 2 - 10, canvas.height / 2 - 10, 20, 20);
}

// Camera configuration
const camera = {
  x: player.x - canvas.width / 2,
  y: player.y - canvas.height / 2,
  width: canvas.width,
  height: canvas.height
};

// Update the camera position to follow the player
function updateCamera() {
  camera.x = player.x - canvas.width / 2;
  camera.y = player.y - canvas.height / 2;
}

// ------------------------------------------------------------------------------------------------------------------------//

// Draw Grid function
function drawGrid() {
  // Begin path for grid lines
  ctx.beginPath();
  ctx.strokeStyle = '#CCCCCC';

  // Calculate the start and end points for the grid lines
  const leftmostLine = camera.x - (camera.x % 100);
  const topmostLine = camera.y - (camera.y % 100);

  // Vertical lines
  for (let x = leftmostLine; x < camera.x + canvas.width; x += 100) {
    ctx.moveTo(x - camera.x, 0);
    ctx.lineTo(x - camera.x, canvas.height);
  }

  // Horizontal lines
  for (let y = topmostLine; y < camera.y + canvas.height; y += 100) {
    ctx.moveTo(0, y - camera.y);
    ctx.lineTo(canvas.width, y - camera.y);
  }

  // Stroke the grid lines
  ctx.stroke();
}

// Global variables to hold mini-map viewport details
let miniMapViewport = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};

// Draw the mini-map
function drawMiniMap() {
  // These variables must be defined in this scope as well
  const scaleX = miniMapCanvas.width / world.width;
  const scaleY = miniMapCanvas.height / world.height;

  // Clear the mini-map
  miniMapCtx.clearRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);

  // Draw the mini-map background
  miniMapCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  miniMapCtx.fillRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);

  // Draw the player's location on the mini-map as a yellow dot
  const playerX = player.x * scaleX;
  const playerY = player.y * scaleY;
  miniMapCtx.fillStyle = 'yellow';
  miniMapCtx.beginPath();
  miniMapCtx.arc(playerX, playerY, 2, 0, Math.PI * 2);
  miniMapCtx.fill();

  // Draw the circular viewport on the mini-map
  const observableRadiusOnMiniMap = 400 * scaleX; // Assuming scaleX and scaleY are about the same
  miniMapCtx.strokeStyle = 'white';
  miniMapCtx.beginPath();
  miniMapCtx.arc(playerX, playerY, observableRadiusOnMiniMap, 0, Math.PI * 2);
  miniMapCtx.stroke();
}

// Update MiniMap function
function updateMiniMap() {
  // Calculate scale factors for the mini-map
  const scaleX = miniMapCanvas.width / world.width;
  const scaleY = miniMapCanvas.height / world.height;
}

// ------------------------------------------------------------------------------------------------------------------------//
// Handling object movement & motion

// Key press state
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

// Event listeners for key presses
window.addEventListener('keydown', function(event) {
  keys[event.key] = true;
});

window.addEventListener('keyup', function(event) {
  keys[event.key] = false;
});

function updatePlayerPosition() {
  if (keys.ArrowUp) player.y = Math.max(player.y - player.speed, 0);
  if (keys.ArrowDown) player.y = Math.min(player.y + player.speed, world.height);
  if (keys.ArrowLeft) player.x = Math.max(player.x - player.speed, 0);
  if (keys.ArrowRight) player.x = Math.min(player.x + player.speed, world.width);
}

// Helper function to generate a random angle in radians
function getRandomAngle() {
  return Math.random() * 2 * Math.PI; // Random angle between 0 and 2π
}

// Helper function to update an object's velocity based on a random angle
function tumble(obj) {
  let angle = getRandomAngle();
  obj.vx = Math.cos(angle) * obj.speed;
  obj.vy = Math.sin(angle) * obj.speed;
}

// Define the size of the cubes (assuming they are square)
const cubeSize = 20;

// Update the objects' positions to make them move with run-and-tumble behavior
function updateObjects() {
  objects.forEach(obj => {
    // Update the position
    obj.x += obj.vx;
    obj.y += obj.vy;

    // Check for collision with the walls and tumble if needed
    if (obj.x < cubeSize / 2 || obj.x > world.width - cubeSize / 2 || obj.y < cubeSize / 2 || obj.y > world.height - cubeSize / 2) {
      tumble(obj); // Change direction randomly

    }

    // Additionally, randomly decide if the object should tumble
    if (Math.random() < 0.01) { // 1% chance to tumble each frame
      tumble(obj);
    }

    // Keep the object within the game world boundaries
    obj.x = Math.max(cubeSize / 2, Math.min(world.width - cubeSize / 2, obj.x));
    obj.y = Math.max(cubeSize / 2, Math.min(world.height - cubeSize / 2, obj.y));
  });
}

// Initialize objects with a speed and a random direction
objects.forEach(obj => {
  obj.speed = 1; // Adjust speed as needed
  tumble(obj); // Give it an initial random direction
});
// ------------------------------------------------------------------------------------------------------------------------//
// Handle Collisions

let score = 0;  // Initialize the player's score

function checkCollision(obj) {
  // Assuming the player object has a size, and the center of the player is at (player.x, player.y)
  const playerSize = 20;  // The size of the player, adjust as needed
  const halfPlayerSize = playerSize / 2;
  
  // Check for collision with an object labeled 'A', can be with other objects
  if (obj.label === 'A' && 
      player.x < obj.x + halfPlayerSize &&
      player.x + halfPlayerSize > obj.x &&
      player.y < obj.y + halfPlayerSize &&
      player.y + halfPlayerSize > obj.y) {
    // Collision detected, increment the score
    console.log("Caught A!");
    score += 10;
    
    // Optionally, remove the object from the game or handle it as needed
    // For example, you could set a flag on the object to not render it anymore
    obj.active = false;
  }
}

function drawScore() {
  scoreCtx.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height); // Clear the score canvas
  scoreCtx.font = '16px Roboto';
  scoreCtx.fillStyle = 'black'; // Choose a color that will show on your canvas
  scoreCtx.fillText('Score: ' + score, 10, 20); // Adjust the positioning as needed
}

// ------------------------------------------------------------------------------------------------------------------------//

function drawMask(ctx, player) {
  // The mask is centered on the canvas, which is the player's constant position on the screen
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const maskRadius = 400; // This is the radius of the mask's visible area

  // Save the current context state
  ctx.save();

  // Clear any previous mask
  ctx.globalCompositeOperation = 'destination-in';

  // Begin path for a circular mask
  ctx.beginPath();
  ctx.arc(centerX, centerY, maskRadius, 0, Math.PI * 2, false);
  ctx.fill();

  // Reset the composite operation to default
  ctx.globalCompositeOperation = 'source-over';

  // Restore the context to its previous state
  ctx.restore();
}

// ------------------------------------------------------------------------------------------------------------------------//

// Game loop
function gameLoop() {
  // Update the player's 
  updatePlayerPosition();
  
  // Update the camera based on the player's new position
  updateCamera();

  // Update objects' positions
  updateObjects();

  // Update the mini-map calculations
  updateMiniMap();

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the fixed grid based on the camera's position
  drawGrid();

  // Translate the canvas context to keep the player in the center
  ctx.save();

  ctx.translate(-player.x + canvas.width / 2, -player.y + canvas.height / 2);

  // Draw the game world boundary
  ctx.strokeStyle = 'grey';
  ctx.strokeRect(0, 0, world.width, world.height);

  // Draw objects relative to player's position
  objects.forEach(obj => {
    if (objects.active !== false){
      ctx.fillStyle = obj.color;
      ctx.fillRect(obj.x, obj.y, 20, 20);
      
      // Draw label
      ctx.font = '16px Roboto';
      ctx.fillStyle = 'white';
      ctx.fillText(obj.label, obj.x + 5, obj.y + 16);

      checkCollision(obj);
    }
  });
  
  // // Filter out inactive objects so they are no longer rendered or updated
  objects = objects.filter(obj => obj.active !== false);

  // Draw Mini-Map
  drawMiniMap();

  // Draw the score
  drawScore();

  ctx.restore();

  // Draw the player
  drawPlayer(ctx, player, camera);

  // Reset transformation before drawing player
  drawMask(ctx, player);

  // Loop the game
  requestAnimationFrame(gameLoop);

  //ctx.restore();
}

// Start the game loop
gameLoop();