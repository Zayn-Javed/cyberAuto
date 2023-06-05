import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppNav from './GeneralComponent/NavComponent';
import { useNavigate } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import slide1 from "../images/slide2.jpg"
import slide2 from "../images/slide1.jpg"
import slide3 from "../images/slide3.jpg"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import "../customStyles.css"
import ser from '../images/services.png';
import rr from '../images/RR.png';
import mer from "../images/mercedes.png";
import por from "../images/porsche.png";
import bmw from "../images/bmw.png";
import fr from "../images/ferrari.png";
import Footer from "./GeneralComponent/FooterComponent";
// const Home = ({user , setuser}) => {
//   const [categories, setCategories] = useState([]);
//   const [difficulty, setDifficulty] = useState('easy');
  // const [Lgout, setLgout] = useState(false)
  // const logout = ()=>{
  //   setuser(null)
  //   setLgout(true)
  //   localStorage.clear()
  // }
  // const hist = useNavigate()
  // useEffect(() => {
  //   if(!user){
  //     hist("/login")
  //   }else{

  //   }
  // }, [logout]);

//   return (
//     <>
//       <AppNav/>
//     </>
//   );
// };



const HomeComponent = ({user , setuser})=>{
  const [Lgout, setLgout] = useState(false);

  const hist = useNavigate()
  useEffect(() => {
    if(!user){
      hist("/login")
    }else{

    }
  }, [Lgout]);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const toPart= ()=>{
    hist("/carpartmanagement")
  }
  const toCar= ()=>{
    hist("/carmanagement")
  }
  const toOrder= ()=>{
    hist("/ordermanagement")
  }
  return (
    <div className="scrollable-container backGround">
      <AppNav user={user} setuser={setuser} Lgout={Lgout} setLgout={setLgout}/>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide1}
            alt="First slide"
          />
          <Carousel.Caption className='right'>
            <h1 className='right'>Welcome to CyberAutos!</h1>
              <br/>
              <br/>
            <h3>Car Management</h3>
              <p>Manage the car such as Add, Delete, View Cars</p>
            <Button variant="outline-success" onClick={toCar}>Car Management</Button>
            <br/>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide2}
            alt="Second slide"
          />
          <Carousel.Caption>
          <h1>Welcome to CyberAutos!</h1>
            <br/>
            <br/>
          <h3>Car Parts Management</h3>
            <p>Manage the car parts such as Add, Delete, View Parts</p>
          <Button variant="outline-success" onClick={toPart}>Car Parts Management</Button>
          <br/>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide3}
            alt="Third slide"
          />
          <Carousel.Caption>
          <h1>Welcome to CyberAutos!</h1>
            <br/>
            <br/>
          <h3>Orders Management</h3>
            <p>Manage the car orders such as reject or confirm Orders</p>
          <Button variant="outline-warning" onClick={toOrder}>Orders Management</Button>
          <br/>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <br/>
      <br/>
      <br/>
      <Container className='centered txtbck'>
        <div>
          <br/>
          <h3>
            Brands We Have
          </h3>
          <br/>
        </div>
        <Container className='flex '>
          <Row>
            <Col xs>
              <img className='scale' src={bmw}/>
            </Col>
            <Col xs={{ order: 12 }}>
            <img className='scale'  src={por}/>
            </Col>
            <Col xs={{ order: 1 }}>
            <img className='scale'  src={fr}/>
            </Col>
            <Col xs={{ order: 2 }}>
            <img className='scale'  src={mer}/>
            </Col>
            <Col xs={{ order: 3 }}>
            <img className='scale'  src={rr}/>
            </Col>
          </Row>
        </Container>
        <br/>
      </Container>
      <br/>
      <br/>
      <br/>
      <Container>
        <div className='flex'>
          <div >
            <br/>
            <h3>
              Servives We Provide
            </h3>
            <br/>

            <ul>
              <li>
              Unlocking endless possibilities. Manage services like a pro from the admin dashboard.

              </li>
              <li>
              Empowering you to shape extraordinary services. Take control with our admin dashboard.

              </li>
              <li>
              Driving service excellence. Admin dashboard: your hub for seamless service management.

              </li>
              <li>
              Effortless service management at your fingertips. Step into the admin dashboard and take charge.

              </li>
              <li>
              Where service innovation happens. Admin dashboard: your gateway to elevate customer experiences.

              </li>
              <li>
              Unleash the true potential of your services. Embrace the admin dashboard and conquer.

              </li>
              <li>
              Command center for service brilliance. Dive into the admin dashboard and lead the way.

              </li>
              <li>
              Streamline, optimize, and conquer. Elevate your services through the admin dashboard.

              </li>
              <li>
              Welcome to service excellence. Admin dashboard: where your service dreams become reality.
              </li>
            </ul>
          </div>
          <div>
            <br/>
            <img src={ser}/>
          </div>
        </div>
      </Container>
      <br/>
      <br/>
      <br/>
      <Footer/>
    </div>
   
  );
}

export default HomeComponent;

