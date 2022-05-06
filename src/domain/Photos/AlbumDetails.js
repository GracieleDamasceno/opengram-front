import React from 'react';
import api from '../../services/Api.js';
import Header from '../Header/header.component';
import Modal from '../../components/photos-upload.component.js';
import { useParams, Navigate } from 'react-router-dom';
import dateFormat from "dateformat";
import Gallery from 'react-grid-gallery';
import "bootstrap-icons/font/bootstrap-icons.css";

const basePath = require('../../services/Api.js').baseURLHost;

export function withRouter(AlbumDetails) {
    return (props) => {
        const match = { params: useParams() };
        return <AlbumDetails {...props} match={match} />
    }
}

class AlbumDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            albumTitle: "",
            albumDescription: "",
            albumCreation: "",
            albumId: "",
            showModal: false,
            photos: [],
            wasDeleted: false
        }
        this.deleteAlbum = this.deleteAlbum.bind(this);
    }

    async componentDidMount() {
        const resp = await api.get("/album/" + this.props.match.params.id);
        this.setState({ albumTitle: resp.data.name });
        this.setState({ albumDescription: resp.data.description });
        this.setState({ albumCreation: dateFormat(resp.data.creationDate, "mmmm dS yyyy, h:MM:ss TT") });
        this.setState({ albumId: resp.data._id });
        this.setState({ user: resp.data.owner });

        const photos = resp.data.photos
        var photosObject = [];

        photos.map(async (element) => {
            var photoElement = {};
            photoElement.src = "/photo/file/?album=" + resp.data._id + "&photo=" + element._id;
            photoElement.thumbnail = basePath + "/album/thumbnail/?photo=" + element._id + "&album=" + this.state.albumId
            photoElement.thumbnailWidth = element.thumbnailWidth;
            photoElement.thumbnailHeight = element.thumbnailHeight;
            photosObject.push(photoElement);
        })
        this.setState({ photos: photosObject });
    }

    async deleteAlbum() {
        if (window.confirm("Permanently this album and all of its photos? This operation cannot be undone.")) {
            await api.delete("/album/" + this.state.albumId);
            alert("Album deleted");
            this.setState({ wasDeleted: true })
        }
    }

    render() {
        if (this.state.wasDeleted) {
            return <Navigate to={{ pathname: "/albums" }} />;
        }
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
                                        <div className='col-4'><p className="text-start"> <b>Created at:</b> {this.state.albumCreation}</p></div>
                                        <div className='col-3'></div>
                                        <div className='col-5 d-flex align-items-end justify-content-end'>
                                            <Modal user={this.state.user} albumId={this.state.albumId} />
                                            <button type="button" className="btn btn-info" onClick={this.deleteAlbum}><i class="bi bi-pencil-square"></i></button>
                                            <button type="button" className="btn btn-danger" onClick={this.deleteAlbum}><i class="bi bi-trash3-fill"></i></button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className='col-1'></div>
                                        <div className='lead mt-3'>
                                            <br></br>
                                            <p className='text-justify'>{this.state.albumDescription}</p>
                                        </div>
                                        <div className="col-1"></div>
                                    </div>
                                    <hr></hr>
                                    <br></br>
                                    <Gallery images={this.state.photos} enableImageSelection={false} backdropClosesModal={true} showLightboxThumbnails={true} lightboxWidth={2048} rowHeight={200} />
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