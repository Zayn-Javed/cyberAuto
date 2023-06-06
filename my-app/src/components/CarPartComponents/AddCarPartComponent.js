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
  const [make, setMake] = useState('');
  const [price, setPrice] = useState('');
  const [partType, setPartType] = useState('Head Lights');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [Lgout, setLgout] = useState(false);
  const hist = useNavigate();

  useEffect(() => {
    let userr = localStorage.getItem("user")
    if(!userr){
      hist("/login");
    }
  }, [Lgout]);

  const handleMakeChange = (e) => {
    setMake(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handlePartTypeChange = (e) => {
    setPartType(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (make==null || price==null || partType==null || description==null || image==null) {
      alert("Please fill all fields")
    }
    else{
      const url = 'http://localhost:3001/car-parts/create';
      try {
        const formData = new FormData();
        formData.append('make', make);
        formData.append('price', price);
        formData.append('partType', partType);
        formData.append('description', description);
        formData.append('image', image);
  
        const response = await axios.post(url, formData, {
          headers: {
            token: JSON.parse(localStorage.getItem('token')),
          }
        });
        console.log(response.data); 
        alert("Car Part is Successfully added")
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="scrollable-container backGround app-container">
      <AppNav user={user} setuser={setuser} Lgout={Lgout} setLgout={setLgout}/>
      <br />
      <br />
      <Container className=''>
        <div className='inner'>
          <Form className='most-inner upback' onSubmit={handleSubmit}>
            <h2 className='centered'>
              Add Car Part
            </h2>
            <br />
            <Form.Group controlId="make" className="mb-3">
              <Form.Label>Make</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Denso"
                value={make}
                onChange={handleMakeChange}
              />
            </Form.Group>
            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Price $</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={handlePriceChange}
              />
            </Form.Group>
            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </Form.Group>
            <Form.Group controlId="partType" className="mb-3">
              <Form.Label>Part Type</Form.Label>
              <Form.Control
                as="select"
                value={partType}
                onChange={handlePartTypeChange}
              >
                <option value="Head Lights">Head Lights</option>
                <option value="Alloy Rims">Alloy Rims</option>
                <option value="Android System">Android System</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
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

export default AddCarPart;
