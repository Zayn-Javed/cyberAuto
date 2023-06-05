import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Footer from '../GeneralComponent/FooterComponent';
import CardGroup from 'react-bootstrap/CardGroup';
import "../../customStyles.css";
import AppNav from '../GeneralComponent/NavComponent';
import pic from "../../images/car.png"
import Image from 'react-bootstrap/Image';
import top from '../../images/toop.jpg'
import gif from '../../images/des.png'
import { Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

function TopImg() {
    return <div className='ttop'><Image src={top} fluid /></div>;
}
function SearchBar() {
    return (
      <Container className="mt-5 search">
        <Row>
          <Col sm={4}>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 rounded-pill se"
                aria-label="Search"
              />
              <Button className="rounded-pill" variant="outline-primary">
                Search
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
}
function DeleteCarPartComponet({user , setuser}) {
    const [Lgout, setLgout] = useState(false);
    const hist = useNavigate()
    useEffect(() => {
        if(!user){
        hist("/login")
        }else{

        }
    }, [Lgout]);
    const toAdd= ()=>{
        hist("/addcarpart")
    }
  const [carParts, setCarParts] = useState([ ]);

  useEffect(() => {
    fetchCarParts();
  },[]);

  const fetchCarParts = async () => {
    try {
        const response = await axios.get('http://localhost:3001/car-parts/view-parts', {
            headers: {
              'token': JSON.parse(localStorage.getItem('token')),
            },
        });      
        setCarParts(response.data.parts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (carId) => {
    try {
      await axios.delete(`your-api-endpoint-url/${carId}`);
      fetchCarParts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
        <div className="scrollable-container  backGround">
            <AppNav user={user} setuser={setuser} Lgout={Lgout} setLgout={setLgout}/>
            <div className='fflex'>
                <TopImg/>
            </div>
            <br/>
            <SearchBar/>
            <br/>
            <Container className='l-flex'>
                <div className='des'>
                    <div className='img-f'>
                        <img className='gi' src={gif}/>
                    </div>
                    <br/>
                    <h3>
                        Description
                    </h3>
                    <p className='just'>
                        Through CyberAutos, now you can add any vehicle parts which will be available to a large number 
                        of the customer around the world for including these with cars as customization! So, Hurryup and add the vehicle. You can also make the vehicle
                        part unavailable if you want through this page of CyberAutos easily.
                    </p>
                    <div className='img-f'>
                        <Button variant="outline-success" onClick={toAdd}>Add Part</Button>
                    </div>
                </div>
                <Container className=" upback scrollable-container bo">
                    <br/>
                    <h2 className="text-light text-center mb-4">Car Part List</h2>
                    <div className='flex-row'>
                        {carParts.map((car) => (
                            <div key={car._id} >
                                <div className='ffflex '>
                                    <div className='im-div'>
                                        
                                    <img className='carp' src={car.images[0]}/>
                                    </div>
                                    <div className='pad'>
                                        <h4>{car.make}{" "}{car.partType}</h4>
                                        <h5>{car.price}</h5>
                                        <p className='just'>{car.description}</p>
                                        <Button variant="outline-danger" onClick={() => handleDelete(car._id)}>Delete</Button>
                                    </div>
                                </div>
                                <br/>
                            </div>
                        ))}
                    </div>
                    
                </Container>
            </Container>
            <br/>
            <br/>
            <Footer/>
        </div>    
  );
}

export default DeleteCarPartComponet;