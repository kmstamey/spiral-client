import { React, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home.js';
import SignUp from './Pages/SignUp.js';
import SignIn from './Pages/SignIn.js';
import Profile from './Pages/Profile.js';
import EditProfile from './Pages/EditProfile.js';
import Goals from './Pages/Goals.js';
import MyFriends from './Pages/MyFriends.js';
import StartTimer from './Pages/StartTimer.js';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/profile' component={Profile}/>
          <Route path='/editprofile' component={EditProfile}/>
          <Route path='/goals' component={Goals}/>
          <Route path='/friends' component={MyFriends}/>
          <Route path='/starttimer' component={StartTimer}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
