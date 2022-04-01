import api from '../../services/Api.js';
import React from 'react';
import Header from '../Header/header.component';
import { useParams } from 'react-router-dom';
import Modal from '../../components/photo-upload.component.js';


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
        photos: [],
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
        this.setState({ albumCreation: resp.data.albumCreation });
        this.setState({ albumFolder: resp.data.albumFolder });
        this.setState({ albumId: resp.data._id });

        const photos = await api.get("/photos/?albumFolder=" + this.state.albumFolder + "&id=" + this.state.albumId);
        
        var photosLoaded = [];

        photos.data.map(async (element) => {
            photosLoaded.push("/photos/file/?path=" + element.photoPath);
        })
        this.setState({ photos: photosLoaded });
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
                                    <br></br>
                                    <div className="row">
                                        <div className='col-2'></div>
                                        <div className='col-8 text-center text-break'>
                                            {this.state.albumDescription}
                                        </div>
                                        <div className="col-2">
                                            <Modal albumLocation={this.state.albumFolder} albumId={this.state.albumId} />
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row">
                                        Created at: {this.state.albumCreation}
                                    </div>
                                    <div className="mt-5">
                                        <div className="row row-cols-1 row-cols-md-2">
                                            {this.state.photos.map((photo, index) => (
                                                <div className="col mb-4" key={index}>
                                                    <div className="card shadow p-3 mb-5 bg-white rounded">
                                                        <img src={photo} className="card-img-top" alt="thumbnail" width="750" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
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

export default withRouter(AlbumDetails);