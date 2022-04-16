import React from 'react';
import Session from 'react-session-api';
import { Navigate } from "react-router-dom";
import Header from '../Header/header.component';
import api from '../../services/Api';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const UpdateProfile = () => {
    const formik = useFormik({
        initialValues: {
            id: Session.get("id"),
            email: Session.get("email"),
            firstName: Session.get("firstName"),
            lastName: Session.get("lastName"),
            username: Session.get("username"),
            profilePhoto: "",
            coverPhoto: "",
            wasUpdated: false,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            username: Yup.string()
                .max(30, 'Username must be 30 characters or less')
                .required('Required')
        }),
        onSubmit: async (values) => {
            try {
                const update = await api.patch("/profile/update", values);
                Session.set("firstName", update.data.firstName);
                Session.set("lastName", update.data.lastName);
                Session.set("username", update.data.username);
                Session.set("email", update.data.email);
                alert("Profile successfully updated!");
                formik.values.wasUpdated = true;
            } catch (error) {
                if (error.response.status === 500) {
                    alert("Something went wrong on our side. Please, try again later.");
                }
            }
        },
    });

    if (formik.values.wasUpdated) {
        return <Navigate to={{ pathname: "/profile" }} />;
    }
    return (
        <div className="container-fluid">
            <Header />
            <div className="row pt-5 pb-5">
                <div className="col"></div>
                <div className="col-8 bg-white shadow rounded">
                    <div className="row justify-content-md-center">
                        <div className="col-6">
                            <form className="mt-5 mb-5" onSubmit={formik.handleSubmit}>
                                <h4>Update Profile</h4>
                                <hr></hr>
                                <br></br>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address:</label>
                                    <input type="email" className="form-control" id="email" name="email" defaultValue={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                                    {formik.touched.email && formik.errors.email ? (<div className="alert alert-danger d-flex align-items-center" role="alert">{formik.errors.email}</div>) : null}
                                </div>
                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="firstName" className="form-label">First Name:</label>
                                            <input type="text" className="form-control" id-="firstName" name="firstName" defaultValue={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                                            {formik.touched.firstName && formik.errors.firstName ? (<div className="alert alert-danger d-flex align-items-center" role="alert">{formik.errors.firstName}</div>) : null}
                                        </div>
                                        <div className="col">
                                            <label htmlFor="lastName" className="form-label">Last Name:</label>
                                            <input type="text" className="form-control" id="lastName" name="lastName" defaultValue={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                                            {formik.touched.lastName && formik.errors.lastName ? (<div className="alert alert-danger d-flex align-items-center" role="alert">{formik.errors.lastName}</div>) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <div className="col">
                                        <label htmlFor="username" className="form-label">Username:</label>
                                        <div className="input-group">
                                            <span className="input-group-text" id="basic-addon1">@</span>
                                            <input type="text" className="form-control" id="username" name="username" defaultValue={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                                        </div>
                                        {formik.touched.username && formik.errors.username ? (<div className="alert alert-danger d-flex align-items-center" role="alert">{formik.errors.username}</div>) : null}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="input-group mb-4">
                                        <label className="input-group-text" htmlFor="profilePhoto">Update Profile Photo:</label>
                                        <input type="file" className="form-control" id="profilePhoto" accept="image/*" name="profilePhoto" onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                                    </div>
                                    <div className="input-group mb-3">
                                        <label className="input-group-text" htmlFor="profileCover">Update Cover Photo:</label>
                                        <input type="file" className="form-control" id="profileCover" accept="image/*" name="profileCover" onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                                    </div>
                                </div>
                                <br></br>
                                <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={formik.handleSubmit}>Submit</button>
                            </form>
                        </div>
                    </div>

                </div>
                <div className="col"></div>

            </div>
        </div>
    );
}
export default UpdateProfile;