import React from 'react'
import { Routes, Route } from 'react-router'

import BaseLayout from './layouts/BaseLayout'

import GameCanvas from './components/GameCanvas'
import CharacterCustomisation from './components/CharacterCusomisation'
import Signup from './pages/Signup'

function App () {
  return (
		<BaseLayout>
			<Routes>
				<Route path='/game' element={<GameCanvas />} />
				<Route path='/custom' element={<CharacterCustomisation />} />
				<Route path='/signup' element={<Signup />} />
			</Routes>
		</BaseLayout>
  )
}

export default App
