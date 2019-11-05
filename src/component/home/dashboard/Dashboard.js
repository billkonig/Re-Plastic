import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {

    state = {
        user: {}
    }
    componentDidMount() {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        const email = loggedInUser.email;
        axios.get("http://localhost:8080/findUserById", {
            params: {
                email: email
            }
        }).then(response => {
            this.setState(
                {
                    user: response.data
                }
            )
        })
    }
    render() {

        return (
            <div className="card text-white bg-primary mb-3" style={{ maxWidth: '18rem' }}>
                <div className="card-header">Name: {this.state.user.firstName} {this.state.user.lastName}</div>
                <div className="card-header">Email: {this.state.user.email}</div>
            </div>

        );
    }
}

export default Dashboard;