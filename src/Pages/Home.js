import React, { useState, useEffect } from 'react';
import AuthService from "../Services/auth.service";

import { Header } from '../Components/Header.js';

const Home = () => {

  const [userName, setUserName] = useState("");
      
  useEffect(() => {
    let user = AuthService.getCurrentUser();
    console.log('hoi');
    console.log(user);
    if (user) {
      setUserName(user.name);
    }

  }, []);

  return (
  <div className="App">
    <Header />

    <h1>Home</h1>

    { (userName ) && (   <h3>Welcome, {userName}</h3> ) }
    { (!userName ) && (   <h3>Not logged in</h3> ) }
     
  </div>
  );
}

export default Home;