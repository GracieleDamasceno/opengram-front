import React from 'react';
import Header from '../Header/header.component';
import api from '../../services/Api';
import { Navigate } from "react-router-dom";
import Session from 'react-session-api'

export default class CreateAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onAlbumNameChange = this.onAlbumNameChange.bind(this);
        this.onAlbumDescriptionChange = this.onAlbumDescriptionChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            userId: Session.get("id"),
            albumNumber: Session.get("albumNumber"),
            albumName: "",
            albumPath: Session.get("albumPath"),
            albumDescription: "",
            photo: "",
            wasCreated: false
        }
    }
    onFileChange(e) {
        this.setState({ photo: e.target.files })
    }

    onAlbumNameChange(e) {
        this.setState({ albumName: e.target.value })
    }

    onAlbumDescriptionChange(e) {
        this.setState({ albumDescription: e.target.value })

    }

    onSubmit(e) {
        try {
            e.preventDefault()
            const photosUpload = async () => {
                try {
                    var formData = new FormData();
                    let albumInfo = {
                        user: this.state.userId,
                        albumName: this.state.albumName,
                        albumDescription: this.state.albumDescription,
                        albumNumber: this.state.albumNumber,
                    }

                    formData.append("albumInfo", JSON.stringify(albumInfo));
                    formData.append("photo", this.state.photo[0]);

                    await api({ method: "post", url: "/album/create/", data: formData, headers: { "Content-Type": "multipart/form-data" } });
                    alert("Album successfully created!");
                    this.setState({ wasCreated: true });
                } catch (error) {
                    alert("Something went wrong on our side. Please, try again later.");
                    console.log(JSON.stringify(error));
                }
            };

            photosUpload();

        } catch (error) {
            console.error(error)
            if (error.response.status === 500) {
                alert("Something went wrong on our side. Please, try again later.");
            }
        }
    }
    render() {
        if (this.state.wasCreated) {
            return <Navigate to={{ pathname: "/albums" }} />;
        }
        return (
            <div className="container-fluid">
                <Header />
                <div className="row pt-5 pb-5">
                    <div className="col"></div>
                    <div className="col-8 bg-white shadow rounded">
                        <div className="row justify-content-md-center">
                            <div className="col-10 mt-5 mb-5">
                                <h4>Create Photo Album</h4>
                                <hr></hr>
                                <form className="mt-5 mb-5" onSubmit={this.onSubmit} encType="multipart/form-data">
                                    <div className="mb-5">
                                        <div className="col">
                                            <label htmlFor="albumName" className="form-label">Album Name:</label>
                                            <input type="text" className="form-control" id="albumName" name="albumName" onChange={this.onAlbumNameChange} required />
                                        </div>
                                    </div>
                                    <div className="mb-5 form-floating">
                                        <textarea className="form-control" placeholder="Album Description" id="albumDescription" name="albumDescription" style={{ height: "150px" }} onChange={this.onAlbumDescriptionChange} required />
                                        <label htmlFor="albumDescription">Album Description</label>
                                    </div>
                                    <div className="input-group mb-3">
                                        <label className="input-group-text" htmlFor="photos">Add Album Cover:</label>
                                        <input type="file" className="form-control" id="photos" accept="image/*" name="photo" onChange={this.onFileChange} required />
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-10"></div>
                                        <button type="submit" className="btn btn-primary btn-block col">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}