import React, { useState } from 'react';
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

function AddCar() {
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'your-api-endpoint-url';

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

      const response = await axios.post(url, formDataToSend);
      console.log(response.data); // Handle the response data as per your requirement
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="scrollable-container backGround app-container">
      <AppNav />
      <br />
      <br />
      <Container className=''>
        <div className='inner'>
          <Form className='most-inner upback' onSubmit={handleSubmit}>
            <h2 className='centered'>
              Add Car
            </h2>
            <br />
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Make</InputGroup.Text>
              <Form.Control
                id="make"
                placeholder="e.g., Mercedes"
                aria-label="Make"
                aria-describedby="basic-addon1"
                value={formData.make}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Model</InputGroup.Text>
              <Form.Control
                id="model"
                placeholder="e.g., Benz S350"
                aria-label="Model"
                aria-describedby="basic-addon1"
                value={formData.model}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Year</InputGroup.Text>
              <Form.Control
                id="year"
                aria-label="Year"
                value={formData.year}
                onChange={handleChange}
              />
              <InputGroup.Text>e.g., 2023</InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Price $</InputGroup.Text>
              <Form.Control
                id="price"
                aria-label="Price of Car"
                value={formData.price}
                onChange={handleChange}
              />
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                id="engine"
                placeholder="Engine"
                aria-label="Engine"
                aria-describedby="basic-addon2"
                value={formData.engine}
                onChange={handleChange}
              />
              <InputGroup.Text id="basic-addon2">cc</InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Fuel Avg</InputGroup.Text>
              <Form.Control
                id="fuelAvg"
                aria-label="Fuel Avg"
                value={formData.fuelAvg}
                onChange={handleChange}
              />
              <InputGroup.Text>KM/L</InputGroup.Text>
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control
                id="description"
                as="textarea"
                aria-label="Description"
                value={formData.description}
                onChange={handleChange}
              />
            </InputGroup>
            <Form.Label htmlFor="basic-url">Car Type</Form.Label>
            <Form.Select
              id="carType"
              aria-label="Car Type"
              value={formData.carType}
              onChange={handleChange}
            >
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
              <option value="Jeep">Jeep</option>
            </Form.Select>
            <Form.Label htmlFor="basic-url">Engine Type</Form.Label>
            <Form.Select
              id="engineType"
              aria-label="Engine Type"
              value={formData.engineType}
              onChange={handleChange}
            >
              <option value="Diesel">Diesel</option>
              <option value="Gasoline">Gasoline</option>
              <option value="CNG">CNG</option>
            </Form.Select>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} accept="image/*" />
            </Form.Group>
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

export default AddCar;
