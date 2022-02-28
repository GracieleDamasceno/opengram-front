import React from 'react';
import Session from 'react-session-api'
import Header from '../Header/header.component';

export default class Profile extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header/>
        <div className="row pt-5 pb-5">
          <div className="col"></div>
            <div className="col-8 bg-white shadow rounded">
                <div className="row justify-content-md-center">
                    <div className="col-8">
                        <form className="mt-5 mb-5">
                            <h3>Update Profile</h3>
                            <hr></hr>
                            <br></br>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"></input>
                            </div>
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col">
                                        <label for="exampleInputPassword1" className="form-label">First Name</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1"></input> 
                                    </div>
                                    <div className="col">
                                        <label for="exampleInputPassword1" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1"></input> 
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="row">
                                    <div className="col-8">
                                    <label for="exampleInputPassword1" className="form-label">Username</label>
                                        <div className="input-group">
                                            <span class="input-group-text" id="basic-addon1">@</span>                                        
                                            <input type="text" className="form-control" id="exampleInputPassword1"></input> 
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label for="exampleInputPassword1" className="form-label">Birthday</label>
                                        <input type="date" className="form-control" id="exampleInputPassword1"></input> 
                                    </div>
                                </div>
                            </div>
                            <div class="mb-5 form-floating">
                                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}}></textarea>
                                <label for="floatingTextarea2">About</label>
                            </div>
                            <div class="mb-3">
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="inputGroupFile02">Update Profile Photo</label>
                                <input type="file" class="form-control" id="inputGroupFile02"></input>
                            </div>                            
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="inputGroupFile02">Update Cover Photo</label>
                                <input type="file" class="form-control" id="inputGroupFile02"></input>
                            </div>
                            </div>
                            <br></br>
                            <button type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col"></div>
        </div>
      </div>
    );
  }
}