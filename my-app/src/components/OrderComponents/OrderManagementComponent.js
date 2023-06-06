import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Footer from '../GeneralComponent/FooterComponent';
import "../../customStyles.css";
import AppNav from '../GeneralComponent/NavComponent';
import Image from 'react-bootstrap/Image';
import top from '../../images/otop.jpeg'
import gif from '../../images/ORDERS.png'
import or from '../../images/ord.png'

import { useNavigate } from 'react-router-dom'

function TopImg() {
    return (
        <div className="top-img-container ttop">
        <Image src={top} alt="Background Image" fluid className="background-image" />
        <div className="centered-text st">
            <br/>
          <h2 >Welcome to Car Orders Management</h2>
          <p>Now reveive, decline and view the Car Orders as you want!</p>
        </div>
      </div>
    )
}
function DeleteCarComponet({user , setuser}) {
    const [Lgout, setLgout] = useState(false);
    const [orders, setorders] = useState([ ]);

    const hist = useNavigate()
    useEffect(() => {
        let userr = localStorage.getItem("user")
        if(!userr){
            hist("/login")
        }else{
    
        }
    }, [Lgout]);

  useEffect(() => {
    fetchorders();
  }, []);

  const fetchorders = async () => {
    try {
        const response = await axios.get('http://localhost:3001/orders/view-order', {
            headers: {
                'token': JSON.parse(localStorage.getItem('token')),
            }
        });
        console.log(response.data);
        setorders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdation = async (ordId, value) => {
    try {
        await axios.put(`http://localhost:3001/orders/confirm-order/${ordId}`,{
            status: value
        } , {
            headers: {
              'token': JSON.parse(localStorage.getItem('token')),
            },
        });
        fetchorders();
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
                        Through CyberAutos, now you can receive or decline any vehicle order which are placed by a large number 
                        of the customer around the world! So, Hurryup and manage your vehicle orders. You can also make the vehicle
                        unavailable if you want through CyberAutos easily.
                    </p>
                </div>
                <Container className=" upback scrollable-container bo">
                    <h2 className="text-light text-center mb-4">Car Orders List</h2>
                    <div className='flex-row'>
                        {orders.map((order) => (
                            <div key={order._id} >
                                <div className='ffflex '>
                                    <div className='im-div'>
                                    <img className='carp' src={or}/>
                                    </div>
                                    <div className='pad'>
                                        <h4>{"Order# "}{order._id}</h4>
                                        <h5>{"$ "}{ order.price}</h5>
                                        <p className='just'>{"Order placement date: "}{order.dateOrdered}</p>
                                        <Button variant="outline-success" onClick={() => handleUpdation(order._id, "true")}>Approve</Button>{"         "}
                                        <Button variant="outline-danger" onClick={() => handleUpdation(order._id, "false")}>Decline</Button>
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
