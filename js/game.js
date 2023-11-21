const circles = document.querySelectorAll('.circle');
const startButton = document.getElementById('start-button');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');

let score = 0;
let lives = 3;
let isGameRunning = false;

function resetGame() {
  score = 0;
  lives = 3;
  updateScoreAndLives();
}
function updateScoreAndLives() {
  scoreElement.textContent = `Score: ${score}`;
  livesElement.textContent = `Lives: ${lives}`;
}

// Clicks on circles
function handleCircleClick(event) {
  if (!isGameRunning) return; // Ignoring clicks if the game is not running

  const clickedCircle = event.target;

  if (clickedCircle.classList.contains('pattern-1')) {
    score++;
    activateRandomCircle(); 
  } else {
    lives--;

    if (lives === 0) {
      alert('Game Over! You lost all your lives.');
      resetGame();
    } else {
      activateRandomCircle(); 
    }
  }

  updateScoreAndLives();
}

// Activate a random circle
function activateRandomCircle() {
  const inactiveCircles = Array.from(circles).filter(circle => !circle.classList.contains('pattern-1'));

  if (inactiveCircles.length > 0) {
    const randomIndex = Math.floor(Math.random() * inactiveCircles.length);
    const randomCircle = inactiveCircles[randomIndex];

    randomCircle.classList.add('pattern-1');

    setTimeout(() => {
      randomCircle.classList.remove('pattern-1');
    }, 800); // 1 second

    
    randomCircle.addEventListener('click', handleCircleClick);
  } else {
    alert('Congratulations! You completed the level.');
    resetGame();
  }
}

// Timer
let remainingTime = 60;

function updateTimer() {
  const timerElement = document.getElementById('timer');
  timerElement.textContent = `Time: ${remainingTime}s`;
}

// Starting the game
function startGame() {
  isGameRunning = true;
  resetGame();

  activateRandomCircle();

  // Disabling the start button during the game
  startButton.disabled = true;

  // Timer update
  const timerInterval = setInterval(() => {
    remainingTime--;
    updateTimer();

    // Times up, end the game
    if (remainingTime <= 0) {
      clearInterval(timerInterval);

      // Player status won or lost based on lives
      if (lives > 0) {
        alert(`Congratulations! You won with a score of ${score}.`);
      } else {
        alert(`Time's up! You lost all your lives. Your final score is ${score}.`);
      }

      isGameRunning = false;
      resetGame();
      startButton.disabled = false;
    }
  }, 1000); // = 1 second
}

startButton.addEventListener('click', () => {
  startGame();
});
