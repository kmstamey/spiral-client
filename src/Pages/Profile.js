import React, { useState, useEffect } from 'react';
import AuthService from "../Services/auth.service";
import UserService from "../Services/user.service";

import { Header } from '../Components/Header.js';

const Profile = () => {

  const [userName, setUserName] = useState("");
  const [recentSpirals, setRecentSpirals] = useState([]);


  console.log(recentSpirals);
      
  useEffect(async() => {
    let user = AuthService.getCurrentUser();
    if (user) {
      setUserName(user.name);
    }

    console.log('GETTING THE SPIRALS');
    try {
      let results = await UserService.getSpirals();

      console.log(results.data);
      setRecentSpirals(results.data);
    } catch (e) {

    }

  }, []);

  return (
  <div className="App">
    <Header />

    <h1>Profile</h1>

    { (userName ) && (   <h3>Welcome, {userName}</h3> ) }
    { (!userName ) && (   <h3>Not logged in</h3> ) }

    <div className="list">
      {
      recentSpirals.map((x, i) => {
        return (
          <div className="spiral" key={i} >
            {x.startDate}

            <div class="goals">
            {
              x.goals.map((x, i) => {
                return (
                  <div className="goal">{x}</div>
                )
              })
            }

              </div>
          </div>
        );
      })}
    </div>
     
  </div>
  );
}

export default Profile;