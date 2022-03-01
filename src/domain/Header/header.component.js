import React from "react";
import api from '../../services/Api';
import { Link, Navigate } from "react-router-dom";
import Session from 'react-session-api';

export default function HeaderLogin() {
    const logout = async () => {
        Session.clear();
        const resp = await api.post("/account/logout");
    }

    if (Object.keys(Session.items()).length === 0){
        return (<Navigate to = {{ pathname: "/sign-in" }} />);
    } else {
        return(
            <div className="navigation pb-5">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                    <Link className="navbar-brand" to={"/sign-in"}>Opengram</Link>
                    <div className="collapse navbar-collapse" id="navbar-main-white">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/"}>Home</Link>
                            </li>                        
                            <li className="nav-item">
                                <Link className="nav-link" to={"/profile"}>Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/"}>Discover</Link>
                            </li>  
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/sign-in"} onClick={() => logout()}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                    </div>
                </nav>
            </div>
        )
    } 
}