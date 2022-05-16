import Session from 'react-session-api'
import React from 'react';
import api from '../services/Api.js';
import dateFormat from "dateformat";
const basePath = require('../services/Api.js').baseURLHost;

class AlbumsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            thumbnail: "",
            skip: 1,
            totalPages: 0,
            disablePrevious: true,
            disableNext: false
        }
    }

    nextPage = () => {
        if (this.state.skip < this.state.totalPages) {
            this.setState({ skip: this.state.skip + 1 },
                () => this.loadAlbums());
        }
    }

    previousPage = () => {
        if (this.state.skip > 1) {
            this.setState({ skip: this.state.skip - 1 },
                () => this.loadAlbums());
        }
    }

    async loadAlbums() {
        if (this.props.albumsSize === 4) {
            const response = await api.get("/album/user/" + Session.get("id"), { params: { limit: this.props.albumsSize, } });
            const data = response.data;
            for (var album of data) {
                album.thumbnail = basePath + "/album/thumbnail/?album=" + album._id;
            }
            this.setState({ albums: data });
        } else {
            const response = await api.get("/album/user/" + Session.get("id"), { params: { limit: this.props.albumsSize, skip: this.state.skip } });
            const data = response.data.albums;
            const pagination = response.data.pagination;
            if (pagination) {
                this.setState({ totalPages: pagination.totalPages });

                if (this.state.skip === 1) {
                    this.setState({ disablePrevious: true });
                } else if (this.state.skip > 1) {
                    this.setState({ disablePrevious: false });
                }
                if (this.state.skip === this.state.totalPages) {
                    this.setState({ disableNext: true });
                } else {
                    this.setState({ disableNext: false });
                }
            }
            for (var album of data) {
                album.thumbnail = basePath + "/album/thumbnail/?album=" + album._id;
            }
            this.setState({ albums: data });
        }
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
                                        <p className="card-text"><small className="text-muted">{dateFormat(album.creationDate, "mmmm dS yyyy")}</small></p>
                                        <hr></hr>
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
                                {!this.state.disablePrevious ? <button className="page-link" onClick={this.previousPage}>Previous</button> : null}
                            </li>
                            <li className="page-item">
                                {!this.state.disableNext ? <button className="page-link" onClick={this.nextPage}>Next</button> : null}
                            </li>
                        </ul>
                    </nav>
                </div>
            )
        }
    }
}
export default AlbumsComponent;