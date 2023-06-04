import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Container, ListGroup, Card } from 'react-bootstrap';
const ReviewComponent = (props) => {
  const { score } = useParams();
  const [myArray, setMyArray] = useState([]);
  useEffect(() => {
    const question = localStorage.getItem("name");
    const res = JSON.parse(question);
    setMyArray(res);
  }, []);
  if (!myArray || myArray.length === 0) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  return (
    <Container className="py-3">
      <h1>Your Score is: { score }</h1>
      <ListGroup>
        {myArray.map((item, index) => (
          <ListGroup.Item key={index}>
            <Card>
              <Card.Header>{item.question}</Card.Header>
              <Card.Body>
                <Card.Text>
                  Correct Answer: {item.correct_answer}
                </Card.Text>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default ReviewComponent;
