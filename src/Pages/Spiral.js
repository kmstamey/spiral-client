import React, { Component } from 'react';
import UserService from "../Services/user.service";

import { Header } from '../Components/Header.js';
import { useHistory } from "react-router-dom";
import {withRouter} from 'react-router-dom';

class Spiral extends React.Component {
  
  async componentDidMount() {
    const spiralId = this.props.match.params.spiralId;

    let results = await UserService.getSpiralById(spiralId);

    console.log('here are the props!;');
    console.log(results);

    this.setState({
      'spiral': results.data
    });

  }

  render() {

    const spiral = (this.state && this.state.spiral ? this.state.spiral : null);

    const self = this;

    async function handleDeleteClick() {
      await UserService.deleteSpiralById(spiral.id);

      //const history = useHistory();
      //const navigateTo = () => history.push('/');//eg.history.push('/login');
      alert('deleted');

      self.props.history.push('/profile');
    }

    return (
      <div className="App">
        <Header />
    
        <h1>Spiral itempage</h1>

        { (spiral) && (
          <div>
            <h1>{spiral.startDate}</h1>
            <p>{spiral.goals[0]}</p>
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
        ) }
        
    
      </div>
    )
  }
}

export default withRouter(Spiral);