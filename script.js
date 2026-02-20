const elements = {
  result: document.querySelector("#result"),
  choices: document.querySelector("#choices"),
  humanScore: document.querySelector("#human-score"),
  machineScore: document.querySelector("#machine-score"),
  resetBtn: document.querySelector("#reset"),
  choiceButtons: document.querySelectorAll(".choice-btn"),
};

let humanScore = 0;
let machineScore = 0;

const emojiMap = {
  stone: "🪨",
  paper: "📄",
  scissors: "✂️",
};

const isValidChoice = (choice) =>
  ["stone", "paper", "scissors"].includes(choice);

const machinePlay = () => {
  const choices = ["stone", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
};

const updateScoreDisplay = () => {
  if (elements.humanScore) elements.humanScore.textContent = humanScore;
  if (elements.machineScore) elements.machineScore.textContent = machineScore;
};

const getEmoji = (choice) => emojiMap[choice] || "❓";

const playRound = (humanChoice, machineChoice) => {
  if (elements.choices) {
    elements.choices.innerHTML = `você ${getEmoji(humanChoice)}  ·  máquina ${getEmoji(machineChoice)}`;
  }

  if (humanChoice === machineChoice) {
    elements.result.textContent = "⚡ empate! ⚡";
    elements.result.style.color = "var(--primary)";
  } else if (
    (humanChoice === "paper" && machineChoice === "stone") ||
    (humanChoice === "stone" && machineChoice === "scissors") ||
    (humanChoice === "scissors" && machineChoice === "paper")
  ) {
    humanScore++;
    elements.result.textContent = "✨ você venceu! ✨";
    elements.result.style.color = "#fbbf24";
  } else {
    machineScore++;
    elements.result.textContent = "🌪️ máquina venceu 🌪️";
    elements.result.style.color = "#f87171";
  }

  updateScoreDisplay();
};

const handleChoiceClick = (event) => {
  const button = event.currentTarget;
  const choice = button.id;
  if (!isValidChoice(choice)) return;
  const machine = machinePlay();
  playRound(choice, machine);
};

elements.choiceButtons.forEach((btn) => {
  btn.addEventListener("click", handleChoiceClick);
});

const resetGame = () => {
  humanScore = 0;
  machineScore = 0;
  updateScoreDisplay();
  if (elements.choices) {
    elements.choices.textContent = "Escolha uma opção acima para jogar";
  }
  if (elements.result) {
    elements.result.textContent = "";
  }
};

if (elements.resetBtn) {
  elements.resetBtn.addEventListener("click", resetGame);
}

resetGame();
