import Session from 'react-session-api'
import React from 'react';
import api from '../services/Api.js';
var basePath = require('../services/Api.js').baseURLHost;

export default class AlbumsComponent extends React.Component {

    state = {
        albums: [],
        thumbnail: ""
    }
    async componentDidMount() {
        var resp;
        if (this.props.albumsSize === "4") {
            resp = await api.get("/album", { params: { id: Session.get("id"), pagination: this.props.albumsSize, page: 1 } });
        } else {
            resp = await api.get("/album", { params: { id: Session.get("id") } });
        }
        const data = resp.data;
        var fullAlbums = []
        for (var element of data) {
            let url = basePath + "/album/thumbnail/?albumThumbnail=" + element._id;
            element.thumbnail = url;
            fullAlbums.push(element);
        }
        this.setState({ albums: resp.data });
    }
    render() {
        if (this.props.albumsSize === "4") {
            return (
                <div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2">
                        {this.state.albums.map((album, index) => (
                            <div className="col mb-4" key={index}>
                                <div className="card shadow p-3 mb-5 bg-white rounded">
                                    <img src={album.thumbnail} className="card-img-top" alt="thumbnail" width="750" />
                                    <div className="card-body">
                                        <h5 className="card-title">{album.albumName}</h5>
                                        <p className="card-text overflow-hidden d-inline-block text-truncate" style={{maxWidth: "250px"}}>{album.albumDescription}</p>
                                        <a href={'/album/' + album._id} className="stretched-link"/>
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
                                        <h5 className="card-title">{album.albumName}</h5>
                                        <p className="card-text overflow-hidden d-inline-block text-truncate" style={{maxWidth: "250px"}}>{album.albumDescription}</p>
                                        <a href={'/album/' + album._id} className="stretched-link"/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )

        }
    }
}