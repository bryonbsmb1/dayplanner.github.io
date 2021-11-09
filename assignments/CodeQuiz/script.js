// setting up my HTML for jscript

var quizBody = document.getElementById('quiz')
var resultsEl = document.getElementById('result')
var finalScoreEl = document.getElementById('finalScore')
var gameoverDiv = document.getElementById('gameover')
var questionsEl = document.getElementById('questions')
var quizTimer = document.getElementById('timer')
var startQuizButton = document.getElementById('startbtn')
var startQuizDiv = document.getElementById('startpage')
var highscoreContainer = document.getElementById('highscoreContainer')
var highscoreDiv = document.getElementById('high-scorePage')
var highscoreInputName = document.getElementById('initials')
var highscoreDisplayName = document.getElementById('highscore-initials')
var endGameBtns = document.getElementById('endGameBtns')
var submitScoreBtn = document.getElementById('submitScore')
var highscoreDisplayScore = document.getElementById('highscore-score')
var buttonA = document.getElementById('a')
var buttonB = document.getElementById('b')
var buttonC = document.getElementById('c')
var buttonD = document.getElementById('d')

// quiz questions
var quizQuestions = [
  {
    question: 'Which answer is a good definition of JavaScript?',
    choiceA:
      'A language that allows you to implement complex features on web pages',
    choiceB:
      'A system for tagging text files to achieve font, color, graphic, and hyperlink effects on Web pages.',
    choiceC:
      'A rule-based language — you define rules specifying groups of styles that should be applied to particular elements or groups of elements',
    choiceD: "A language that came from Jedi's",
    correctAnswer: 'a',
  },
  {
    question:
      'In JavaScript variables are containers that store values, you start delaring a varible with what?',
    choiceA: 'org',
    choiceB: 'if',
    choiceC: 'var',
    choiceD: 'both A and C',
    correctAnswer: 'c',
  },
  {
    question: 'A Boolean uses one of these special keywords?',
    choiceA: 'Yes',
    choiceB: 'No',
    choiceC: 'Steve',
    choiceD: 'True',
    correctAnswer: 'd',
  },
  {
    question:
      ' What is a global object that is used in the construction of arrays?',
    choiceA: 'Array',
    choiceB: 'String',
    choiceC: 'Number',
    choiceD: 'Boolean',
    correctAnswer: 'a',
  },
  {
    question: 'What does DOM stand for?',
    choiceA: 'Display Object Mode',
    choiceB: 'Display Orient Manage',
    choiceC: 'Document Object Model',
    choiceD: 'Duke Of Michgian',
    correctAnswer: 'c',
  },
]
// more global variables
var finalQuestionIndex = quizQuestions.length
var currentQuestionIndex = 0
var timeLeft = 76
var timerInterval
var score = 0
var correct

// Function that generates my questions and answers
function generateQuizQuestion() {
  gameoverDiv.style.display = 'none'
  if (currentQuestionIndex === finalQuestionIndex) {
    return showScore()
  }
  var currentQuestion = quizQuestions[currentQuestionIndex]
  questionsEl.innerHTML = '<p>' + currentQuestion.question + '</p>'
  buttonA.innerHTML = currentQuestion.choiceA
  buttonB.innerHTML = currentQuestion.choiceB
  buttonC.innerHTML = currentQuestion.choiceC
  buttonD.innerHTML = currentQuestion.choiceD
}
// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz() {
  gameoverDiv.style.display = 'none'
  startQuizDiv.style.display = 'none'
  generateQuizQuestion()

  //Timer
  timerInterval = setInterval(function () {
    timeLeft--
    quizTimer.textContent = 'Time left: ' + timeLeft

    if (timeLeft === 0) {
      clearInterval(timerInterval)
      showScore()
    }
  }, 1000)
  quizBody.style.display = 'block'
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore() {
  quizBody.style.display = 'none'
  gameoverDiv.style.display = 'flex'
  clearInterval(timerInterval)
  highscoreInputName.value = ''
  finalScoreEl.innerHTML =
    'You got ' + score + ' out of ' + quizQuestions.length + ' correct!'
}

// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local stoage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submitScoreBtn.addEventListener('click', function highscore() {
  if (highscoreInputName.value === '') {
    alert('Initials cannot be blank')
    return false
  } else {
    var savedHighscores =
      JSON.parse(localStorage.getItem('savedHighscores')) || []
    var currentUser = highscoreInputName.value.trim()
    var currentHighscore = {
      name: currentUser,
      score: score,
    }

    gameoverDiv.style.display = 'none'
    highscoreContainer.style.display = 'flex'
    highscoreDiv.style.display = 'block'
    endGameBtns.style.display = 'flex'

    savedHighscores.push(currentHighscore)
    localStorage.setItem('savedHighscores', JSON.stringify(savedHighscores))
    generateHighscores()
  }
})

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores() {
  highscoreDisplayName.innerHTML = ''
  highscoreDisplayScore.innerHTML = ''
  var highscores = JSON.parse(localStorage.getItem('savedHighscores')) || []
  for (i = 0; i < highscores.length; i++) {
    var newNameSpan = document.createElement('li')
    var newScoreSpan = document.createElement('li')
    newNameSpan.textContent = highscores[i].name
    newScoreSpan.textContent = highscores[i].score
    highscoreDisplayName.appendChild(newNameSpan)
    highscoreDisplayScore.appendChild(newScoreSpan)
  }
}

// This function displays the high scores page while hiding all of the other pages from
function showHighscore() {
  startQuizDiv.style.display = 'none'
  gameoverDiv.style.display = 'none'
  highscoreContainer.style.display = 'flex'
  highscoreDiv.style.display = 'block'
  endGameBtns.style.display = 'flex'

  generateHighscores()
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore() {
  window.localStorage.clear()
  highscoreDisplayName.textContent = ''
  highscoreDisplayScore.textContent = ''
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz() {
  highscoreContainer.style.display = 'none'
  gameoverDiv.style.display = 'none'
  startQuizDiv.style.display = 'flex'
  timeLeft = 76
  score = 0
  currentQuestionIndex = 0
}

// This function checks the response to each answer
function checkAnswer(answer) {
  correct = quizQuestions[currentQuestionIndex].correctAnswer

  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    score++
    alert('That Is Correct!')
    currentQuestionIndex++
    generateQuizQuestion()
    //display in the results div that the answer is correct.
  } else if (
    answer !== correct &&
    currentQuestionIndex !== finalQuestionIndex
  ) {
    alert('That Is Incorrect.')
    currentQuestionIndex++
    generateQuizQuestion()
    //display in the results div that the answer is wrong.
  } else {
    showScore()
  }
}

// This button starts the quiz!
startQuizButton.addEventListener('click', startQuiz)
