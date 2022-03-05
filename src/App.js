import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Profile from "./domain/User/Profile.js"
import UpdateProfile from "./domain/User/UpdateProfile.js"
import Albums from "./domain/Photos/Albums.js"
import CreateAlbum from "./domain/Photos/CreateAlbum.js"

function App() {  
  return (<Router>
    <div className="App">
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/create-album" element={<CreateAlbum />} />
          </Routes>
    </div></Router>
  );
}

export default App;
