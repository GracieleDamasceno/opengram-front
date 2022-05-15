import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../services/Api.js';
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AlbumEdit(props) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState(props.albumTitle);
    const [description, setDescription] = useState(props.albumDescription);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleName = (e) => {setName(e.target.value); console.log(name)}
    const handleDescription = (e) => setDescription(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const editAlbum = async () => {
                try {
                   
                    let albumUpdate = {};
                    albumUpdate.name = name;
                    albumUpdate.description = description;

                    console.log(albumUpdate);
                    await api.post("/photo/album/" + props.albumId, albumUpdate);     

                    alert("Album updated successfully!");
                    window.location.reload();
                } catch (error) {
                    alert("Something went wrong on our side. Please, try again later.");
                    console.log(JSON.stringify(error))
                }
            };

            editAlbum();

        } catch (error) {
            console.error(error)
            if (error.response.status === 500) {
                alert("Something went wrong on our side. Please, try again later.");
            }
        }
        handleClose();
    };
    return (
        <>
            <Button variant="info" onClick={handleShow}><i className="bi bi-pencil-square"></i></Button>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Album Information</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit} id="uploadForm">
                    <Modal.Body>
                        <label htmlFor="albumName" className="form-label">Album Name:</label>
                        <input type="text" className="form-control" id="albumName" name="albumName" defaultValue={props.albumTitle} onChange={handleName} required />
                        <br></br>
                        <textarea className="form-control" placeholder="Album Description" id="albumDescription" name="albumDescription" style={{ height: "150px" }} defaultValue={props.albumDescription} onChange={handleDescription} required />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" onClick={handleClose} type="submit" form="uploadForm">Save changes</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}