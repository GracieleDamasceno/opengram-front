import React from 'react';

export default class Login extends React.Component {
    render() {
        return (
            <div className='container'>
                <form>
                    <h3>Log in</h3>
                    <hr></hr>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group mt-2">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
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