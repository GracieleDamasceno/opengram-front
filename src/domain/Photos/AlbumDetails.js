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
        showModal: false
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
                                            <Modal />
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row">
                                        Created at: {this.state.albumCreation}
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