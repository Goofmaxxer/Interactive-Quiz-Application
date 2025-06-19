const questions = [
    {
        question: "Question 1....?",
        answers: [
            { text: "answer1", correct: true },
            { text: "answer2", correct: false },
            { text: "answer3", correct: false },
            { text: "answer4", correct: false }
        ]
    },
    {
        question: "Question 2 .......?",
        answers: [
            { text: "answer1", correct: false },
            { text: "answer2", correct: false },
            { text: "answer3", correct: true },
            { text: "answer4", correct: false }
        ]
    },
    {
        question: "Question 3 .....?",
        answers: [
            { text: "answer1", correct: true },
            { text: "answer2", correct: false },
            { text: "answer3", correct: false },
            { text: "answer4", correct: false }
        ]
    }
];

const QuestionElem = document.getElementById("questions");
const AnswerElem = document.getElementById("answer-cont");
const NextButton = document.getElementById("nextbtn");
const ScoreElem = document.getElementById("score");
const timerElem = document.getElementById('timer');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timerleft = 15;


function startTimer() {
    clearInterval(timer);
    timerleft = 15;
    timerElem.innerText = `Time left: ${timerleft}s`; 
    timer = setInterval(() => {
        timerleft--;
        timerElem.innerText = `Time left: ${timerleft}s`; 
        if (timerleft <= 0) {
            clearInterval(timer);
            autoselect();
        }
    }, 1000);
}
function autoselect(){
    const button = Array.from(AnswerElem.children);
    const correctbtn = button.find(btn => btn.dataset.correct =="true");
    if(correctbtn) correctbtn.click();

}

function StartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    NextButton.innerText = "Next";
    ScoreElem.innerText = "";
    ShowQuestions();
}

function ShowQuestions() {
    resetState();
    startTimer();
    const currentQuestion = questions[currentQuestionIndex];
    QuestionElem.innerText = currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", SelectAnswer);
        AnswerElem.appendChild(button);
    });
}

function resetState() {
    NextButton.style.display = "none";
    while (AnswerElem.firstChild) {
        AnswerElem.removeChild(AnswerElem.firstChild);
    }
}

function SelectAnswer(e) {
    clearInterval(timer);
    const SelectedAnswer = e.target;
    const isCorrect = SelectedAnswer.dataset.correct === "true";
    if (isCorrect) {
        SelectedAnswer.classList.add("Correct");
        score++;
    } else {
        SelectedAnswer.classList.add("Incorrect");
    }

    Array.from(AnswerElem.children).forEach((button) => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("Correct");
        }
    });

    NextButton.style.display = "block";
}

function showScore() {
    QuestionElem.innerText = "Quiz Completed...!";
    ScoreElem.innerText = `Your score is ${score} / ${questions.length}`;
    NextButton.innerText = "Play Again!";
    NextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        ShowQuestions();
    } else {
        showScore();
    }
}

NextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        StartQuiz();
    }
});


StartQuiz();
