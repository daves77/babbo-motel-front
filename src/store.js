import React, { useReducer } from 'react'

const SET_USER = 'SET_USER'
const TOGGLE_MODAL = 'TOGGLE_MODAL'

const initialState = { user: {}, modalOpen: false }

export const storeReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: JSON.parse(JSON.stringify(action.payload.user)) }
    case TOGGLE_MODAL:
      return { ...state, modalOpen: action.payload.state }
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

export const toggleModal = (state) => {
  return {
    type: TOGGLE_MODAL,
    payload: { state }
  }
}

export const Context = React.createContext({ store: initialState })
const { Provider } = Context

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialState)
  return <Provider value={{ store, dispatch }}>{children}</Provider>
}
