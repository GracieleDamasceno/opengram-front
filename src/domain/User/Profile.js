import React from 'react';
import Session from 'react-session-api'
import { Navigate } from "react-router-dom";


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSignedUp: true };
}
 
  onLogout = e =>{
    e.preventDefault();
    console.log("Logging out");
    Session.clear();
    this.setState({ isSignedUp: false });
  }

  render() {
    if(!this.state.isSignedUp){
      return <Navigate to = {{ pathname: "/sign-in" }} />;
  }
    return (
      <div>
        <h1>Profile</h1>
        <p>This is your profile, {Session.get("username")}!</p>
        <p className="text-right"><a href="/sign-in" onClick={this.onLogout}>Log out</a></p>
      </div>
    );
  }
}