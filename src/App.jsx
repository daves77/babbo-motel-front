import React from 'react'
import { Routes, Route } from 'react-router'

import CheckUserAuth from './layouts/CheckUserAuth'

import GameCanvas from './components/GameCanvas'
import CharacterCustomisation from './components/CharacterCusomisation'
import Signup from './pages/Signup'
import Chat from './components/Chat'

function App () {
  return (
		<CheckUserAuth>
			<Routes>
				<Route path='/game' element={<GameCanvas />} />
				<Route path='/custom' element={<CharacterCustomisation />} />
				<Route path='/signup' element={<Signup />} />
				<Route path="/chat" element={<Chat/>} />
			</Routes>
		</CheckUserAuth>
  )
}

export default App
