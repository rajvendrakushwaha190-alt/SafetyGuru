let currentQuestion = 0;
let score = 0;
let quizData = [];

const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreText = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const category = document.getElementById("category");

startBtn.onclick = startQuiz;
nextBtn.onclick = nextQuestion;

function startQuiz() {

    if (category.value === "ppe") {
        quizData = ppeQuestions;
    } else {
        quizData = questions;
    }

    currentQuestion = 0;
    score = 0;

    startBtn.style.display = "none";
    quiz.style.display = "block";
    nextBtn.style.display = "inline-block";

    loadQuestion();
}

function loadQuestion() {

    let q = quizData[currentQuestion];

    question.innerHTML = (currentQuestion + 1) + ". " + q.question;

    options.innerHTML = "";

    q.options.forEach((option, index) => {

        let btn = document.createElement("button");

        btn.innerHTML = option;

        btn.onclick = function () {
            checkAnswer(index);
        };

        options.appendChild(btn);

    });

}

function checkAnswer(selected) {

    let correct = quizData[currentQuestion].answer;

    Array.from(options.children).forEach((btn, index) => {

        btn.disabled = true;

        if (index === correct) {
            btn.style.background = "green";
        }

        if (index === selected && selected !== correct) {
            btn.style.background = "red";
        }

    });

    if (selected === correct) {
        score++;
    }

}

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < quizData.length) {

        loadQuestion();

    } else {

        question.innerHTML = "Quiz Completed";

        options.innerHTML = "";

        nextBtn.style.display = "none";

        scoreText.innerHTML =
            "Score: " + score + " / " + quizData.length;

    }

}
