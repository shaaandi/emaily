import React, {Component} from 'react';
import {connect} from 'react-redux';
import Payment from './Payment';

class Header extends Component{
    renderContent () {
        switch (this.props.auth) {
            case null :
                return ;
            case false :
                return (      
                    <li ><a href="/auth/google"> Sign in with Google</a></li>    
                )
            default : 
                return ([
                    <li key='1'><Payment/></li>, 
                    <li style={{margin : '0 10px'}}>Credits : {this.props.auth.credits}</li>,   
                    <li key='2'><a href="/api/logout">Logout</a></li>
                ]
                )
        }


    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Emaily</a>
                    <ul className="right">
                        {this.renderContent()}
        
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps ({auth}) {
    return {auth}
}

export default connect(mapStateToProps,null)(Header);