import React from 'react';
import api from '../../services/Api.js';
import Header from '../Header/header.component';
import Modal from '../../components/photos-upload.component.js';
import { useParams } from 'react-router-dom';
import dateFormat from "dateformat";
import Gallery from 'react-grid-gallery';

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
        console.log(photos)

        var photosObject = [];

        photos.data.map(async (element) => {
            var photoElement = {};
            photoElement.src = "/photos/file/?path=" + element.photoPath;
            photoElement.thumbnail = basePath + "/album/thumbnail/?photoThumbnail=" + element._id
            photoElement.thumbnailWidth = element.photoThumbnailWidth;
            photoElement.thumbnailHeight = element.photoThumbnailHeight;
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
                                        <div className='col-4'><p className="text-start"> <b>Created at:</b> {this.state.albumCreation}</p></div>
                                        <div className='col-6'></div>
                                        <div className='col-2'><Modal albumLocation={this.state.albumFolder} albumId={this.state.albumId} /></div>
                                    </div>
                                    <br></br>
                                    <div className="row ">
                                        <div className='col-2'></div>
                                        <div className='col-8 text-center text-break mb-5 mt-5'>
                                            {this.state.albumDescription}
                                        </div>
                                        <div className="col-2 mt-5"></div>
                                    </div>
                                    <br></br>
                                    <Gallery images={this.state.photos} enableImageSelection={false} backdropClosesModal={true} showLightboxThumbnails={true} lightboxWidth={2048} rowHeight={200}/>
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