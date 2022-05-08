import Session from 'react-session-api'
import React from 'react';
import api from '../services/Api.js';
const basePath = require('../services/Api.js').baseURLHost;

export default class AlbumsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            thumbnail: "",
            skip: 1,
            disablePrevious: true
        }
    }

    nextPage = async () => {
        this.setState({skip: this.state.skip + 1});
        this.loadAlbums();
    }

    previousPage = async () => {
        if (this.state.skip > 1) {
            this.setState({skip: this.state.skip - 1});
        }
        this.loadAlbums();
    }

    async loadAlbums() {
        var albumsInfo;
        var completeAlbums = [];

        if (this.props.albumsSize === 4) {
            albumsInfo = await api.get("/album/user/" + Session.get("id"), { params: { limit: this.props.albumsSize, } });
        } else {
            albumsInfo = await api.get("/album/user/" + Session.get("id"), { params: { limit: this.props.albumsSize, skip: this.state.skip } });
        }

        const data = albumsInfo.data;
        for (var album of data) {
            album.thumbnail = basePath + "/album/thumbnail/?album=" + album._id;
            completeAlbums.push(album);
        }
        this.setState({ albums: data });
    }

    async componentDidMount() {
        this.loadAlbums()
    }
    render() {
        if (this.props.albumsSize === 4) {
            return (
                <div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2">
                        {this.state.albums.map((album, index) => (
                            <div className="col mb-4" key={index}>
                                <div className="card shadow p-3 mb-5 bg-white rounded">
                                    <img src={album.thumbnail} className="card-img-top" alt="thumbnail" width="750" />
                                    <div className="card-body">
                                        <h5 className="card-title">{album.name}</h5>
                                        <p className="card-text overflow-hidden d-inline-block text-truncate" style={{ maxWidth: "100%" }}>{album.description}</p>
                                        <a href={'/album/' + album._id} alt="Album Thumbnail" className="stretched-link" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="row row-cols-1 row-cols-md-3">
                        {this.state.albums.map((album, index) => (
                            <div className="col mb-4" key={index}>
                                <div className="card shadow p-3 mb-5 bg-white rounded">
                                    <img src={album.thumbnail} className="card-img-top" alt="thumbnail" width="750" />
                                    <div className="card-body">
                                        <h5 className="card-title">{album.name}</h5>
                                        <p className="card-text overflow-hidden d-inline-block text-truncate" style={{ maxWidth: "100%" }}>{album.description}</p>
                                        <a href={'/album/' + album._id} className="stretched-link" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <nav aria-label="Album Navigation">
                        <ul className="pagination justify-content-end">
                            <li className="page-item">
                                <button className="page-link" onClick={this.previousPage}>Previous</button>
                            </li>
                            <li className="page-item">
                                <button className="page-link" onClick={this.nextPage}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )
        }
    }
}