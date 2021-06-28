var startBtn = document.querySelector("#start-button");
var startPage = document.querySelector("#start-page");
var questionsBox = document.querySelector("#questions-box");
var question = document.querySelector("#question");
var answerOptions = document.querySelector("#answer-options");
var endScreen = document.querySelector("#endgame");
var timer = document.querySelector(".time");
// local variables instead?
var playerName = document.querySelector("#name")
var submitBtn = document.querySelector("#submit")
var score = document.querySelector("#final-score");
var finalScore;
var timerInterval;
var time;
var questionIndex = 0;


function startQuiz (){
    //reset question index on init
    questionIndex = 0;
    time = questionsArray.length*15;
    timer.textContent = time;
    timerStart();
    startPage.setAttribute("class","hide");
    endScreen.setAttribute("class", "hide");
    questionsBox.removeAttribute("class");
    fetchCurrentQuestion();
};

// get the current question
function fetchCurrentQuestion (){
    // if there are still more questions, continue game
    if (questionIndex < questionsArray.length){
        var thisQuestion = questionsArray[questionIndex];
        question.textContent = thisQuestion.questionHeader;
        answerOptions.textContent = "";
        // loop through add add all the options for the question
        for (var i = 0; i < thisQuestion.options.length; i++) {
            if (i == 0){
                var multipleChoice = 'A';
            }
            else {
                multipleChoice = nextChar(multipleChoice);
            }

            var choiceEl = document.createElement("button");
            //
            choiceEl.setAttribute("class", "choice");
            choiceEl.setAttribute("value", thisQuestion.options[i]);
            choiceEl.textContent = multipleChoice +". " + thisQuestion.options[i];
            // render options to page
            answerOptions.appendChild(choiceEl);
        };
    }
    else {
        //end game
        gameOver();
    }

};

// after clicking an option, check the answer against the array
function checkAnswer(selectedAnswerValue){
    var thisQuestion = questionsArray[questionIndex];
    if (selectedAnswerValue == thisQuestion.answer){
        //play correct sound
        new Audio('./assets/audio/Correct.mp3').play();
        // move to next question
        questionIndex++;
        fetchCurrentQuestion();
    }

    else {
        //play incorrect sound
        new Audio('./assets/audio/Incorrect.mp3').play();
        // subtract time for incorrect and move to next question
        time = time - 10;
        questionIndex++;
        fetchCurrentQuestion();
    }
};

function gameOver(){

    stopTimer();
    // store score as remaining time
    if (time > 0){
        // add one to account for lag between timer and score
        finalScore = time+1;
    }
    else {
        finalScore = 0;
    }
    // render score
    score.textContent = finalScore;
    // hide questions box
    questionsBox.setAttribute("class", "hide");
    // show game over screen
    endScreen.removeAttribute("class", "hide");
    // store input name / score to local storage on click submit
};

function saveScore(){
    // check for highScore JSON
    var highScore = JSON.parse(localStorage.getItem("highScore"));
    if (playerName.value != ""){
    //create object to save name and score
    var currentHighScore = 
        {
        player: playerName.value,
        score: finalScore,
        };
    // if there is no highScores saved, make an array and store the current high score
    if (highScore == null){
        var highScore = [];
        highScore.push(currentHighScore);

    }
    // otherwise, there is a JSON already and just append this score to the end of that array
    else {
        highScore.push(currentHighScore);
    }
    //write highScore to local storage
    localStorage.setItem("highScore", JSON.stringify(highScore));
    // bring user back to start screen play the game again
    startPage.removeAttribute("class","hide");
    endScreen.setAttribute("class", "hide");
    }
    // they didn't enter a name
    else {
        alert("Enter a name to save your score")
    }

};

function timerStart() {
    timerInterval = setInterval(function (){
        if (time >= 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timer.textContent = time;
            // Decrement `time` by 1
            time--;
          }
          else if (time <= 0) {
            // Once `time` gets to 0, set `timer` to 0
            timer.textContent = '0';
            // Use `clearInterval()` to stop the timer
            clearInterval(timerInterval);
            // Call the `gameOver()` function
            gameOver();
          }
    
    }, 1000);
};

function stopTimer() {
    clearInterval(timerInterval);
    timer.textContent = "";
}

// Start at letter A and output the next letter in the alphabet
function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", saveScore);

// listen for input on answer options
answerOptions.addEventListener("click",function(event) {
    // store clicked answer in element
    var element = event.target;
    // get value of the answer clicked
    var selectedAnswerValue = element.getAttribute("value");
    // don't move forward unless an answer button is clicked (don't click outside)
    if (selectedAnswerValue != null){
        checkAnswer(selectedAnswerValue);           
        }
});