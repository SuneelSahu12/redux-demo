const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    error:''
}

const FATCH_USERS_REQUEST = 'FATCH_USERS_REQUEST'
const FATCH_USERS_SUCCESS = 'FATCH_USERS_SUCCESS'
const FATCH_USERS_FAILURE = 'FATCH_USERS_FAILURE'

const fatchUserRequest = () => {
    return {
        type: FATCH_USERS_REQUEST
    }
}

const fetchUserSuccess = users => {
    return {
        type: FATCH_USERS_SUCCESS,
        payload: users
    }
}

const fatchUserFailure = error =>{
    return {
        type: FATCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case FATCH_USERS_REQUEST:
            return {
                ...state,
                loading : true
            }
            
        case FATCH_USERS_SUCCESS:
            return {
                loading:false,
                users: action.payload,
                error:''
            }

        case FATCH_USERS_FAILURE:
            return {
               loading: false,
               users: [],
               error: action.payload     
            }    
    }
}

const fetchUsers = () => {
    return function(dispatch){
        dispatch(fatchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            const users = response.data.map(user => user.id)
            dispatch(fetchUserSuccess(users))
            //response.data is the array of users
        })
        .catch(error => {
            dispatch(fatchUserFailure(error.message))
            // error.message
        })
    }
}
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())





