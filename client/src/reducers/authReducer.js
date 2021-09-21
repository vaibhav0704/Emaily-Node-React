// *********************{3}************************
// here the action is passed to the reducer as fetch_user by the dispatch
// function andd the initial state is at present set to none and it simply 
// returns back the state

import { FETCH_USER } from '../actions/types'

const authReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default: 
            return state;
    }
}

export default authReducer