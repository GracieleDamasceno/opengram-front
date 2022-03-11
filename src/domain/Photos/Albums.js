import React from 'react';
import Session from 'react-session-api'
import Header from '../Header/header.component';
import api from '../../services/Api';

export default class Albums extends React.Component {
    state = {
        albums: [],
        thumbnail: ""
    }

    async componentDidMount() {
        const resp = await api.get("/album");
        const data = resp.data;
        var fullAlbums = []
        for (var element of data) {
            const image = await api.post("/album/thumbnail", { albumFolder: element.albumFolder }, { responseType: 'arraybuffer' })
                .then(resp => {
                    try {
                        return ('data:image/jpeg;base64,' + btoa(
                            new Uint8Array(resp.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                        ));
                    } catch (err) {
                        console.log(err)
                    }
                });
            element.thumbnail = image;
            fullAlbums.push(element);
        }
        this.setState({ albums: resp.data });
    }

    render() {
        const Albums = ({ albums }) => {
            return (
                <div>
                    {albums.map((album, index) =>
                    (
                        <div className="col mb-4" key={index}>
                            <div className="card">
                                <img src={album.thumbnail} className="card-img-top" alt="..." width="750"/>
                                <div className="card-body">
                                    <h5 className="card-title">{album.albumName}</h5>
                                    <p className="card-text">{album.albumDescription}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        };
        return (
            <div className="container-fluid">
                <Header />
                <div className="row pt-5 pb-5">
                    <div className="col"></div>
                    <div className="col-8">
                        <div className="bg-white shadow rounded overflow-hidden">
                            <div className="row justify-content-md-center">
                                <div className="col-10 mt-5 mb-5">
                                    <h4>Photo Albums</h4>
                                    <hr></hr>
                                    <br></br>
                                    <div className="container">
                                        <div className="row">
                                            <div className="d-flex flex-row-reverse mb-5">
                                                <a href="/create-album" className="btn btn-primary">Create new photo album</a>
                                            </div>
                                        </div>
                                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 mb-5">
                                            <Albums albums={this.state.albums} />
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