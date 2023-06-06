import HomeComponent from './components/HomeComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Login from './components/login';
import Signup from './components/Signup';

import  DeleteCar  from './components/CarComponents/DeleteCarComponent'
import AddCar from './components/CarComponents/AddCarComponent'
import AddCarPart from './components/CarPartComponents/AddCarPartComponent'
import DeleteCarPartComponet from './components/CarPartComponents/DeleteCarPartComponent';
import OrderManagement from './components/OrderComponents/OrderManagementComponent';

function App() {
  const [user, setuser] = useState(null)
  useEffect(() => {
    let us = JSON.parse(localStorage.getItem('user'))
    if(us){
      setuser(us)
    }
  }, [])
  return (
    <Router>
    <Routes>
      {/* <Route exact path="/" element={<HomeComponent user={user} setuser={setuser}/>} />
      <Route exact path="/quiz/:category/:difficulty" element={<QuizComponent />} />
      <Route exact path="/over/:score" element={<ReviewComponent />}/>
      <Route path="login" element={<Login setuser={setuser}/>} />
      <Route path="signup" element={<Signup/>} /> */}
      <Route path="login" element={<Login setuser={setuser}/>} />
      <Route exact path="/" element={<HomeComponent user={user} setuser={setuser}/>}/>
      <Route exact path="/addcar" element={<AddCar user={user} setuser={setuser}/>}/>
      <Route exact path="/carmanagement" element={<DeleteCar user={user} setuser={setuser}/>}/>
      <Route exact path="/addcarpart" element={<AddCarPart user={user} setuser={setuser}/>}/>
      <Route exact path="/carpartmanagement" element={<DeleteCarPartComponet user={user} setuser={setuser}/>}/>
      <Route exact path="/ordermanagement" element={<OrderManagement user={user} setuser={setuser}/>}/>

    </Routes>
  </Router>
  );
}

export default App;

