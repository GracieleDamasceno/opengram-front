import React from 'react';
import api from '../../services/Api.js';
import Header from '../Header/header.component';
import Modal from '../../components/photos-upload.component.js';
import { useParams } from 'react-router-dom';
import dateFormat from "dateformat";

import "lightgallery.js/dist/css/lightgallery.css";
import { LightgalleryProvider } from "react-lightgallery";
import { LightgalleryItem } from "react-lightgallery";

var basePath = require('../../services/Api.js').baseURLHost;

export function withRouter(AlbumDetails) {
    return (props) => {
        const match = { params: useParams() };
        return <AlbumDetails {...props} match={match} />
    }
}

class AlbumDetails extends React.Component {
    state = {
        albumTitle: "",
        albumDescription: "",
        albumCreation: "",
        albumFolder: "",
        albumId: "",
        showModal: false,
        photos: []
    }

    showModal = e => {
        this.setState({
            showModal: !this.state.showModal
        });
        console.log(this.state.showModal)
    };

    async componentDidMount() {
        const resp = await api.get("/album/" + this.props.match.params.id);
        this.setState({ albumTitle: resp.data.albumName });
        this.setState({ albumDescription: resp.data.albumDescription });
        this.setState({ albumCreation: dateFormat(resp.data.albumCreation, "mmmm dS yyyy, h:MM:ss TT") });
        this.setState({ albumFolder: resp.data.albumFolder });
        this.setState({ albumId: resp.data._id });

        const photos = await api.get("/photos/?id=" + this.state.albumId);

        var photosObject = [];

        photos.data.map(async (element) => {
            var photoElement = {};
            photoElement.photo = "/photos/file/?path=" + element.photoPath;
            photoElement.thumbnail = basePath + "/album/thumbnail/?photoThumbnail=" + element._id
            photosObject.push(photoElement);
        })
        this.setState({ photos: photosObject });
        console.log(photosObject)
    }

    render() {
        return (
            <div className="container-fluid">
                <Header />
                <div className="row pt-5 pb-5">
                    <div className="col"></div>
                    <div className="col-8">
                        <div className="bg-white shadow rounded overflow-hidden">
                            <div className="row justify-content-md-center">
                                <div className="col-10 mt-5 mb-5">
                                    <h4>{this.state.albumTitle}</h4>
                                    <hr></hr>
                                    <div className="row">
                                        <p className="text-start"> <b>Created at:</b> {this.state.albumCreation}</p>
                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div className='col-2'></div>
                                        <div className='col-8 text-center text-break'>
                                            {this.state.albumDescription}
                                        </div>
                                        <div className="col-2 mt-5">
                                            <Modal albumLocation={this.state.albumFolder} albumId={this.state.albumId} />
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row row-cols-1 row-cols-md-2 mt-1">
                                        <LightgalleryProvider>
                                            {this.state.photos.map((photoObject, index) => (
                                                <div style={{ maxWidth: "50%", width: "50%", padding: "5px" }} key={index}>
                                                    <LightgalleryItem group="any" src={photoObject.photo} >
                                                        <img src={photoObject.thumbnail} alt="thumbnail" style={{ width: "100%" }} />
                                                    </LightgalleryItem>
                                                </div>
                                            ))}
                                        </LightgalleryProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div >
        );
    }
}

export default withRouter(AlbumDetails);