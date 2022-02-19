import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Profile from "./domain/User/Profile.js"
import Header from "./domain/Header/Header.js"

function App() {  
  return (<Router>
    <div className="App">
      <Header />
        <div className="outer">
        <div className="inner">
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
