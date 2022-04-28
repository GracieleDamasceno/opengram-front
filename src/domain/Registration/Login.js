import React from 'react';
import api from '../../services/Api';
import { Navigate } from "react-router-dom";
import Session from 'react-session-api';
import Header from "../Header/header-no-login.component.js"

Session.config({ browserStorage: true, timeout: 1440 });

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        if(Object.keys(Session.items()).length > 0){
            this.state = {username: "", password: "", isSignedUp: true};

        } else {
            this.state = {username: "", password: "", isSignedUp: false};

        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value })
    }
    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        const userLoginObject = {
            username: this.state.username,
            password: this.state.password
        };

        const sendGetRequest = async () => {
            try {
                const resp = await api.post("/account/sign-in", userLoginObject);
                console.log(resp.data)
                Session.set("id", resp.data.userId);
                Session.set("firstName", resp.data.firstName);
                Session.set("lastName", resp.data.lastName);
                Session.set("username", resp.data.username);
                Session.set("albumPath", resp.data.albumPath);
                Session.set("albumNumber", resp.data.albumNumber);
                Session.set("photoNumber", resp.data.photoNumber);
                Session.set("videosNumber", resp.data.videosNumber);
                this.setState({ isSignedUp: true });
            } catch (error) {
                if(error.response.status === 401){
                    alert("Wrong password or username!");
                }else if(error.response.status === 500){
                    alert("Something went wrong on our side. Please, try again later.");
                }
            }
        };       

        sendGetRequest();
        
        this.setState({username: "", password: ""})
    }

    render() {
        if(this.state.isSignedUp){
            return <Navigate to = {{ pathname: "/profile" }} />;
        }
        return (
            <div className="outer">
                <Header />
                <div className="inner">
                    <div className='container'>
                        <form onSubmit={this.onSubmit}>
                            <h3>Log in</h3>
                            <hr></hr>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="username" value={this.state.username} onChange={this.onChangeUsername} className="form-control" id="username" placeholder="Enter username" required/>
                            </div>

                            <div className="form-group mt-2">
                                <label>Password</label>
                                <input type="password" value={this.state.password} onChange={this.onChangePassword} className="form-control" id="password" placeholder="Enter password" required/>
                            </div>

                            <div className="form-group mt-2">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" /> 
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="form-group mt-2">
                                <button type="submit" className="btn btn-success btn-lg float-right">Sign in</button>
                            </div>
                            <p className="forgot-password text-right">Forgot <a href="#">password?</a></p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}