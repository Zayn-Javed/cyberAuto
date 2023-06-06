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
import { useNavigate } from 'react-router-dom'
import AddCar from './AddCarComponent';

function TopImg() {
    return (
        <div className="top-img-container ttop">
        <Image src={top} alt="Background Image" fluid className="background-image" />
        <div className="centered-text st">
            <br/>
          <h2 >Welcome to Car Par Management</h2>
          <p>Now Add, Delete and View the Car as you want!</p>
        </div>
      </div>
    )
}
function DeleteCarComponet({user , setuser}) {
    const [Lgout, setLgout] = useState(false);
    const [cars, setCars] = useState([ ]);

    const hist = useNavigate()
    useEffect(() => {
      let userr = localStorage.getItem("user")
      if(!userr){
        hist("/login")
      }else{
  
      }
    }, [Lgout]);
    const toAdd= ()=>{
        hist("/addcar")
    }

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
        const response = await axios.get('http://localhost:3001/car/view-cars', {
            headers: {
                'token': JSON.parse(localStorage.getItem('token')),
            }
        });
        console.log(response.data.cars);
        setCars(response.data.cars);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (carId) => {
    try {
        await axios.delete(`http://localhost:3001/car/delete-car/${carId}`, {
            headers: {
              'token': JSON.parse(localStorage.getItem('token')),
            },
        });
        fetchCars();
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
                        Through CyberAutos, now you can add any vehicle which will be available to a large number 
                        of the customer around the world! So, Hurryup and add the vehicle. You can also make the vehicle
                        unavailable if you want through this page of CyberAutos easily.
                    </p>
                    <div className='img-f'>
                        <Button variant="outline-success" onClick={toAdd}>Add Car</Button>
                    </div>
                </div>
                <Container className=" upback scrollable-container bo">
                    <h2 className="text-light text-center mb-4">Car List</h2>
                    <div className='flex-row'>
                        {cars.map((car) => (
                            <div key={car._id} >
                                <div className='ffflex '>
                                    <div className='im-div'>
                                    <img className='carp' src={car.images[0]}/>
                                    </div>
                                    <div className='pad'>
                                        <h4>{car.make}{" "}{car.model}</h4>
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

export default DeleteCarComponet;
