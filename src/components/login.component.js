import React from 'react';
import api from '../services/Api';
import { Navigate } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: "", isSignedUp: false};
        this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
            email: this.state.email,
            password: this.state.password
        };

        const sendGetRequest = async () => {
            try {
                const resp = await api.post("/account/sign-in", userLoginObject);
                if(resp.status === 200){
                    alert("You are in "+ resp.data.username)
                    this.setState({ isSignedUp: true });
                }else{
                    this.setState({ isSignedUp: false });
                }
                console.log(resp.data);
            } catch (error) {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            }
        };       

        sendGetRequest();
        
        this.setState({email: "", password: ""})
    }

    render() {
        if(this.state.isSignedUp){
            return <Navigate to = {{ pathname: "/profile" }} />;
        }
        return (
            <div className='container'>
                <form onSubmit={this.onSubmit}>
                    <h3>Log in</h3>
                    <hr></hr>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={this.state.email} onChange={this.onChangeEmailAddress} className="form-control" id="email" placeholder="Enter email" />
                    </div>

                    <div className="form-group mt-2">
                        <label>Password</label>
                        <input type="password" value={this.state.password} onChange={this.onChangePassword} className="form-control" id="password" placeholder="Enter password" />
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
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </form>
            </div>
        );
    }
}