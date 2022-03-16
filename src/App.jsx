import React from 'react'
import { Routes, Route } from 'react-router'

import GameCanvas from './components/GameCanvas'
import CharacterCustomisation from './components/CharacterCusomisation'

function App () {
  return (
    <Routes>
      <Route path="/game" element={<GameCanvas/>} />
      <Route path="/custom" element={<CharacterCustomisation/>} />
    </Routes>

  )
}

export default App
