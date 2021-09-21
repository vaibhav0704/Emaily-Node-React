import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'

class Header extends Component {

    renderContent() {
        switch (this.props.auth){
            case null:
                return;
            case false:
                return (
                    <div className="flex justify-between w-60 mr-8">
                        <a href='/auth/google' className="group cursor-pointer 
                            hover:bg-white hover:shadow-lg hover:border-transparent 
                            px-2 mr-4 my-2 border-2 rounded-xl"
                        >
                            <p   className="text-gray-50 mt-2 text-xl  
                                group-hover:text-blue-500 font-medium"
                            >Login with Google</p>
                        </a>
                    </div>
                );
            default:
                return (
                    <div className="flex justify-between w-1/4 mr-8">
                        <div key='1' className="mt-2">
                            <Payments />
                        </div>  
                        <div key='2' className="group cursor-pointer 
                            hover:bg-white hover:shadow-lg hover:border-transparent 
                            px-2 mr-4 my-2 border-2 rounded-xl"
                        >
                            <p   className="text-gray-50 mt-2 text-xl  
                            group-hover:text-blue-500 font-medium"
                        >Credits: {this.props.auth.credits}</p>
                        </div>                                     
                        <a key='3' href='/api/logout' className="group cursor-pointer 
                            hover:bg-white hover:shadow-lg hover:border-transparent 
                            px-2 mr-4 my-2 border-2 rounded-xl"
                        >
                            <p   className="text-gray-50 mt-2 text-xl  
                            group-hover:text-blue-500 font-medium"
                        >Logout</p>
                        </a>     
                    </div>                 
                );            
        }
    }

    render() {
        return (
            <div>
                <div className="flex justify-between bg-gradient-to-r 
                from-green-400 to-blue-500 shadow-md"
                >
                    <Link 
                        to={this.props.auth ? '/surveys' : '/'} 
                        className="text-white text-5xl font-thin ml-4 my-2"
                    >
                        Emaily
                    </Link>    
                    {this.renderContent()}
                </div>
            </div>
        )
    }
}

const mapState = ({ auth }) => {
    return { auth }
}

export default connect(mapState)(Header)