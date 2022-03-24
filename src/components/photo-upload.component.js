import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';

export default function PhotoUpload() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>Add Photos</Button>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Media</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" className="form-control" id="photos" multiple accept="image/*" name="photos" required />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleClose}>Upload Photos</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}