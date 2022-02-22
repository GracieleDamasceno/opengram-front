import React from 'react';
import Session from 'react-session-api'
import { Navigate } from "react-router-dom";


export default class Profile extends React.Component {
 
  onLogout(e){
    e.preventDefault();
    console.log("Logging out");
    Session.clear();
    return <Navigate to="/sign-in" />
  }

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <p>This is your profile, {Session.get("username")}!</p>
        <p className="text-right"><a href="/sign-in" onClick={this.onLogout}>Log out</a></p>
      </div>
    );
  }
}