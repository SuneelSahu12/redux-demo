const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'
// Action Creater
function buycake(){
    return {
        type:  BUY_CAKE,
        info: 'First redux action'
    }
}

function buyIceCream(){
    return {
        type: BUY_ICECREAM
    }
}

// (previousState, action) => newState

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
     numOfIceCream:20
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type){
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type){
        case BUY_ICECREAM: return {
            ...state,
            numOfIceCream: state.numOfIceCream - 1
        }
        default: return state
    }
}


const rootReducer = combineReducers(
    {
        cake : cakeReducer,
        iceCream : iceCreamReducer
    }
)
const store = createStore(rootReducer,applyMiddleware(logger))
console.log('initial state', store.getState())
const unsubscibe = store.subscribe(() => {})
// const unsubscibe = store.subscribe(() => console.log('Updated state', store.getState()))
store.dispatch(buycake())
store.dispatch(buycake())
store.dispatch(buycake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscibe()


