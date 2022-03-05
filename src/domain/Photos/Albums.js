import React from 'react';
import Session from 'react-session-api'
import Header from '../Header/header.component';

export default class Albums extends React.Component {
    render() {
        let items = ['Album title 1', 'Album title 2', 'Album title 3', 'Album title 4', 'Album title 5', 'Album title 6', 'Album title 7', 'Album title 8', 'Album title 9'];
        let itemList = [];
        items.forEach((item, index) => {
            itemList.push(
                <div className="col mb-4">
                    <div className="card">
                        <img src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{item}</h5>
                            <p className="card-text">This is an album about my horse, Eddie.</p>
                        </div>
                    </div>
                </div>)
        });
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
                                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 mb-5">
                                            {itemList}
                                        </div>
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