import React from 'react';
import Header from '../Header/header.component';
import AlbumsComponent from '../../components/albums.component';
import "bootstrap-icons/font/bootstrap-icons.css";


export default class Albums extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header />
                <div className="row pt-5 pb-5">
                    <div className="col"></div>
                    <div className="col-8">
                        <div className="bg-white shadow rounded overflow-hidden">
                            <div className="row justify-content-md-center">
                                <div className="col-10 mt-5 mb-5">
                                    <h4>Photo Albums</h4>
                                    <hr></hr>
                                    <br></br>
                                    <div className="container">
                                        <div className="row">
                                            <div className="d-flex flex-row-reverse mb-5">
                                                <a href="/create-album" className="btn btn-primary"><i class="bi bi-plus-lg"></i></a>
                                            </div>
                                        </div>
                                        <AlbumsComponent albumsSize={"9"}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}