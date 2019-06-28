import React , {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Payment extends Component {

    onToken =  (token) =>  {
        this.props.handleToken(token)
    }

    render () {
        return (
            <StripeCheckout
                name = 'Emaily'
                description = '1 credit per US doller.'
                stripeKey = {process.env.REACT_APP_STRIPE_KEY}
                token = {this.onToken}
                label = 'Add credits'
                ComponentClass="btn"
                amount = {500}
            />
        )
    }
}

export default connect(null, actions)(Payment);
