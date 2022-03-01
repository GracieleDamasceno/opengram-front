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
            <div className="col-8">
                <div className="bg-white shadow rounded overflow-hidden">
                    <div className="px-4 pt-1 pb-2 cover bg-info cover-image" style={{ backgroundSize: "cover", backgroundRepeat: "no-repeat" , position:"relative"}}>
                        <div className="row media align-items-end profile-head" style={{ transform: "translateY(5rem)" }}>
                        <div className="profile mr-3">
                          <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" alt="..." width="130" className="rounded mb-2 img-thumbnail"></img>
                        </div>
                          <div className="media-body mb-5">
                              <h4 className="mt-0 mb-0 fw-bold text-white">{Session.get("firstName")} {Session.get("lastName")}</h4>
                              <p className="small mb-4 text-white">@{Session.get("username")}</p>
                              <a href="/update-profile" className="mb-5 btn btn-outline-light btn-sm btn-block">Update profile</a>
                          </div>
                        </div>
                          <div className="p-1 d-flex justify-content-end text-center text-white ">
                          <ul className="list-inline">
                              <li className="list-inline-item">
                                  <h5 className="font-weight-bold mb-0 d-block">215</h5><small className="text-muted"> <i className="fas fa-image mr-1"></i>Photos</small>
                              </li>
                              <li className="list-inline-item">
                                  <h5 className="font-weight-bold mb-0 d-block">745</h5><small className="text-muted"> <i className="fas fa-user mr-1"></i>Followers</small>
                              </li>
                              <li className="list-inline-item">
                                  <h5 className="font-weight-bold mb-0 d-block">340</h5><small className="text-muted"> <i className="fas fa-user mr-1"></i>Following</small>
                              </li>
                          </ul>
                      </div>
                    </div>
                    <div className="px-4 mb-4 py-3 pb-4 mt-5">
                      <div className="row">
                        <div className="col-1"></div>
                          <div className="col-10 p-4 shadow-lg bg-body rounded">
                            <p>
                              This is a text about me. I am very cool and friendly!
                              <br></br>👩🏽‍💻 Software Developer
                              📚 Book worm 
                              🎬 Movie enthusiast 
                              🎧 Music lover 
                              🥔 Couch potato 
                            </p>
                          </div>
                          <div className="col-1"></div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="py-4 px-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h5 className="mb-0">Latest photos</h5><a href="#" className="btn btn-link text-muted">Show all</a>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 mb-2 pr-lg-1"><img src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" className="img-fluid rounded shadow-sm"></img></div>
                            <div className="col-lg-6 mb-2 pl-lg-1"><img src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" className="img-fluid rounded shadow-sm"></img></div>
                            <div className="col-lg-6 pr-lg-1 mb-2"><img src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="" className="img-fluid rounded shadow-sm"></img></div>
                            <div className="col-lg-6 mb-2 pl-lg-1"><img src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" className="img-fluid rounded shadow-sm"></img></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col"></div>
        </div>
      </div>
    );
  }
}