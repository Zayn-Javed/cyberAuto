import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

const Home = ({user , setuser}) => {
  const [categories, setCategories] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [Lgout, setLgout] = useState(false)
  const logout = ()=>{
    setuser(null)
    setLgout(true)
    localStorage.clear()
  }
    const hist = useNavigate()
  useEffect(() => {
    if(!user){
      hist("/login")
    }else{
      axios
      .get('https://opentdb.com/api_category.php')
      .then((response) => {
        setCategories(response.data.trivia_categories);
      })
      .catch((error) => {
        console.log(error);
      });  
    }
  }, [logout]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const category = event.target.elements.category.value;
    window.location.href = `/quiz/${category}/${difficulty}`;
  };
  return (
    <Container >
      <h1 className="text-center my-5 text-dark">Quiz</h1>
      <Form className="text-dark" onSubmit={handleSubmit}>
        <h2 className="card-title text-center mt-4 mb-4">Select difficulty:</h2>
        <div className="form-group">
          <select className="form-control" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <br/>
        <h2 className="card-title text-center mt-4 mb-4">Quiz Category:</h2>
        <Row>
          {categories.map((category) => (
            <Col sm={12} md={6} lg={4} key={category.id}>
              <Form.Check
                type="radio"
                id={category.id}
                name="category"
                value={category.id}
                label={category.name}
              />
            </Col>
          ))}
        </Row>
        <div className="text-center mt-5">
          <Button type="submit" variant="primary" className="text-light">
            Start Quiz
          </Button>
        </div>
      </Form>
      <br/>
      <br/>
      <button onClick={()=>logout()} >Logout</button>
    </Container>
  );
};

export default Home;

