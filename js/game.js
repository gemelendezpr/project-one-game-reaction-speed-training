const circles = document.querySelectorAll('.circle');
const startButton = document.getElementById('start-button');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');

let score = 0;
let lives = 3;
let isGameRunning = false;

// Function to reset the game state
function resetGame() {
  score = 0;
  lives = 3;
  updateScoreAndLives();
}

// Function to update the score and lives on the screen
function updateScoreAndLives() {
  scoreElement.textContent = `Score: ${score}`;
  livesElement.textContent = `Lives: ${lives}`;
}

// Function to handle the click on a circle
function handleCircleClick(event) {
  if (!isGameRunning) return; // Ignore clicks if the game is not running

  const clickedCircle = event.target;

  if (clickedCircle.classList.contains('pattern-1')) {
    score++;
    activateRandomCircle(); // Activate another random circle
  } else {
    lives--;

    if (lives === 0) {
      alert('Game Over! You lost all your lives.');
      resetGame();
    } else {
      activateRandomCircle(); // Activate another random circle
    }
  }

  updateScoreAndLives();
}

// Function to activate a random circle
function activateRandomCircle() {
  const inactiveCircles = Array.from(circles).filter(circle => !circle.classList.contains('pattern-1'));
  
  if (inactiveCircles.length > 0) {
    const randomIndex = Math.floor(Math.random() * inactiveCircles.length);
    const randomCircle = inactiveCircles[randomIndex];
    
    // Activate the circle by adding the pattern-1 class
    randomCircle.classList.add('pattern-1');
    
    // Remove the pattern-1 class after a delay (adjust as needed)
    setTimeout(() => {
      randomCircle.classList.remove('pattern-1');
    }, 1000); // 1000 milliseconds = 1 second
    
    // Attach the click event listener to the activated circle
    randomCircle.addEventListener('click', handleCircleClick);
  } else {
    // If all circles are active, end the game or proceed to the next level
    alert('Congratulations! You completed the level.');
    resetGame();
  }
}

// ... (previous code)

// Variable to store the remaining time
let remainingTime = 60; // Set the initial time (60 seconds)

// Function to update the timer
function updateTimer() {
  const timerElement = document.getElementById('timer');
  timerElement.textContent = `Time: ${remainingTime}s`;
}

// Function to start the game
function startGame() {
  isGameRunning = true;
  resetGame();

  // Activate the first random circle
  activateRandomCircle();

  // Disable the start button during the game
  startButton.disabled = true;

  // Update the timer every second
  const timerInterval = setInterval(() => {
    remainingTime--;
    updateTimer();

    // If time is up, end the game
    if (remainingTime <= 0) {
      clearInterval(timerInterval);

      // Check if the player won or lost based on remaining lives
      if (lives > 0) {
        alert(`Congratulations! You won with a score of ${score}.`);
      } else {
        alert(`Time's up! You lost all your lives. Your final score is ${score}.`);
      }

      isGameRunning = false;
      resetGame();
      startButton.disabled = false;
    }
  }, 1000); // 1000 milliseconds = 1 second
}

// ... (remaining code)


// Add a click event listener to the start button
startButton.addEventListener('click', () => {
  startGame();
});
