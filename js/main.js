document.addEventListener("DOMContentLoaded", function () {
  let timerInterval;
  let score = 0;
  let lives = 3;
  let isGameRunning = false;
  let goodSound = new Audio("./sound/Laser_00.mp3");
  let badSound = new Audio("./sound/alert.ogg");
  let timeLeftPattern1 = 2000;
  let timeLeftPattern2 = 1000;
  let remainingTime = 60;

  const circles = document.querySelectorAll(".circle");
  const startButton = document.getElementById("main-start-button");
  const scoreElement = document.getElementById("score");
  const livesElement = document.getElementById("lives");
  const mainStartButton = document.getElementById("main-start-button");
  const mainPage = document.getElementById("main-page");
  const gameScreen = document.getElementById("game-screen");
  const backgroundMusic = new Audio("sound/wyver9_Fast Level.wav");
  const losingPage = document.getElementById("losing-page");
  const restartLosingButton = document.getElementById("restart-losing-button");
  const winningPage = document.getElementById("winning-page");
  const restartWinningButton = document.getElementById("restart-winning-button");
  const instructionsPage = document.getElementById("instructions-page");

  // start button & restart button
  mainStartButton.addEventListener("click", showInstructions);
  restartLosingButton.addEventListener("click", restartGame);
  restartWinningButton.addEventListener("click", restartGame);

  function showInstructions() {
    mainPage.style.display = "none"; // Hide main page
    instructionsPage.style.display = "block"; // Show instructions page
    setTimeout(startGame, 10000); // Set a timeout to automatically start the game after 10 seconds
  }

  function restartGame() {
    window.location.reload()
  //   backgroundMusic.pause(); // Stop background music
  //   mainPage.style.display = "block"; // Show the main page
  //   losingPage.style.display = "none"; // Hide the ending pages
  //   winningPage.style.display = "none"; // Hide the ending pages
   }

  backgroundMusic.addEventListener("ended", function () { // Background music loop event
    this.currentTime = 0;
    this.play();
  });

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

  function handleCircleClick(event) {
    if (!isGameRunning) return; // Ignoring clicks if the game is not running

    const clickedCircle = event.target;

    if (clickedCircle.classList.contains("pattern-1")) {
      score++;
      clickedCircle.classList.remove("pattern-1");
      handleGoodClick();
    } else {
      clickedCircle.classList.contains("pattern-2");
      clickedCircle.classList.add("pattern-3");

      setTimeout(() => {clickedCircle.classList.remove("pattern-3");}, 500); // Time to remove patter-3 display

      lives--;
      badSound.currentTime = 0;
      badSound.play();

      if (lives === 0) {
        gameOver();
        alert(`Game Over! You lost all your lives.  Your final score was ${score}.`);
      }
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
      }, timeLeftPattern1); //(Can be modified it for different levels)

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
    }
  }

  // Timer

  function updateTimer() {
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `Time: ${remainingTime}s`;
  }

  function startGame() {
    
    instructionsPage.style.display = "none"; // Once the game start the instructions are hided
    gameScreen.style.display = "grid"; // The game screen its enable
    gameScreen.style.zIndex = "9999";
    backgroundMusic.play(); 
    initGame(); // The game start logic in game.js its triggered
  }

  function initGame() { // Start the game
    isGameRunning = true;
    resetGame();
    activateRandomCircle();
    activatePattern2();

    startButton.disabled = true;// Disabling the start button during the game because if its available it just continue to make the pattern faster. It don't start from the beginning.

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

  let allCircles = document.getElementsByClassName("circle");

  for (let i = 0; i < allCircles.length; i++) {
    allCircles[i].addEventListener("click", handleCircleClick);
  }
});
