import React from 'react';
import Session from 'react-session-api'
import Header from '../Header/header.component';
import api from '../../services/Api';
import { Navigate } from "react-router-dom";
import { useFormik } from 'formik';

const CreateAlbum = () => {
    const formik = useFormik({
        initialValues: {
            albumName: "",
            albumDescription: "",
            photos: "",
            wasCreated: false,
        },
        onSubmit: async (values) => {
            try {
                const albumCreation = await api.post("/album/create", values);
                console.log(albumCreation);
                alert("Album successfully created!");
                formik.values.wasCreated = true;
            } catch (error) {
                if (error.response.status === 500) {
                    alert("Something went wrong on our side. Please, try again later.");
                }
            }
        },
    });

    if (formik.values.wasCreated) {
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
                            <form className="mt-5 mb-5" onSubmit={formik.handleSubmit}>
                                <div className="mb-5">
                                    <div className="col">
                                        <label htmlFor="albumName" className="form-label">Album Name:</label>
                                        <input type="text" className="form-control" id-="albumName" name="albumName" defaultValue={formik.values.albumName} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                                    </div>
                                </div>
                                <div className="mb-5 form-floating">
                                    <textarea className="form-control" placeholder="Album Description" id="albumDescription" name="albumDescription" style={{ height: "150px" }} defaultValue={formik.values.albumDescription} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    <label htmlFor="albumDescription">Album Description</label>
                                </div>
                                <div className="input-group mb-3">
                                        <label className="input-group-text" htmlFor="photos">Add Photos:</label>
                                        <input type="file" className="form-control" id="photos" multiple="multiple" accept="image/*" name="photos" onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block" onClick={formik.handleSubmit}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
}
export default CreateAlbum;