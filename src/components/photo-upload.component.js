import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../services/Api.js';


export default function PhotoUpload() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const photosUpload = async () => {
                try {
                    var formData = new FormData();
                    let albumInfo = {
                        userId: this.state.userId,
                        albumFolder: this.state.albumFolder
                    }

                    formData.append("albumInfo", JSON.stringify(albumInfo));
                    for (const key of Object.keys(this.state.photos)) {
                        formData.append("photos", this.state.photos[key])
                    }

                    await api({ method: "post", url: "/album/", data: formData, headers: { "Content-Type": "multipart/form-data" } });

                    alert("Photos uploaded successfully!");
                } catch (error) {
                    alert("Something went wrong on our side. Please, try again later.");
                    console.log(JSON.stringify(error))
                }
            };

            photosUpload();

        } catch (error) {
            console.error(error)
            if (error.response.status === 500) {
                alert("Something went wrong on our side. Please, try again later.");
            }
        }
        console.log("Form was submitted, now the modal can be closed");
        handleClose();
      };
    return (
        <>
            <Button variant="primary" onClick={handleShow}>Add Photos</Button>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Media</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit} id="uploadForm">
                <Modal.Body>
                    <input type="file" className="form-control" id="photos" multiple accept="image/*" name="photos" required />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleClose} type="submit" form="uploadForm">Upload Photos</Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}