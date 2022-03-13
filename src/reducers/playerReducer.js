const UPDATE_PLAYER_POSITION = 'UPDATE_PLAYER_POSITION'

export const initialGameState = {}

const playerReducer = (state = initialGameState, action) => {
  switch (action.type) {
    case UPDATE_PLAYER_POSITION:
      return { ...state }
    default:
      return state
  }
}

export const updatePlayerPositon = (player, position) => {
  return {
    type: UPDATE_PLAYER_POSITION,
    player,
    position
  }
}

export default playerReducer
