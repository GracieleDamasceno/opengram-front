import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return(
        <div className="navigation pb-5">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                <Link className="navbar-brand" to={"/sign-in"}>Opengram</Link>
                <div className="collapse navbar-collapse" id="navbar-main-white">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
        </div>
    )
}

export default Header;