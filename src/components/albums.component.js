import Session from 'react-session-api'
import React from 'react';
import api from '../services/Api.js';

export default class AlbumsComponent extends React.Component {
    state = {
        albums: [],
        thumbnail: ""
    }
    async componentDidMount() {
        const param = new URLSearchParams({ id: Session.get("id")});
        const resp = await api.get("/album", param.get("id"));
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
    render(){
        return(
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 mb-5">
                {this.state.albums.map((album, index) =>(
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
    }
}