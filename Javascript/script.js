var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

let playerSize = 10;
let playerPositionX = canvas.width / 2 - playerSize / 2;
let playerPositionY = canvas.height / 2 - playerSize / 2;
let gravity = 0.5; // Adjust gravity for better jumping
let jumpForce = -10; // Initial jump velocity
let velocityX = 0;
let velocityY = 0;
let isJumping = false;
let speed = 2;
let glowIntecity = 10;

let platforms = [
    { x: canvas.width / 2 - 100 / 2, y: canvas.height - 50, width: 100, height: 20 },
    { x: 50, y: canvas.height - 150, width: 150, height: 20 },
    { x: canvas.width - 200, y: canvas.height - 250, width: 120, height: 20 }
];


function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowColor = "yellow";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = glowIntecity;
    ctx.fillStyle = "yellow";
    ctx.fillRect(playerPositionX, playerPositionY, playerSize, playerSize);
    ctx.fillStyle = "purple";
    ctx.shadowColor = "purple";
    ctx.fillRect(280, 100, 10, 50)
}

function drawPlatforms() {
    ctx.fillStyle = "green";
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}
// Initial draw
draw();
// drawPlatforms();


document.addEventListener("keydown", event => {
    if (event.key === " " && !isJumping) {
        velocityY = jumpForce;
        isJumping = true;
    }
    else if (event.key === "a") {
        velocityX = -speed; // Adjust the speed as needed
    }
    else if (event.key === "d") {
        velocityX = speed; // Adjust the speed as needed
    }
});

document.addEventListener("keyup", event => {
    if (event.key === "a" || event.key === "d") {
        velocityX = 0;
    }
});

function update() {
    // Apply gravity
    velocityY += gravity;
    playerPositionY += velocityY;

    // Apply horizontal movement
    playerPositionX += velocityX;

    // Keep player within canvas bounds
    if (playerPositionX < 0) {
        playerPositionX = 0;
    }
    else if (playerPositionX + playerSize > canvas.width) {
        playerPositionX = canvas.width - playerSize;
    }

    // Check if player has landed
    if (playerPositionY + playerSize >= canvas.height) {
        playerPositionY = canvas.height - playerSize;
        velocityY = 0;
        isJumping = false;
    }

    // Redraw canvas
    draw();
    // drawPlatforms();
}

setInterval(update, 1000 / 60); // Update approximately 60 times per second
