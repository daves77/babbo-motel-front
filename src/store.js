import React, { useReducer } from 'react'

const SET_USER = 'SET_USER'

const initialState = { user: {} }

export const storeReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      console.log(action.payload.user)
      return { ...state, user: JSON.parse(JSON.stringify(action.payload.user)) }
    default:
      return state
  }
}

export const loadUserAction = (user) => {
  return {
    type: SET_USER,
    payload: { user }
  }
}

export const Context = React.createContext({ store: initialState })
const { Provider } = Context

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialState)
  return <Provider value={{ store, dispatch }}>{children}</Provider>
}
