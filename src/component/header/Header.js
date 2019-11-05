import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
class Header extends Component {
    
    state = {
        homeLink: 'signUp',
        email: '',
        password: ''
    }
    signInChangeHandler = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        this.setState(
            {
                [key]: value
            }
        )  
    }
    signInSubmitHandler = (event) => {
        event.preventDefault();
        const user = {
            email: this.state.email, 
            password: this.state.password
        }
        axios.post('http://localhost:8080/login', user).then(response => {
            //Storing the user's data inside the browser for future use
            const logInUser = response.data;
            localStorage.setItem("loggedInUser", JSON.stringify(logInUser));
            this.setState({homeLink: '/home'})
            //Navigate to home page
            this.props.history.push("/");
        })
        .catch(error => {
        });
    }
    signOut =() => {
        localStorage.removeItem("loggedInUser");
        this.props.history.push("/");
    }
    render() {
        let defaultSignInSignOut = (
            <form onSubmit={this.signInSubmitHandler} className="form-inline mt-2 md-0">
                <input className="form-control mr-sm-2" name="email" value={this.state.email} onChange={this.signInChangeHandler} type="text" placeholder="Email" aria-label="Email"/>
                <input className="form-control mr-sm-2" name="password" value={this.state.password} onChange={this.signInChangeHandler} type="password" placeholder="Password" aria-label="Password"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Log In</button>
            </form>
            )
      if (localStorage.getItem("loggedInUser")){
        defaultSignInSignOut = <button onClick={this.signOut} className="btn btn-outline-success my-2 my-sm-0" type="submit">Log Out</button>
      }    
        return (
            <header className="header-margin-bottom">
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <Link className="navbar-brand" to='/'>Re-Plastic</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            {/* <li className="nav-item active">
                                <Link className="nav-link" to="/aboutUs">About Us <span className="sr-only">(current)</span></Link>
                            </li> */}
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#">Disabled</a>
                            </li> */}
                        </ul>   
                        {defaultSignInSignOut}                     
    </div>
  </nav>
</header>
                );
            }
        }
        
export default Header;