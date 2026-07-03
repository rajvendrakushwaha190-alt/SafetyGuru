let currentQuestion = 0;
let score = 0;

const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreText = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

startBtn.onclick = startQuiz;
nextBtn.onclick = nextQuestion;

function startQuiz() {
    startBtn.style.display = "none";
    quiz.style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    let q = questions[currentQuestion];
    question.innerHTML = (currentQuestion + 1) + ". " + q.question;
    options.innerHTML = "";

    q.options.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.innerHTML = option;
        btn.onclick = () => checkAnswer(index);
        options.appendChild(btn);
    });
}

function checkAnswer(selected) {
    let correct = questions[currentQuestion].answer;

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

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        question.innerHTML = "Quiz Completed";
        options.innerHTML = "";
        nextBtn.style.display = "none";
        scoreText.innerHTML = "Score: " + score + " / " + questions.length;
    }
}
