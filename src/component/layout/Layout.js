import React, { Component } from 'react';
import Header from './../header/Header';
import SignUp from './../signUp/SignUp';
import ThankYou from './../thankYou/ThankYou';
import Home from './../home/Home';
import {Route, withRouter} from 'react-router-dom';
import Search from './../home/dashboard/search/Search';
import List from './../home/list/List';
import Bin from './../home/bin/Bin';

class Layout extends Component {
    render() {
        let routes = (
            <React.Fragment>
                <Route exact path="/" component={SignUp} />
                <Route path="/signUp" component={SignUp} />
            </React.Fragment>            
        );
        if(localStorage.getItem("loggedInUser")){
            routes = (
                <React.Fragment>
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/home" component={Home} />
                </React.Fragment>
            )
        }
        return (
            <div>
                <Header {...this.props}/>
                {routes}
                <Route path="/thankYou" component={ThankYou} />
                <Route path="/list" component={List} />
                <Route path="/bin" component={Bin} />
            </div>
        );
    }
}

export default withRouter(Layout);