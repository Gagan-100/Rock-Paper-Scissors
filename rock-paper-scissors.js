const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

scoreUpdate();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playerGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

const rockBtn = document.querySelector(".js-rock-btn");
const rockGame = () => {
  playerGame("Rock");
};
rockBtn.addEventListener("click", rockGame);

const paperBtn = document.querySelector(".js-paper-btn");
const paperGame = () => {
  playerGame("Paper");
};
paperBtn.addEventListener("click", paperGame);

const scissorsBtn = document.querySelector(".js-scissors-btn");
const scissorsGame = () => {
  playerGame("Scissors");
};
scissorsBtn.addEventListener("click", scissorsGame);

// adding addEventListner for reset and autoplay button

const resetElem = document.querySelector(".js-reset-btn");
const resetBtnFun = () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  localStorage.removeItem("score");
  scoreUpdate();
};
resetElem.addEventListener("click", resetBtnFun);

const autoPlayElem = document.querySelector(".js-auto-play-btn");
const autoPlayBtn = () => {
  autoPlay();
};
autoPlayElem.addEventListener("click", autoPlayBtn);

// adding event key with r, p, s

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playerGame("Rock");
  } else if (event.key === "p") {
    playerGame("Paper");
  } else if (event.key === "s") {
    playerGame("Scissors");
  }
});

function playerGame(playerMove) {
  let result = "";
  let computerMove = pickComputerMove();

  if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "It's a tie.";
    } else if (computerMove === "Paper") {
      result = "You lose. Try again.";
    } else if (computerMove === "Scissors") {
      result = "You win!";
    }
  }

  if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You win!";
    } else if (computerMove === "Paper") {
      result = "It's a tie.";
    } else if (computerMove === "Scissors") {
      result = "You lose. Try again.";
    }
  }

  if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You lose. Try again.";
    } else if (computerMove === "Paper") {
      result = "You win!";
    } else if (computerMove === "Scissors") {
      result = "It's a tie.";
    }
  }

  // update the score
  if (result === "You win!") {
    score.wins += 1;
  } else if (result === "You lose. Try again.") {
    score.losses += 1;
  } else if (result === "It's a tie.") {
    score.ties += 1;
  }

  document.querySelector(".js-result").innerHTML = ` Result: ${result}`;

  // document.querySelector('.js-moves').innerHTML = `Your Move: ${playerMove} and Computer Move: ${computerMove}`;

  document.querySelector(".js-moves").innerHTML = ` Your Move
      <img src="images/${playerMove}-emoji.png" class="move-icon">
      
      <img src="images/${computerMove}-emoji.png" class="move-icon">
      Computer Move`;

  scoreUpdate();

  localStorage.setItem("score", JSON.stringify(score));
}

function scoreUpdate() {
  document.querySelector(".js-score").innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses},   Ties: ${score.ties}`;
}

function pickComputerMove() {
  let computerMove = "";
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber <= 1) {
    computerMove = "Scissors";
  }

  return computerMove;
}

