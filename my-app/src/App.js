import HomeComponent from './components/HomeComponent';
import QuizComponent from './components/QuizComponent';
import ReviewComponent from './components/ReviewComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Login from './components/login';
import Signup from './components/Signup';

import AddCar from './components/CarComponents/AddCarComponent'
function App() {
  // const [user, setuser] = useState(null)
  // useEffect(() => {
  //   let us = JSON.parse(localStorage.getItem('user'))
  //   if(us){
  //     setuser(us)
  //   }
  // }, [])
  return (
    <Router>
    <Routes>
      {/* <Route exact path="/" element={<HomeComponent user={user} setuser={setuser}/>} />
      <Route exact path="/quiz/:category/:difficulty" element={<QuizComponent />} />
      <Route exact path="/over/:score" element={<ReviewComponent />}/>
      <Route path="login" element={<Login setuser={setuser}/>} />
      <Route path="signup" element={<Signup/>} /> */}
      <Route exact path="/" element={<HomeComponent/>}/>
      <Route exact path="/addcar" element={<AddCar/>}/>
    </Routes>
  </Router>
  );
}

export default App;

