/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState, useContext } from 'react'
import axios from 'axios'

import AttributeButtons from './AttributeButtons'
import Customise from '../game/character/Customise'
import { Context } from '../store'

export default function CharacterCustomisation () {
  const { store, dispatch } = useContext(Context)
  const canvasRef = useRef()
  const hiddenCanvasRef = useRef()
  const [customiseCanvas, setCustomiseCanvas] = useState(null)
  const [username, setUsername] = useState('')
  const [randomise, setRandomise] = useState(false) // just used to rerender state

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const customiseCanvas = new Customise({
      canvas,
      ctx
    })

    customiseCanvas.init()
    setCustomiseCanvas(customiseCanvas)
    // setTimeout(() => {
    //   const dl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    //   window.location.href = dl
    // }, 2000)
  }, [])

  const onCreate = async () => {
    const canvas = hiddenCanvasRef.current
    const blob = customiseCanvas.saveSprite(canvas)
    // include jwt with request
    const data = new FormData()
    data.append('file', blob)
    data.append('attributes', JSON.stringify(customiseCanvas.spriteAttributes))
    data.append('username', username)
    await axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/api/sprite/create`,
			data,
			{
			  headers: {
			    'Content-Type': 'application/json',
			    Authorization: `${localStorage.getItem('token')}`
			  }
			}
    )
  }

  return (
		<div className='min-h-full relative flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<canvas
				ref={hiddenCanvasRef}
				height='656'
				width='927'
				className='hidden'
			/>
			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<div className='flex justify-between'>
						<div className='w-full relative'>
							<canvas
								ref={canvasRef}
								height='32'
								width='16'
								className='scale-[5] absolute top-0 bottom-16 right-0 left-0 m-auto'
								style={{ imageRendering: 'pixelated' }}
							/>
							<input
								className='absolute bottom-0 right-0 left-0 m-auto w-20 appearance-none block  px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
								type='text'
								placeholder='username'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div>
							{customiseCanvas && (
								<>
									<button
										type='button'
										onClick={() => setRandomise(!randomise)}>
										Randomize
									</button>
									<AttributeButtons
										customise={customiseCanvas}
										attributePlural='Bodies'
										attributeSingular='Body'
										limit={9}
										randomise={randomise}
									/>
									<AttributeButtons
										customise={customiseCanvas}
										attributePlural='Eyes'
										attributeSingular='Eyes'
										limit={7}
									/>
									<AttributeButtons
										customise={customiseCanvas}
										attributePlural='Outfits'
										attributeSingular='Outfit'
										limit={132}
									/>
									<AttributeButtons
										customise={customiseCanvas}
										attributePlural='Hairstyles'
										attributeSingular='Hairstyle'
										limit={200}
									/>
									<AttributeButtons
										customise={customiseCanvas}
										attributePlural='Accessories'
										attributeSingular='Accessory'
										limit={84}
									/>
								</>
							)}
						</div>
					</div>
					<div className='flex justify-center mt-8'>
						<button
							onClick={onCreate}
							className='w-40 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
							Create Character
						</button>
					</div>
				</div>
			</div>
		</div>
  )
}
