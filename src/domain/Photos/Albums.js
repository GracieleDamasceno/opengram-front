import React from 'react';
import Header from '../Header/header.component';
import AlbumsComponent from '../../components/albums.component';

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
                                                <a href="/create-album" className="btn btn-primary">Create new photo album</a>
                                            </div>
                                        </div>
                                        <AlbumsComponent />
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