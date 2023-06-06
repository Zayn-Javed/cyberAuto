import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import "../../customStyles.css";
import Footer from "../GeneralComponent/FooterComponent";
import AppNav from '../GeneralComponent/NavComponent';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom'

function AddCarPart({ user, setuser }) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    carType: 'SUV',
    engine: '',
    engineType: 'Diesel',
    fuelAvg: '',
    description: '',
    image: null
  });
  const [Lgout, setLgout] = useState(false);
  const hist = useNavigate();
  useEffect(() => {
    if (!user) {
      hist("/login");
    }
  }, [Lgout]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:3001/car/create';

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('make', formData.make);
      formDataToSend.append('model', formData.model);
      formDataToSend.append('year', formData.year);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('carType', formData.carType);
      formDataToSend.append('engine', formData.engine);
      formDataToSend.append('engineType', formData.engineType);
      formDataToSend.append('fuelAvg', formData.fuelAvg);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image);

      const response = await axios.post(url, formDataToSend, {
        headers: {
          'token': JSON.parse(localStorage.getItem('token')),
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data); 
      alert("Car has been Successfully added!")
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="scrollable-container backGround app-container">
      <AppNav user={user} setuser={setuser} Lgout={Lgout} setLgout={setLgout}/>
      <br />
      <br />
      <Container className="">
        <div className="inner">
          <Form className="most-inner upback" onSubmit={handleSubmit}>
            <h2 className="centered">Add Car</h2>
            <Form.Group controlId="make">
              <Form.Label>Make</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Mercedes"
                value={formData.make}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="model">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Benz S350"
                value={formData.model}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="year">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 2023"
                value={formData.year}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price $</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 10000.00"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="carType">
              <Form.Label>Car Type</Form.Label>
              <Form.Control
                as="select"
                value={formData.carType}
                onChange={handleChange}
              >
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
                <option value="Jeep">Jeep</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="engine">
              <Form.Label>Engine</Form.Label>
              <Form.Control
                type="text"
                placeholder="Engine"
                value={formData.engine}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="engineType">
              <Form.Label>Engine Type</Form.Label>
              <Form.Control
                as="select"
                value={formData.engineType}
                onChange={handleChange}
              >
                <option value="Diesel">Diesel</option>
                <option value="Gasoline">Gasoline</option>
                <option value="CNG">CNG</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="fuelAvg">
              <Form.Label>Fuel Avg</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 10"
                value={formData.fuelAvg}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>
            <br/>
            <div className='centered'>
                <Button  variant="outline-success"type="submit" size="lg">
                Submit
                </Button>
            </div>
          </Form>
        </div>
      </Container>
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default AddCarPart;
