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
function TopImg() {
    return <div className='ttop'><Image src={top} fluid /></div>;
}
function CarList() {
  const [cars, setCars] = useState([
    {
        "car._id": 123132,
        "make": "toyo",
        "model": "adcadc",
        "price": 123,
        "description": "vsdfsdaz  saiuhfgvusaf  asuhedf gawshufhh uawhe fuawhe fhwa h uthw qht wweahgo fuwahoiguhwaoihg oiwhg o hwr"
    },
    {
        "car._id": 123132,
        "make": "toyo",
        "model": "adcadc",
        "price": 123,
        "description": "vsdfsdaz  saiuhfgvusaf  asuhedf gawshufhh uawhe fuawhe fhwa h uthw qht wweahgo fuwahoiguhwaoihg oiwhg o hwr"

    },
    {
        "car._id": 123132,
        "make": "toyo",
        "model": "adcadc",
        "price": 123,
        "description": "vsdfsdaz  saiuhfgvusaf  asuhedf gawshufhh uawhe fuawhe fhwa h uthw qht wweahgo fuwahoiguhwaoihg oiwhg o hwr"

    },
    {
        "car._id": 123132,
        "make": "toyo",
        "model": "adcadc",
        "price": 123,
        "description": "vsdfsdaz  saiuhfgvusaf  asuhedf gawshufhh uawhe fuawhe fhwa h uthw qht wweahgo fuwahoiguhwaoihg oiwhg o hwr"
    },
    {
        "car._id": 123132,
        "make": "toyo",
        "model": "adcadc",
        "price": 123,
        "description": "vsdfsdaz  saiuhfgvusaf  asuhedf gawshufhh uawhe fuawhe fhwa h uthw qht wweahgo fuwahoiguhwaoihg oiwhg o hwr"

    },
    {
        "car._id": 123132,
        "make": "toyo",
        "model": "adcadc",
        "price": 123,
        "description": "vsdfsdaz  saiuhfgvusaf  asuhedf gawshufhh uawhe fuawhe fhwa h uthw qht wweahgo fuwahoiguhwaoihg oiwhg o hwr"

    },
    {
        "car._id": 123132,
        "make": "toyo",
        "model": "adcadc",
        "price": 123,
        "description": "vsdfsdaz  saiuhfgvusaf  asuhedf gawshufhh uawhe fuawhe fhwa h uthw qht wweahgo fuwahoiguhwaoihg oiwhg o hwr"
    },
    {
        "car._id": 123132,
        "make": "toyo",
        "model": "adcadc",
        "price": 123,
        "description": "vsdfsdaz  saiuhfgvusaf  asuhedf gawshufhh uawhe fuawhe fhwa h uthw qht wweahgo fuwahoiguhwaoihg oiwhg o hwr"

    },
    {
        "car._id": 123132,
        "make": "toyo",
        "model": "adcadc",
        "price": 123,
        "description": "vsdfsdaz  saiuhfgvusaf  asuhedf gawshufhh uawhe fuawhe fhwa h uthw qht wweahgo fuwahoiguhwaoihg oiwhg o hwr"

    },
  ]);

//   useEffect(() => {
//     fetchCars();
//   }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('your-api-endpoint-url');
      setCars(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (carId) => {
    try {
      await axios.delete(`your-api-endpoint-url/${carId}`);
      fetchCars();
    } catch (error) {
      console.error(error);
    }
  };

  return (
        <div className="scrollable-container  backGround">
            <AppNav />

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
                </div>
            <Container className=" upback scrollable-container bo">
                    <h2 className="text-light text-center mb-4">Car List</h2>
                    <div className='flex-row'>
                        {cars.map((car) => (
                            <div>

                                <div key={car._id} className='ffflex '>
                                    <div className='im-div'>
                                    <img className='carp' src={pic}/>
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

export default CarList;
