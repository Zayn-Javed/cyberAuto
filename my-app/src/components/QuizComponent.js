import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spinner, Button, ListGroup, Card } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
const QuizComponent = ( ) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const { category, difficulty} = useParams();
  function AnimatedExample() {
    var timePercentage = (timeRemaining / 10) * 100;
    return <ProgressBar className="my-3" now={timePercentage}  />
  }
  useEffect( () => {
    axios
    .get(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficuilty=${difficulty}`
    )
    .then((response) => {
      setQuestions(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [category, difficulty]);
  useEffect(() => {
    if (timeRemaining==0) {
      setSelectedAnswer(null);
      handleNextQuestion()
    }
    const timer = timeRemaining > 0 && setInterval(() => setTimeRemaining(time => time - 1), 1000);
    return () => clearInterval(timer);
  }, [timeRemaining]);
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };
  const handleNextQuestion = () => {
    const correctAnswer = questions[currentQuestion].correct_answer;
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer('');
    if (questions.length>currentQuestion+1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeRemaining(10);
      console.log(currentQuestion);
      console.log(questions.length);
    }
    else{
        //const array = encodeURIComponent(JSON.stringify(questions));
      localStorage.setItem("name", JSON.stringify(questions));
       window.location.href = `/over/${score}`;
    }
  };
  if (!questions[currentQuestion]) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Quiz</h1>
      <Card className="mb-4">
        <Card.Header>Question {currentQuestion + 1}</Card.Header>
        <Card.Body>
          <Card.Title>{questions[currentQuestion].question}</Card.Title>
          <ListGroup className="mb-3">
            {questions[currentQuestion].incorrect_answers.map((answer) => (
              <ListGroup.Item key={answer}>
                <Button
                  variant={
                     'outline-secondary'
                  }
                  onClick={() => handleAnswerSelect(answer)}
                  disabled={selectedAnswer !== ''}>
                  {answer}
                </Button>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <Button
                variant={
                  'outline-secondary'
               }
                onClick={() =>
                  handleAnswerSelect(questions[currentQuestion].correct_answer)
                }
                disabled={selectedAnswer !== ''} >
                {questions[currentQuestion].correct_answer}
              </Button>
            </ListGroup.Item>
          </ListGroup>
          <Button
            variant="dark"
            onClick={handleNextQuestion}
            disabled={selectedAnswer === ''}>
            Next Question
          </Button>
        </Card.Body>
      </Card>
      <div className="text-center">
        <p>Time Remaining: {timeRemaining}</p>
        
        <AnimatedExample/>
        <p>Score: {score}</p>
      </div>
    </div>
  );
};





export default QuizComponent;