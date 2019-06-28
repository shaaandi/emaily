import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';

function DashBoard () {
    return  (
        <h2>DashBoard</h2>
    )
}

class App extends Component {

    componentDidMount() {
        
        this.props.fetchUser()
    }

    render () { 
        return (
            <div>
                <BrowserRouter>
                    <Header/>
                    <Route path='/surveys' component={DashBoard}/>
                    <Route exact path="/" component={Landing}/>
                </BrowserRouter>
            </div>
        );
    }
}


export default connect(null, actions)(App)