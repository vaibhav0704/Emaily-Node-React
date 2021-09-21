import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../actions'

import Header from './Header'
import Landing from './Landing'

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component {

  // **************{1}***************
  // As soon as the component mounts the fetchUser() which is 
  // an aciton creator is also called 
  // Go to actions directory
  // inside the fetchUser function we also dispatch directly and that is 
  // redux thunk does
  componentDidMount() {
    this.props.fetchUser();
  }

  render(){
    return (
      <div className="App">     
        <Router>
          <div>
            <Header />          
            <Route exact path='/' component={Landing} />
            <Route exact path='/surveys' component={Dashboard} />            
            <Route path='/surveys/new' component={SurveyNew} />          
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, actions)(App);