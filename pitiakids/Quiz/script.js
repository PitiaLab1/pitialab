let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount = 0;
let scoreCount = 0;
let countdown;
const quizArray = [
  {
    id: "0",
    question: "Qual o patrimônio símbolo da cultura Araripense?",
    options: ["Igreja Matriz", "Cruz do Monte", "Raspadeira de Mandioca", "Casa de Pitia"],
    correct: "Casa de Pitia",
  },
  {
    id: "1",
    question: "Quem foi o(a) último(a) morador(a) do casarão?",
    options: ["Padre Cícero", "Pitia", "Violeta Arrais", "Frei Damião"],
    correct: "Pitia",
  },
  {
    id: "2",
    question: "Qual o antigo nome da nossa cidade (Araripe)?",
    options: ["Chapada do Araripe", "Lagoa da mata", "Brejo Seco", "Baixio"],
    correct: "Brejo Seco",
  },
  {
    id: "3",
    question: "Quando o espaço cultural Casa de Pitia se tornou um patrimônio histórico da nossa cidade?",
    options: ["2013", "2020", "2019", "2000"],
    correct: "2013",
  },
  {
    id: "4",
    question: "A casa de pitia é:",
    options: ["Igreja", "Patrimônio Histórico", "Instituição", "Crass"],
    correct: "Patrimônio Histórico",
  },
  {
    id: "5",
    question: "Quem foi pitia?",
    options: ["Última moradora do casarão", "Primeira vereadora de Araripe", "Atual moradora do casarão", "Secretária de educação"],
    correct: "Última moradora do casarão",
  },
];

restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

nextBtn.addEventListener("click", () => {
  questionCount += 1;
  if (questionCount === quizArray.length) {
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    userScore.innerHTML = `Você acertou ${scoreCount} de ${quizArray.length} questões`;
  } else {
    countOfQuestion.innerHTML = `${questionCount + 1} de ${quizArray.length} questões`;
    quizDisplay(questionCount);
    clearInterval(countdown);
    timerDisplay();
  }
});

const timerDisplay = () => {
  countdown = setInterval(() => {
    if (count === 0) {
      clearInterval(countdown);
      displayNext();
    } else {
      count--;
      timeLeft.innerHTML = `${count}s`;
    }
  }, 1000);
};

const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
  quizArray.sort(() => Math.random() - 0.5);
  for (let i of quizArray) {
    i.options.sort(() => Math.random() - 0.5);
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    countOfQuestion.innerHTML = `1 de ${quizArray.length} Questões`;
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    div.innerHTML += `
      <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

function checker(userOption) {
  let userSolution = userOption.innerText;
  let question = document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    options.forEach((element) => {
      if (element.innerText === quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }
  clearInterval(countdown);
  options.forEach((element) => {
    element.disabled = true;
  });
}

function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
