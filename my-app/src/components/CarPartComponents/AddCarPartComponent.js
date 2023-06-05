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

function AddCarPart({user , setuser}) {
  const [make, setMake] = useState('');
  const [price, setPrice] = useState('');
  const [partType, setPartType] = useState('Head Lights');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [Lgout, setLgout] = useState(false);
  const hist = useNavigate()
    useEffect(() => {
        if(!user){
        hist("/login")
        }else{

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
    const url = 'http://localhost:3001/car-parts/create';

    try {
      const data = {
        make,
        price,
        partType,
        description,
        image
      };
      console.log(data);
      const response = await axios.post(url, data, {
        headers: {
          token: JSON.parse(localStorage.getItem('token')),
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data); // Handle the response data as per your requirement
    } catch (error) {
      console.error(error);
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
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Make</InputGroup.Text>
              <Form.Control
                id="make"
                placeholder="e.g., Denso"
                aria-label="Make"
                aria-describedby="basic-addon1"
                value={make}
                onChange={handleMakeChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Price $</InputGroup.Text>
              <Form.Control
                id="price"
                aria-label="Price of Car"
                value={price}
                onChange={handlePriceChange}
              />
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control
                id="description"
                as="textarea"
                aria-label="Description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </InputGroup>
            <Form.Label htmlFor="basic-url">Part Type</Form.Label>
            <Form.Select
              id="partType"
              aria-label="Part Type"
              value={partType}
              onChange={handlePartTypeChange}
            >
              <option value="Head Lights">Head Lights</option>
              <option value="Alloy Rims">Alloy Rims</option>
              <option value="Android System">Android System</option>
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

export default AddCarPart;


















