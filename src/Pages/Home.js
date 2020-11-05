import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
    <div className="App">
      <h1>Home</h1>
      {/* Link to List.js */}
      <Link to={'./'}>
        <button variant="raised">
            Home
        </button>
      </Link>  
      <Link to={'./signup'}>
        <button variant="raised">
            SignUp
        </button>
      </Link>     
      <Link to={'./signin'}>
        <button variant="raised">
            SignIn
        </button>
      </Link>  
      <Link to={'./profile'}>
        <button variant="raised">
            Profile
        </button>
      </Link>
      <Link to={'./editprofile'}>
        <button variant="raised">
            EditProfile
        </button>
      </Link>
      <Link to={'./goals'}>
        <button variant="raised">
            Goals
        </button>
      </Link>
      <Link to={'./friends'}>
        <button variant="raised">
            MyFriends
        </button>
      </Link>
      <Link to={'./starttimer'}>
        <button variant="raised">
            StartTimer
        </button>
      </Link>
    </div>
    );
  }
}
export default Home;