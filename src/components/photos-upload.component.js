import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../services/Api.js';
import "bootstrap-icons/font/bootstrap-icons.css";


export default function PhotoUpload(props) {
    const [show, setShow] = useState(false);
    const [files, setFiles] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleChange(event) {
        setFiles(event.target.files)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const photosUpload = async () => {
                try {
                    var formData = new FormData();
                    let albumInfo = {
                        id: props.albumId,
                        user: props.user
                    }

                    formData.append("albumInfo", JSON.stringify(albumInfo));
                    for (var i = 0; i < files.length; i++) {
                        formData.append("photos", files[i]);
                    }

                    await api({ method: "post", url: "/photo/", data: formData, headers: { "Content-Type": "multipart/form-data" } });
                    
                    alert("Photos uploaded successfully!");
                    window.location.reload();
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
            <Button variant="primary" onClick={handleShow}><i class="bi bi-folder-plus"></i></Button>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Media</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit} id="uploadForm">
                    <Modal.Body>
                        <input type="file" className="form-control" multiple accept="image/*" required onChange={handleChange} />
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