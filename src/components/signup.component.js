import React from 'react';

export default class SignUp extends React.Component {
    render() {
        return (
            <form>
                <h3>Register</h3>
                <hr></hr>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="First name" />
                </div>

                <div className="form-group mt-2">
                    <label>Last name</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Last name" />
                </div>

                <div className="form-group mt-2">
                    <label>Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" />
                </div>

                <div className="form-group mt-2">
                    <label>Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter username" />
                </div>

                <div className="form-group mt-2">
                    <label>Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" />
                </div>
                <hr></hr>
                <button type="submit" className="btn btn-primary btn-lg btn-block text-right">Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p>
            </form>
        );
    }
}