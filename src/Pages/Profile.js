import React, { useState, useEffect } from 'react';
import AuthService from "../Services/auth.service";

import { Header } from '../Components/Header.js';

const Profile = () => {

  const [userName, setUserName] = useState("");
      
  useEffect(() => {
    let user = AuthService.getCurrentUser();
    if (user) {
      setUserName(user.name);
    }

  }, []);

  return (
  <div className="App">
    <Header />

    <h1>Profile</h1>

    { (userName ) && (   <h3>Welcome, {userName}</h3> ) }
    { (!userName ) && (   <h3>Not logged in</h3> ) }
     
  </div>
  );
}

export default Profile;