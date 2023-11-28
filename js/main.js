document.addEventListener("DOMContentLoaded", function () {
  const mainStartButton = document.getElementById("main-start-button");
  const mainPage = document.getElementById("main-page");
  const backgroundMusic = new Audio("sound/wyver9_Fast Level.wav");

  // Losing Page
  const losingPage = document.getElementById("losing-page");
  const restartLosingButton = document.getElementById("restart-losing-button");

  // Winning Page
  const winningPage = document.getElementById("winning-page");
  const restartWinningButton = document.getElementById(
    "restart-winning-button"
  );

  // Instructions Page
  const instructionsPage = document.getElementById("instructions-page");

  // Start button
  mainStartButton.addEventListener("click", showInstructions);

  // Restart buttons
  restartLosingButton.addEventListener("click", restartGame);
  restartWinningButton.addEventListener("click", restartGame);

  function showInstructions() {
    console.log('hittingButton')
    // Hide main page
    mainPage.style.display = "none";

    // Show instructions page
    instructionsPage.style.display = "block";

    // Play background music for instructions
    //backgroundMusic.play();

    // Set a timeout to automatically start the game after 10 seconds
    setTimeout(startGame, 10000);
  }

  function startGame() {
    console.log("Function called")
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

  function restartGame() {
    // Stop background music
    backgroundMusic.pause();

    // Show the main page
    mainPage.style.display = "block";

    // Hide the ending pages
    losingPage.style.display = "none";
    winningPage.style.display = "none";

    // Maybe add different logic to reset the game
  }

  // Background music loop event... when the game is over without playing, the music ends.
  backgroundMusic.addEventListener("ended", function () {
    this.currentTime = 0;
    this.play();
  });
});
