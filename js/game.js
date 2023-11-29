const circles = document.querySelectorAll(".circle");
const startButton = document.getElementById("main-start-button");
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const instructionsPage = document.getElementById("instructions-page");

let timerInterval;

let score = 0;
let lives = 3;
let isGameRunning = false;

let goodSound = new Audio("./sound/Laser_00.mp3");
let badSound = new Audio("./sound/alert.ogg");

let level = 1;

let timeLeftPattern1 = 2000;
let timeLeftPattern2 = 1000;

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

function handleGoodClick() {
  goodSound.currentTime = 0;
  goodSound.play();
}

let activateNewPattern = true;
// Clicks on circles
function handleCircleClick(event) {
  if (!isGameRunning) return; // Ignoring clicks if the game is not running

  const clickedCircle = event.target;

  if (clickedCircle.classList.contains("pattern-1")) {
    score++;
    clickedCircle.classList.remove("pattern-1");
    handleGoodClick();
    // Logic to decrease timeleft on active circles
    /* if (score % 10 === 0) {
      level++;
      timeLeft -= 500;
      console.log("Time left ===>", timeLeft);
      if (timeLeft === 1000) {
        alert("You're super fast!!!");
      }
    }*/
  } else {
    //Now the the pattern-3 don't appears once the game has been restarted
    clickedCircle.classList.contains("pattern-2");

    clickedCircle.classList.add("pattern-3");

    setTimeout(() => {
      clickedCircle.classList.remove("pattern-3");
    }, 500);

    console.log("Clicking empty");
    lives--;

    badSound.currentTime = 0;
    badSound.play();

    if (lives === 0) {
      gameOver();
      alert(
        `Game Over! You lost all your lives.  Your final score was ${score}.`
      );
      //resetGame();
    } /*else {
      setTimeout(() => {
        clickedCircle.classList.remove("pattern-3");
      }, 1000);
    }*/
  }
  activateRandomCircle();
  activatePattern2();

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
    }, timeLeftPattern1); // 1 second (I can modified it for different levels, now established on timeLeftPattern1)

    //randomCircle.addEventListener('click', handleCircleClick);
  } else {
    alert(
      `Congratulations! You completed the level.  Your score for the level was ${score}.`
    );
    resetGame();
  }
}

// Activate pattern-2
function activatePattern2() {
  const inactiveCircles = Array.from(circles).filter(
    (circle) => !circle.classList.contains("pattern-2")
  );

  if (inactiveCircles.length > 0) {
    const randomIndex = Math.floor(Math.random() * inactiveCircles.length);
    const randomCircle = inactiveCircles[randomIndex];

    randomCircle.classList.add("pattern-2");

    setTimeout(() => {
      randomCircle.classList.remove("pattern-2");
    }, timeLeftPattern2);
  } else {
    // Add a diferent logic for pattern-2 ?
  }
}

// Timer

function updateTimer() {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = `Time: ${remainingTime}s`;
}

function startGame() {
    // Once the game start the instructions are hided
    instructionsPage.style.display = "none";

    // The background music its still playing for instructions
    //backgroundMusic.pause();

    // The game screen its enable
    document.getElementById("game-screen").style.display = "grid";

    // Play background music for the game
    backgroundMusic.play();

    // The game start logic in game.js its triggered
    initGame();
  }

// Start the game
function initGame() {
  isGameRunning = true;
  resetGame();

  activateRandomCircle();
  activatePattern2();

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

        // Show the winning page
        document.getElementById("winning-page").style.display = "block";
      } else {
        alert(
          `Time's up! You lost all your lives. Your final score is ${score}.`
        );

        // Show the losing page
        document.getElementById("losing-page").style.display = "block";
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

  // Show the losing page
  document.getElementById("losing-page").style.display = "block";
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
