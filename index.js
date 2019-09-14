let questionNumber = 0;
let score = 0;


//start quiz
function startQuiz () {
    $('.quiz-start').on('click', '.start-button', function (event) {
        $('.quiz-start').remove();
        $('.quiz-form-answers').css('display', 'block');
        $('.question-number').text(1);
    });
}

//render questions in the DOM
function renderQuizQuestions () {
    $('.quiz-form-answers').html(createQuestions());
}

//create HTML for questions
function createQuestions () {
    if (questionNumber < STORE.length) {
        return `<div class="question-${questionNumber}">
        <h2>${STORE[questionNumber].question}</h2>
        <form>
        <fieldset>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
        <span>${STORE[questionNumber].answers[0]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
        <span>${STORE[questionNumber].answers[1]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
        <span>${STORE[questionNumber].answers[2]}</span>
        </label>
        <button type="submit" class="questionSubmit">Submit</button>
        </fieldset>
        </form>
        </div>`;
    } else {
        renderResults();
        restartQuiz();
        $('.question-number').text(8)
    }
}

//user selects the answer
function userAnswer () {
    $('form').on('submit', function (event){
        event.preventDefault();
        let selectedAnswer = $('input:checked');
        let answer = selectedAnswer.val();
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        if (answer === correctAnswer) {
            selectedAnswer.parent().addClass('correct');
            ifAnswerIsCorrect();
        } else {
            selectedAnswer.parent().addClass('wrong');
            ifAnswerIsWrong();
        }
    });
}


//if the selected answer is correct:
function ifAnswerIsCorrect () {
    userFeedbackCorrect ();
    updateScore ();
}

function userFeedbackCorrect () {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.quiz-form-answers').html(`<div class="correctFeedback"><p>That is correct!</p><button type=button class="nextButton">Next</button></div>`);
}

function changeScore () {
    score+=10;
}

function updateScore () {
    changeScore ();
    $('.score').text(score);
}

//if the slected answer is incorrect:
function ifAnswerIsWrong () {
    userFeedbackWrong ();
}

function ifAnswerIsWrong () {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.quiz-form-answers').html(`<div class="correctFeedback"><p>Sorry, that is wrong!<br>The correct answer is: <span>${correctAnswer}</span></p><button type=button class="nextButton">Next</button></div>`);
}

//user moves to next question
function renderNextQuestion () {
    $('main').on('click', '.nextButton', function (event) {
        changeQuestionNumber ();
        renderQuizQuestions ();
        userAnswer ();
    });
}

function changeQuestionNumber () {
    questionNumber ++;
    $('.question-number').text(questionNumber+1);
}


//at the end of the quiz
function renderResults () {
    if (score === 80) {
        $('.quiz-form-answers').html(`<div class="results-feedback"><h3>Congratulations! You got a perfect score! <br><span>${score} / 80</span></h3><p>You\'re Ready to be a New Parent!</p><button class="restartButton">Restart Quiz</button></div>`);
    } else if (score < 80) {
        $('.quiz-form-answers').html(`<div class="results-feedback"><h3>Looks like you missed some questions! <br>Your score: <span>${score} / 80</span><br>Try Again!</h3><button class="restartButton">Restart Quiz</button></div>`);
    }
}

function restartQuiz () {
    $('main').on('click', '.restartButton', function() {
        location.reload();
    });
}


//run all quiz functions
function createQuizApp () {
    startQuiz ();
    renderQuizQuestions ();
    userAnswer ();
    renderNextQuestion ();
}

$(createQuizApp);

