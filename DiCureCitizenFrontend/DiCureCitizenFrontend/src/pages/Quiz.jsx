import { useState } from 'react'

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const questions = [
    {
      id: 1,
      question: "You receive a text message saying your bank account will be closed unless you click a link immediately. What should you do?",
      options: [
        "Click the link to save your account",
        "Call your bank directly using the number on your bank card",
        "Reply to the text asking for more information",
        "Forward the message to friends for advice"
      ],
      correct: 1,
      explanation: "Always contact your bank directly using official contact information. Banks never ask you to verify account details through text messages."
    },
    {
      id: 2,
      question: "An email claims you've won a lottery you never entered. It asks for your personal details to claim the prize. This is:",
      options: [
        "A legitimate lottery win",
        "A scam - delete the email",
        "Worth investigating further",
        "Something to discuss with family first"
      ],
      correct: 1,
      explanation: "This is a classic lottery scam. You cannot win a lottery you never entered. Delete these emails immediately."
    },
    {
      id: 3,
      question: "Someone calls claiming to be from Microsoft, saying your computer is infected. They want remote access to fix it. You should:",
      options: [
        "Allow them access to help fix the problem",
        "Hang up immediately - this is a scam",
        "Ask them to call back later",
        "Give them your computer password"
      ],
      correct: 1,
      explanation: "Microsoft never makes unsolicited calls about computer problems. This is a common tech support scam. Hang up immediately."
    },
    {
      id: 4,
      question: "What's the safest way to shop online?",
      options: [
        "Use any website that looks professional",
        "Only shop on websites you trust and that use https://",
        "Always use public Wi-Fi for shopping",
        "Share your credit card details via email"
      ],
      correct: 1,
      explanation: "Only shop on trusted websites with secure connections (https://). Never shop using public Wi-Fi or share card details via email."
    },
    {
      id: 5,
      question: "A social media friend you've never met in person asks you to send money for an emergency. You should:",
      options: [
        "Send money immediately to help",
        "Ask for more details about the emergency",
        "Be suspicious - this could be a romance scam",
        "Ask other friends what they think"
      ],
      correct: 2,
      explanation: "This is likely a romance or friendship scam. Never send money to people you've only met online, regardless of their story."
    }
  ]

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
    
    setShowResult(true)
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer('')
        setShowResult(false)
      } else {
        setQuizCompleted(true)
      }
    }, 3000)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer('')
    setScore(0)
    setShowResult(false)
    setQuizCompleted(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) {
      return "Excellent! You have strong scam detection skills."
    } else if (percentage >= 60) {
      return "Good job! Consider reviewing our safety tips to improve further."
    } else {
      return "You might benefit from our educational resources. Don't worry - learning takes practice!"
    }
  }

  if (quizCompleted) {
    return (
      <div className="quiz">
        <div className="container">
          <div className="quiz-results">
            <h1>Quiz Complete!</h1>
            <div className="score-display">
              <div className="score-circle">
                <span className="score-number">{score}</span>
                <span className="score-total">/ {questions.length}</span>
              </div>
            </div>
            <h2>{getScoreMessage()}</h2>
            <p>Remember: When in doubt, always verify independently and never rush into decisions involving your personal information or money.</p>
            <div className="quiz-actions">
              <button onClick={restartQuiz} className="btn btn-primary">
                Take Quiz Again
              </button>
              <a href="/learn-more" className="btn btn-secondary">
                Learn More Safety Tips
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz">
      <div className="container">
        <header className="quiz-header">
          <h1>Scam Detection Quiz</h1>
          <p>Test your ability to identify potential scams and learn how to protect yourself.</p>
          <div className="quiz-progress">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </header>

        <div className="quiz-content">
          {!showResult ? (
            <div className="question-card">
              <h2 className="question-text">
                {questions[currentQuestion].question}
              </h2>
              
              <div className="answer-options">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`answer-option ${selectedAnswer === index ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              <button
                className="btn btn-primary quiz-next"
                onClick={handleNextQuestion}
                disabled={selectedAnswer === ''}
              >
                {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          ) : (
            <div className="result-card">
              <div className={`result-indicator ${selectedAnswer === questions[currentQuestion].correct ? 'correct' : 'incorrect'}`}>
                {selectedAnswer === questions[currentQuestion].correct ? '✅ Correct!' : '❌ Incorrect'}
              </div>
              <p className="result-explanation">
                {questions[currentQuestion].explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Quiz