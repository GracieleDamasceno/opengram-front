import React from 'react';
import Session from 'react-session-api';
import Header from '../Header/header.component';
import { Navigate } from "react-router-dom";
import api from '../../services/Api';
import PasswordStrengthBar from 'react-password-strength-bar';
const bcrypt = require("bcryptjs");

class UpdateProfile extends React.Component {

    constructor(props) {
        
        super(props);
        this.state = {
            id: Session.get("id"),
            firstName: Session.get("firstName"),
            lastName: Session.get("lastName"),
            username: Session.get("username"),
            randomCoverPhoto: (Session.get("randomCoverPhoto") === "true") ,
            password: "",
            profilePhoto: null,
            coverPhoto: null,
            wasUpdated: false,
        }
        console.log(this.state.randomCoverPhoto)
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeProfilePhoto = this.onChangeProfilePhoto.bind(this);
        this.onChangeCoverPhoto = this.onChangeCoverPhoto.bind(this);
        this.onChangeRandomCoverPhoto = this.onChangeRandomCoverPhoto.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }
    onChangeFirstName(e) {
        this.setState({ firstName: e.target.value });
    }
    onChangeLastName(e) {
        this.setState({ lastName: e.target.value });
    }
    onChangeUsername(e) {
        this.setState({ username: e.target.value });
    }
    onChangeProfilePhoto(e) {
        let files = e.target.files[0];
        this.setState({ profilePhoto: files });
    }
    onChangeCoverPhoto(e) {
        let files = e.target.files[0];
        this.setState({ coverPhoto: files });
    }
    onChangeRandomCoverPhoto(e) {
        this.setState({ randomCoverPhoto: !this.state.randomCoverPhoto });
    }

    async onSubmit(e) {
        e.preventDefault();
        const values = {
            id: this.state.id,
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            randomCoverPhoto: this.state.randomCoverPhoto
        };

        if (this.state.password !== "") {
            values.password = await bcrypt.hash(this.state.password, 10);
        }

        const sendGetRequest = async () => {
            try {
                const update = await api.patch("/profile/update", values);
                Session.set("firstName", update.data.firstName);
                Session.set("lastName", update.data.lastName);
                Session.set("username", update.data.username);
                Session.set("randomCoverPhoto", update.data.randomCoverPhoto);

                let albumInfo = {
                    user: this.state.id
                }

                if (this.state.coverPhoto !== null) {
                    var formDataCoverPhoto = new FormData();

                    formDataCoverPhoto.append("albumInfo", JSON.stringify(albumInfo));
                    formDataCoverPhoto.append("photos", this.state.coverPhoto);
                    console.log(this.state.coverPhoto)
                    console.log("this.state.coverPhoto")

                    await api({ method: "post", url: "/photos/cover", data: formDataCoverPhoto, headers: { "Content-Type": "multipart/form-data" } });
                }

                if (this.state.profilePhoto !== null) {
                    var formDataProfilePhoto = new FormData();

                    formDataProfilePhoto.append("albumInfo", JSON.stringify(albumInfo));
                    formDataProfilePhoto.append("photos", this.state.profilePhoto);

                    await api({ method: "post", url: "/photos/profile", data: formDataProfilePhoto, headers: { "Content-Type": "multipart/form-data" } });
                }

                alert("Profile successfully updated!");
                this.setState({ wasUpdated: true });

            } catch (error) {
                if (error.response.status === 500) {
                    alert("Something went wrong on our side. Please, try again later.");
                }
            }
        };
        sendGetRequest();
    }

    render() {
        if (this.state.wasUpdated) {
            return <Navigate to={{ pathname: "/profile" }} />;
        }
        const { password } = this.state;

        return (
            <div className="container-fluid" >
                <Header />
                <div className="row pt-5 pb-5">
                    <div className="col"></div>
                    <div className="col-8 bg-white shadow rounded">
                        <div className="row justify-content-md-center">
                            <div className="col-8">
                                <form className="mt-5 mb-5" onSubmit={this.onSubmit}>
                                    <h4>Update Profile</h4>
                                    <hr></hr>
                                    <br></br>
                                    <div className="mb-3">
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="firstName" className="form-label">First Name:</label>
                                                <input type="text" className="form-control" id-="firstName" name="firstName" onChange={this.onChangeFirstName} defaultValue={this.state.firstName}></input>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="lastName" className="form-label">Last Name:</label>
                                                <input type="text" className="form-control" id="lastName" name="lastName" onChange={this.onChangeLastName} defaultValue={this.state.lastName}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="username" className="form-label">Username:</label>
                                                <div className="input-group">
                                                    <span className="input-group-text" id="basic-addon1">@</span>
                                                    <input type="text" className="form-control" id="username" name="username" onChange={this.onChangeUsername} defaultValue={this.state.username}></input>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="password" className="form-label">New Password:</label>
                                                <input type="password" className="form-control" id="password" name="password" onChange={this.onChangePassword} value={password}></input>
                                                <PasswordStrengthBar password={password} minLength={4} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 mt-5">
                                        <div className="input-group mb-4">
                                            <label className="input-group-text" htmlFor="profilePhoto">Update Profile Photo:</label>
                                            <input type="file" className="form-control" id="profilePhoto" accept="image/*" name="profilePhoto" onChange={this.onChangeProfilePhoto} ></input>
                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="randomCoverPhoto" onClick={this.onChangeRandomCoverPhoto} defaultValue={this.state.randomCoverPhoto} defaultChecked={this.state.randomCoverPhoto} />
                                                <label className="form-check-label" htmlFor="randomCoverPhoto"> Use random cover photos (Provided by unsplash.com. Requires internet connection.) </label>
                                            </div>
                                        </div>
                                        <div className="input-group mb-3">
                                            <label className="input-group-text" htmlFor="coverPhoto">Update Cover Photo:</label>
                                            <input type="file" className="form-control" id="coverPhoto" accept="image/*" name="coverPhoto" disabled={this.state.randomCoverPhoto} onChange={this.onChangeCoverPhoto}></input>
                                        </div>
                                    </div>
                                    <br></br>
                                    <button type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
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
export default UpdateProfile;