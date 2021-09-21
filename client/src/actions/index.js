// *************************{2}*************************
// when the action creator is called it has direct access to the 
// dispatch function which calls all the reducers.
// here the the dispatch calls the reducer and gives it a type of fetch_user
// and a payload of res that is recieved by axios api call

import axios from 'axios'
import { FETCH_USER } from './types'

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    dispatch({ type: FETCH_USER, payload: res.data });
}

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
}