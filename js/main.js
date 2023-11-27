document.addEventListener("DOMContentLoaded", function () {
  const mainStartButton = document.getElementById("main-start-button");
  const mainPage = document.getElementById("main-page");
  const backgroundMusic = new Audio("sound/wyver9_Fast Level.wav");

  // Losing Page
  const losingPage = document.getElementById("losing-page");
  const restartLosingButton = document.getElementById("restart-losing-button");

  // Winning Page
  const winningPage = document.getElementById("winning-page");
  const restartWinningButton = document.getElementById("restart-winning-button");

  // Start button
  mainStartButton.addEventListener("click", startGame);

  // Restart buttons
  restartLosingButton.addEventListener("click", restartGame);
  restartWinningButton.addEventListener("click", restartGame);

  function startGame() {
    // Play background music
    backgroundMusic.play()

    // Hide main page
    mainPage.style.display = "none";

    // Trigger the game start logic in game.js
    initGame();
  }

  function restartGame() {
    // Stop background music
    backgroundMusic.pause();

    // Show the main page
    mainPage.style.display = "block";

    // Hide the ending pages
    losingPage.style.display = "none";
    winningPage.style.display = "none";

    // Pending... Add different logic to reset the game
  }

  // Background music loop event
  backgroundMusic.addEventListener("ended", function () {
    this.currentTime = 0;
    this.play();
  });
});
