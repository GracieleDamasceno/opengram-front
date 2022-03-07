import React from 'react';
import Header from '../Header/header.component';
import api from '../../services/Api';
import { Navigate } from "react-router-dom";

export default class CreateAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            albumName: "",
            albumDescription: "",
            photos: "",
            wasCreated: false
        }
    }
    onFileChange(e) {
        this.setState({ photos: e.target.files })
    }

     onSubmit(e) {
            try {
                e.preventDefault()
                var formData = new FormData();
                for (const key of Object.keys(this.state.photos)) {
                    formData.append('photos', this.state.photos[key])
                }
                formData.append("albumName", this.state.albumName);
                formData.append("albumDescription", this.state.albumDescription);

                console.log(formData)
                const albumCreation = api.post("/album/create", formData);
                //console.log(albumCreation);
                alert("Album successfully created!");
                //this.state.wasCreated = true;
            } catch (error) {
                console.error(error)
                if (error.response.status === 500) {
                    alert("Something went wrong on our side. Please, try again later.");
                }
            }
        }
render(){
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
                            <br></br>
                            <form className="mt-5 mb-5" onSubmit={this.onSubmit} encType="multipart/form-data">
                                <div className="mb-5">
                                    <div className="col">
                                        <label htmlFor="albumName" className="form-label">Album Name:</label>
                                        <input type="text" className="form-control" id="albumName" name="albumName" defaultValue={this.state.albumName} />
                                    </div>
                                </div>
                                <div className="mb-5 form-floating">
                                    <textarea className="form-control" placeholder="Album Description" id="albumDescription" name="albumDescription" style={{ height: "150px" }} defaultValue={this.state.albumDescription} />
                                    <label htmlFor="albumDescription">Album Description</label>
                                </div>
                                <div className="input-group mb-3">
                                        <label className="input-group-text" htmlFor="photos">Add Photos:</label>
                                        <input type="file" className="form-control" id="photos" multiple="multiple" accept="image/*" name="photos" onChange={this.onFileChange}/>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
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