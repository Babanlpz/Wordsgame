const motText = document.querySelector(".mot");
const indiceText = document.querySelector(".indice-content");
const btnRefresh = document.querySelector(".refresh");
const btnValide = document.querySelector(".valide");
const input = document.querySelector("input");
const chrono = document.querySelector(".chrono-content");
const scoreDisplay = document.querySelector(".score");

let motCorrect;
let score = 0;
let questionIndex = 0;
let timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      chrono.innerText = maxTime;
    } else {
      handleTimerEnd();
    }
  }, 1000);
};

const handleTimerEnd = () => {
  clearInterval(timer);
  questionIndex++;
  if (questionIndex < words.length) {
    initGame();
  } else {
    displayScore();
  }
};

const initGame = () => {
  initTimer(20);

  let randomObj = mots[questionIndex];
  let motTableau = randomObj.mot.split("");

  for (let i = motTableau.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [motTableau[i], motTableau[j]] = [motTableau[j], motTableau[i]];
  }

  motText.innerText = motTableau.join("");
  indiceText.innerText = randomObj.indice;

  motCorrect = randomObj.mot.toLowerCase();

  input.value = "";

  input.setAttribute("maxLength", motCorrect.length);
};

const checkGame = () => {
  let userMot = input.value.toLowerCase();

  if (userMot === motCorrect) {
    score++;
  }

  questionIndex++;

  if (questionIndex < mots.length) {
    initGame();
  } else {
    displayScore();
  }
};

const chronoContainer = document.querySelector(".chrono");
const labelContainer = document.querySelector(".indice-label");

const displayScore = () => {
  motText.innerText = "FIN DU JEU!";
  indiceText.innerText = "Voici votre score";
  input.style.display = "none";
  btnValide.style.display = "none";
  btnRefresh.style.display = "none";
  chronoContainer.style.display = "none";
  labelContainer.style.display = "none";
  scoreDisplay.innerText = `Ton score: ${score} / ${mots.length}`;
  scoreDisplay.style.display = "block";
};

initGame();
