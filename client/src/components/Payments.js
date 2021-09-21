import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Payments extends Component {
    render() {
        

        return (
            <div>
                <StripeCheckout 
                    name='Emaily'
                    description='₹5 for 5 survey credits'
                    amount={500}
                    currency="INR"
                    token={token => this.props.handleToken(token)}
                    stripeKey={process.env.REACT_APP_STRIPE_KEY}
                >
                    <button className='border-2 rounded-xl hover:border-white 
                        hover:text-gray-50 text-blue-500 px-4 py-2 text-xl 
                        bg-white hover:bg-transparent shadow-lg border-transparent
                        focus:border-0 focus:ring-0'
                    >Add Credits</button>
                </StripeCheckout>
            </div>
        )
    }
}

export default connect(null, actions)(Payments)