import React from 'react';
import api from '../services/Api';
import { Navigate } from "react-router-dom";

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {firstName: "", lastName: "", username: "", email: "", password: "", successfulSignUp: false};
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeFirstName(e) {
        this.setState({ firstName: e.target.value })
    }
    onChangeLastName(e) {
        this.setState({ lastName: e.target.value })
    }
    onChangeUsername(e) {
        this.setState({ username: e.target.value })
    }
    onChangeEmailAddress(e) {
        this.setState({ email: e.target.value })
    }
    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        
        const userLoginObject = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        const sendGetRequest = async () => {
            try {
                const resp = await api.post("/account/join", userLoginObject);     
                if(resp.status === 202){
                    alert("You are successfully registered!");
                    this.setState({ successfulSignUp: true });
                } else {
                    alert(resp.data.error)
                    this.setState({ successfulSignUp: false });
                }
            } catch (error) {
                if(error.response.status === 409){
                    alert(error.response.data.error)
                }else if(error.response.status === 500){
                    alert("Something went wrong on our side. Please, try again later.");
                }
            }
        };       

        sendGetRequest();
        
        this.setState({firstName:"", lastName:"", username:"", email: "", password: ""});
    }

    render() {
        if(this.state.successfulSignUp){
            return <Navigate to = {{ pathname: "/sign-in" }} />;
        }
        return (
            <form onSubmit={this.onSubmit}>
                <h3>Register</h3>
                <hr></hr>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" value={this.state.firstName} onChange={this.onChangeFirstName} className="form-control" id="firstName" placeholder="First name" required/>
                </div>

                <div className="form-group mt-2">
                    <label>Last name</label>
                    <input type="text" value={this.state.lastName} onChange={this.onChangeLastName} className="form-control" id="lastName" placeholder="Last name" required/>
                </div>

                <div className="form-group mt-2">
                    <label>Email</label>
                    <input type="email" value={this.state.email} onChange={this.onChangeEmailAddress} className="form-control" id="email" placeholder="Enter email" required/>
                </div>

                <div className="form-group mt-2">
                    <label>Username</label>
                    <input type="text" value={this.state.username} onChange={this.onChangeUsername} className="form-control" id="username" placeholder="Enter username" required/>
                </div>

                <div className="form-group mt-2">
                    <label>Password</label>
                    <input type="password" value={this.state.password} onChange={this.onChangePassword}  className="form-control" id="password" placeholder="Enter password" required/>
                </div>
                <hr></hr>
                <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>
                <p className="forgot-password text-right"> Already registered? <a href="/sign-in">Log in</a></p>
            </form>
        );
    }
}