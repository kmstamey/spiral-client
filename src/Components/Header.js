import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export class Header extends Component {
        constructor(props) {
                super(props);

                this.state = {
                user: null
                };
        }
        
  componentDidMount() {
        this.setState({ 
                user: JSON.parse(localStorage.getItem('user'))
        });
  }

  render() {
    const { user, users } = this.state;

    return(

      <header className="mainHeader">

        <figure>
        <Link to={'./'}>
          Spiral
        </Link>
        </figure>

        
        { (user) && (
                <nav>
                <Link to={'./profile'}>Profile</Link>
                <Link to={'./editprofile'}>Edit profile</Link>
                <Link to={'./friends'}>My Friends</Link>
                <Link to={'./starttimer'}>Start spiral</Link>

                </nav>
        )}

        <div className="user">
          
        { (!user) && (
          <div>
            <Link to={'./signup'}>Register</Link>     
            <Link to={'./signin'}>Sign in</Link>
          </div>
        )}

          { (user) && (
          <div className="current">
                  {user.name}
                  <Link to={'./signin'}>Log out</Link>
          </div>
          ) }

        </div>

        </header>
    )
  }

}
