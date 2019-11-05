import React, { Component } from 'react';
import axios from 'axios';

class signUp extends Component {

    state = {
        user: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }
    signUpSubmitHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/submitUserDetails", this.state.user)
        .then(response => {
            this.props.history.push("/thankYou")
        }).catch(error => {
            //Display error message to the user
        })
    }
    signUpChangeHolder = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        const tempUser = {...this.state.user};
        tempUser[key] = value;
        this.setState(
            {
                user: tempUser
            }
        )
    }
    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }
    render() {
        return (
            <header className="signup">
                <body className="signup-form">
                    <form className="container" onSubmit={this.signUpSubmitHandler}>
                        <img className="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                        <div align="center">
                        <h1 className="h3 mb-3 font-weight-normal">Please sign up!</h1>
                        </div>
                        <label for="firstName" className="sr-only">First Name</label>
                        <input type="text" id="firstName" className="form-control" name="firstName" value={this.state.user.firstName} onChange={this.signUpChangeHolder} placeholder="First Name" required="" autofocus="" /><br></br>
                        <label for="lastName" className="sr-only">Last Name</label>
                        <input type="text" id="lastName" className="form-control" name="lastName" value={this.state.user.lastName} onChange={this.signUpChangeHolder} placeholder="Last Name" required="" autofocus="" /><br></br>
                        <label for="email" className="sr-only">Email Address</label>
                        <input type="email" id="email" className="form-control" name="email" value={this.state.user.email} onChange={this.signUpChangeHolder} placeholder="Email Address" required="" autofocus="" /><br></br>
                        <label for="password" className="sr-only">Password</label>
                        <input type="password" id="password" className="form-control" name="password" value={this.state.user.password} onChange={this.signUpChangeHolder} placeholder="Password" required="" /><br></br>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
                        <br></br>
                        <div align="center">
                        <h6>If you already have an account, please log in at the top right corner of this page.</h6>
                        <p className="mt-5 mb-3 text-muted">© 2019</p>
                        </div>
                    </form>
                </body>
            </header>
        );
    }
}

export default signUp;