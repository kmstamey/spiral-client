import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export class Header extends Component {

  render() {
    return(
      <header className="mainHeader">
          <figure>Spiral</figure>
          <nav>
            <Link to={'./'}>
                Home
            </Link>  
        <Link to={'./signup'}>
            
                SignUp
            
        </Link>     
        <Link to={'./signin'}>
            
                SignIn
            
        </Link>  
        <Link to={'./profile'}>
            
                Profile
            
        </Link>
        <Link to={'./editprofile'}>
            
                EditProfile
            
        </Link>
        <Link to={'./goals'}>Goals</Link>
        <Link to={'./friends'}>
            
                MyFriends
            
        </Link>
        <Link to={'./starttimer'}>
            
                StartTimer
            
        </Link>
          </nav>
        </header>
    )
  }

}
