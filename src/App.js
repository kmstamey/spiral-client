import { React, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import AuthService from "./Services/auth.service";

import Home from './Pages/Home.js';
import Spiral from './Pages/Spiral.js';
import SignUp from './Pages/SignUp.js';
import SignIn from './Pages/SignIn.js';
import Profile from './Pages/Profile.js';
import EditProfile from './Pages/EditProfile.js';
import Goals from './Pages/Goals.js';
import MyFriends from './Pages/MyFriends.js';
import StartTimer from './Pages/StartTimer.js';

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      //setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <Switch>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/spirals/:spiralId' component={Spiral}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/signin' component={SignIn}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/editprofile' component={EditProfile}/>
        <Route path='/goals' component={Goals}/>
        <Route path='/friends' component={MyFriends}/>
        <Route path='/starttimer' component={StartTimer}/>
      </Switch>
    </Switch>
  );
}


/*

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sessionUser: null
    };

  }

  useEffect() {

    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }

  componentDidMount() {
    //authenticationService.currentUser.subscribe(x => this.setState({ sessionUser: x }));
  }

  logout() {
    //authenticationService.logout();
    //history.push('/login');
  }


  render() {

    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
  
    useEffect(() => {
      const user = AuthService.getCurrentUser();
  
      if (user) {
        setCurrentUser(user);
        setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
        setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      }
    }, []);
  
    const logOut = () => {
      AuthService.logout();
    };

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
      </Switch>
    );
  }
}
*/

export default App;
