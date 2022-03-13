import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import playerReducer from './reducers/playerReducer'

const reducers = combineReducers({
  player: playerReducer
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store
