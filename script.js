// ===== LOGIN CHECK =====
if(localStorage.getItem("loggedIn")!=="true"){
    window.location.href="login.html";
}

// ===== USER =====
const currentUser = localStorage.getItem("currentUser");

// ===== VARIABLES =====
let questions = [];
let currentQuestion = 0;
let score = 0;

// ===== HTML ELEMENTS =====
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const options = document.getElementById("options");
const scoreText = document.getElementById("score");
const category = document.getElementById("category");
const welcomeUser = document.getElementById("welcomeUser");

// ===== PAGE LOAD =====
window.onload = function(){

    if(welcomeUser){
        welcomeUser.innerHTML =
        "👋 Welcome : <b>" + currentUser + "</b>";
    }

    quiz.style.display = "none";
    nextBtn.style.display = "none";

};

// ===== START QUIZ =====
startBtn.addEventListener("click", startQuiz);

function startQuiz(){

    currentQuestion = 0;
    score = 0;

    const selectedCategory = category.value;

    questions = questionBank.filter(function(q){
        return q.category === selectedCategory;
    });

    if(questions.length===0){
        alert("No Questions Available");
        return;
    }

    shuffleArray(questions);

    startBtn.style.display = "none";
    quiz.style.display = "block";
    nextBtn.style.display = "inline-block";

    loadQuestion();

}

// ===== SHUFFLE =====
function shuffleArray(array){

    for(let i=array.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]=[array[j],array[i]];

    }

}

// ===== LOAD QUESTION =====
function loadQuestion(){

    let q = questions[currentQuestion];

    question.innerHTML =
    (currentQuestion+1)+". "+q.question;

    options.innerHTML="";

    let shuffledOptions = q.options.map(function(text,index){

        return{

            text:text,

            correct:index===q.answer

        };

    });

    shuffleArray(shuffledOptions);

    shuffledOptions.forEach(function(opt){

        let btn=document.createElement("button");

        btn.innerHTML=opt.text;

        btn.onclick=function(){

            checkAnswer(btn,opt.correct);

        };

        options.appendChild(btn);

    });

}

// ===== CHECK ANSWER =====
function checkAnswer(button,isCorrect){

    let buttons=document.querySelectorAll("#options button");

    buttons.forEach(function(btn){

        btn.disabled=true;

    });

    if(isCorrect){

        button.style.background="green";

        score++;

    }else{

        button.style.background="red";

        buttons.forEach(function(btn){

            if(btn.innerHTML===questions[currentQuestion].options[questions[currentQuestion].answer]){

                btn.style.background="green";

            }

        });

    }

}
// ===== NEXT QUESTION =====
nextBtn.addEventListener("click", nextQuestion);

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion < questions.length){

        loadQuestion();

    }else{

        showResult();

    }

}

// ===== SHOW RESULT =====
function showResult(){

    quiz.style.display="block";

    question.innerHTML="🎉 Quiz Completed";

    options.innerHTML="";

    nextBtn.style.display="none";

    let percentage=Math.round((score/questions.length)*100);

    let result;

    if(percentage>=80){

        result="PASS ✅";

    }else{

        result="FAIL ❌";

    }

    scoreText.innerHTML=
    "<h2>Result</h2>"+
    "<p><b>User :</b> "+currentUser+"</p>"+
    "<p><b>Score :</b> "+score+" / "+questions.length+"</p>"+
    "<p><b>Percentage :</b> "+percentage+"%</p>"+
    "<h3>"+result+"</h3>";

    startBtn.style.display="inline-block";

}
// ===== LOGOUT =====
function logout(){

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");

    window.location.href="login.html";

}

// ===== RESTART QUIZ =====
function restartQuiz(){

    quiz.style.display="none";

    scoreText.innerHTML="";

    startBtn.style.display="inline-block";

    nextBtn.style.display="none";

    currentQuestion=0;

    score=0;

}
