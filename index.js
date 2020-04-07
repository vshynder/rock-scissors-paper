const gameStartButton = document.getElementById("start-game");
const gamePage = document.getElementById("game-page");
const startPage = document.getElementById("start-page");

gameStartButton.addEventListener("click", () => {
  startPage.classList.remove("active");
  gamePage.classList.add("active");
  countSeconds();
});

let userCounter = 0;
let computerCounter = 0;

const animElements = document.querySelectorAll("#animation");
const possibleChoices = document.querySelectorAll("#possible-choice");
const result = document.getElementById("result");
const counter = document.getElementById("counter");
const computerVariants = document.getElementsByClassName(
  "game__variant-image--computer"
);
console.log(computerVariants);
function countSeconds() {
  let secondsCount = 4;
  result.innerText = "";
  possibleChoices.forEach(choice => {
    choice.style.transform = "scale(1)";
  });

  animElements[0].classList.remove("wait-animation");
  animElements[0].classList.add("wait-animation");
  animElements[1].classList.remove("wait-animation");
  animElements[1].classList.add("wait-animation");

  computerVariants[0].style.transform = "scale(1)";
  computerVariants[1].style.transform = "scale(1)";
  computerVariants[2].style.transform = "scale(1)";
  const interval = setInterval(() => {
    secondsCount--;
    counter.innerText = secondsCount;
    if (!secondsCount) {
      clearInterval(interval);
      // Показать результат
      showResults();
    }
  }, 1000);
}

console.log(possibleChoices);
let userChoice;
possibleChoices.forEach(el => {
  el.addEventListener("click", () => {
    possibleChoices.forEach(choice => {
      choice.style.transform = "scale(1)";
    });
    el.style.transform = "scale(1.6)";
    userChoice = el.classList[el.classList.length - 1].split("--")[1];
  });
});

function showResults() {
  const choices = ["rock", "scissors", "paper"];
  const myChoice = checkForChoice(choices);
  const computerChoice = choices[Number.parseInt(Math.random() * 2.999)];
  document.getElementsByClassName(
    `game__variant-image--${computerChoice}-computer`
  )[0].style.transform = "scale(1.6)";
  if (myChoice === computerChoice) {
    printResults("Draw!");
  } else {
    switch (myChoice) {
      case "rock":
        if (computerChoice === "scissors") {
          userCounter++;
          printResults("You won!");
        }
        if (computerChoice === "paper") {
          computerCounter++;
          printResults("Computer won!");
        }
        break;
      case "scissors":
        if (computerChoice === "rock") {
          computerCounter++;
          printResults("Computer won!");
        }
        if (computerChoice === "paper") {
          userCounter++;
          printResults("You won!");
        }
        break;
      case "paper":
        if (computerChoice === "rock") {
          userCounter++;
          printResults("You won!");
        }
        if (computerChoice === "scissors") {
          computerCounter++;
          printResults("Computer won!");
        }
        break;
      default:
        printResults("Something went wrong");
        break;
    }
  }
}
function checkForChoice(choices) {
  if (!userChoice) {
    const choice = choices[Number.parseInt(Math.random() * 2.999)];
    document.getElementsByClassName(
      `game__variant-image--${choice}`
    )[0].style.transform = "scale(1.6)";
    return choice;
  } else {
    return userChoice;
  }
}
function printResults(string) {
  animElements[0].classList.remove("wait-animation");
  animElements[1].classList.remove("wait-animation");
  result.innerText = `${string} ${userCounter} : ${computerCounter}`;
  counter.innerText = "Start Again";
  counter.addEventListener("click", countSeconds);
}
