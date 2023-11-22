const circles = document.querySelectorAll(".circle");
const startButton = document.getElementById("start-button");
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");

let timerInterval;

let score = 0;
let lives = 3;
let isGameRunning = false;

let goodSound = new Audio("sound/Laser_00.mp3");
let badSound = new Audio("sound/alert.ogg");

let level = 1;

let timeLeft = 3000;

let remainingTime = 60;

function resetGame() {
  score = 0;
  lives = 3;
  remainingTime = 60;
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

  if (clickedCircle.classList.contains("pattern-1")) {
    score++;
    clickedCircle.classList.remove("pattern-1");

    goodSound.currentTime = 0;
    goodSound.play();

    if (score % 10 === 0) {
      level++;
      timeLeft -= 500;
      console.log("Time left ===>", timeLeft);
      if (timeLeft === 1000) {
        alert("You're super fast!!!");
      }
    }

    activateRandomCircle();
  } else {
    console.log("Clicking empty");
    lives--;

    badSound.currentTime = 0;
    badSound.play();

    if (lives === 0) {
      gameOver();
      alert(
        `Game Over! You lost all your lives.  Your final score was ${score}.`
      );
      resetGame();
    }
  }

  updateScoreAndLives();
}

// Activate a random circle
function activateRandomCircle() {
  const inactiveCircles = Array.from(circles).filter(
    (circle) => !circle.classList.contains("pattern-1")
  );

  if (inactiveCircles.length > 0) {
    const randomIndex = Math.floor(Math.random() * inactiveCircles.length);
    const randomCircle = inactiveCircles[randomIndex];

    randomCircle.classList.add("pattern-1");

    setTimeout(() => {
      randomCircle.classList.remove("pattern-1");
    }, timeLeft); // 1 second (I can modified it for different levels)

    // randomCircle.addEventListener('click', handleCircleClick);
  } else {
    alert(
      `Congratulations! You completed the level.  Your score for the level was ${score}.`
    );
    resetGame();
  }
}

// Timer

function updateTimer() {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = `Time: ${remainingTime}s`;
}

// Starting the game
function startGame() {
  isGameRunning = true;
  resetGame();

  activateRandomCircle();

  // Disabling the start button during the game because if its available it just continue to make the pattern faster. It don't start from the beginning.
  startButton.disabled = true;

  // Timer update
  timerInterval = setInterval(() => {
    remainingTime--;
    updateTimer();

    // Times up, end the game
    if (remainingTime <= 0) {
      clearInterval(timerInterval);

      // Player status won or lost based on lives
      if (lives > 0) {
        alert(`Congratulations! You won with a score of ${score}.`);
      } else {
        alert(
          `Time's up! You lost all your lives. Your final score is ${score}.`
        );
      }

      isGameRunning = false;
      resetGame();
      startButton.disabled = false;
    }
  }, 1000); // = 1 second
}

function gameOver() {
  clearInterval(timerInterval);
  startButton.disabled = false;
  remainingTime = 60;
  updateScoreAndLives();
  updateTimer();
}

startButton.addEventListener("click", () => {
  startGame();
});

let allCircles = document.getElementsByClassName("circle");

console.log("Line 129 all circles ===>", allCircles);

for (let i = 0; i < allCircles.length; i++) {
  allCircles[i].addEventListener("click", handleCircleClick);
}

// [...allCircles].forEach((circle) =>)
