let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

function playGame(playerChoice) {
  const move = computerMove();
  let result;

  if (playerChoice === move) {
    result = "DRAW!";
    score.ties++;
  } else if (
    (playerChoice === "rock" && move === "scissor") ||
    (playerChoice === "paper" && move === "rock") ||
    (playerChoice === "scissor" && move === "paper")
  ) {
    result = "You WIN!";
    score.wins++;
  } else {
    result = "You LOSE!";
    score.losses++;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateScoreCard();

  document.querySelector(".js-result").innerHTML = `
                  <span class="result-move">Computer: <img src="${getMoveImage(move)}" alt="${move}" /></span>
                  <span class ="result-move">You: <img src="${getMoveImage(playerChoice)}" alt="${playerChoice}" /></span>
                  <strong class="result-message">${result}</strong>
                `;
}

function updateScoreCard() {
  document.querySelector(".js-scoreCard").innerHTML =
    "Wins: " + score.wins + " Losses: " + score.losses + " Ties: " + score.ties;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreCard();
}

function computerMove() {
  let computerMove = "";
  if (Math.random() < 1 / 3) {
    computerMove = "rock";
  } else if (Math.random() >= 1 / 3 && Math.random() <= 2 / 3) {
    computerMove = "paper";
  } else computerMove = "scissor";

  return computerMove;
}

function getMoveImage(move) {
  const moveImages = {
    rock: "images/hand-back-fist-regular-full.svg",
    paper: "images/hand-regular-full.svg",
    scissor: "images/hand-scissors-regular-full.svg",
  };

  return moveImages[move];
}

let isautoplaying = false;
let intervalID;

function autoPlay() {
  if (!isautoplaying) {
    isautoplaying = true;
    intervalID = setInterval(function () {
      playGame(computerMove());
    }, 2000);
  } else {
    clearInterval(intervalID);
    isautoplaying = false;
  }
}

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissor");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key === "x") {
    resetScore();
  }
});
document
  .querySelector(".js-reset-button")
  .addEventListener("click", resetScore);
document
  .querySelector(".js-autoplay-button")
  .addEventListener("click", autoPlay);
document.querySelector(".js-rock").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissor").addEventListener("click", () => {
  playGame("scissor");
});
