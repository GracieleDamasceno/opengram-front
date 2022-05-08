import React from 'react';
import Session from 'react-session-api'
import Header from '../Header/header.component';
import AlbumsComponent from '../../components/albums.component';
const basePath = require('../../services/Api.js').baseURLHost;

export default class Profile extends React.Component {
  render() {
    const randomCoverPhoto = Session.get("randomCoverPhoto") === "true";
    const coverPhotoUrl = basePath + '/photos/cover/?user=' + Session.get('id');
    const profilePhotoUrl = basePath + '/photos/profile/?user=' + Session.get('id');
    const styles = {
      randomCoverImage:{
        backgroundImage: randomCoverPhoto ? "linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.9)), url('https://source.unsplash.com/random/800x600')" :  
        "linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.9)), url('"+coverPhotoUrl+"')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", 
        position: "relative"
      }
    };
    return (
      <div className="container-fluid">
        <Header />
        <div className="row pt-5 pb-5">
          <div className="col"></div>
          <div className="col-8">
            <div className="bg-white shadow rounded overflow-hidden">
              <div className="px-4 pt-1 pb-2 cover bg-info" style={styles.randomCoverImage}>
                <div className="row media align-items-end profile-head" style={{ transform: "translateY(5rem)" }}>
                  <div className="profile mr-3">
                    <img src={profilePhotoUrl} alt="..." width="130" className="rounded mb-2 img-thumbnail"></img>
                  </div>
                  <div className="media-body mb-5">
                    <h4 className="mt-0 mb-0 fw-bold text-white">{Session.get("firstName")} {Session.get("lastName")}</h4>
                    <p className="small mb-4 text-white">@{Session.get("username")}</p>
                    <a href="/update-profile" className="mb-5 btn btn-outline-light btn-sm btn-block">Update profile</a>
                  </div>
                </div>
                <div className="p-1 d-flex justify-content-end text-center text-white">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <h5 className="font-weight-bold mb-0 d-block">{Session.get("albumsNumber")}</h5><small className="text-muted"> <i className="fas fa-image mr-1"></i>Albums</small>
                    </li>
                    <li className="list-inline-item">
                      <h5 className="font-weight-bold mb-0 d-block">{Session.get("photosNumber")}</h5><small className="text-muted"> <i className="fas fa-user mr-1"></i>Photos</small>
                    </li>
                    <li className="list-inline-item">
                      <h5 className="font-weight-bold mb-0 d-block">{Session.get("videosNumber")}</h5><small className="text-muted"> <i className="fas fa-user mr-1"></i>Videos</small>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="py-4 px-4 mt-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="mb-0">Latest Albums</h5><a href="/albums" className="btn btn-link text-muted">Show all</a>
                </div>
                <div className="row">
                  <AlbumsComponent albumsSize={4} />
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