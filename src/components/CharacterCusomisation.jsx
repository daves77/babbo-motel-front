/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState, useContext } from 'react'
import axios from 'axios'

// import AttributeButtons from './AttributeButtons'
import Attributes from './attributes/Attributes'
import Customise from '../game/character/Customise'
import Tabs from '../components/Tabs'
import { Context } from '../store'

const tabs = [
  { name: 'Body', current: true },
  { name: 'Eyes', current: true },
  { name: 'Hairstyle', current: true },
  { name: 'Clothing', current: false },
  { name: 'Accessory', current: false }
]

export default function CharacterCustomisation () {
  const { store, dispatch } = useContext(Context)
	  const [currentState, setCurrentState] = useState(tabs[0].name)
  const canvasRef = useRef()
  const hiddenCanvasRef = useRef()
  const [customiseCanvas, setCustomiseCanvas] = useState(null)

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
				<div className=' shadow sm:rounded-lg'>
					<div className='grid grid-rows-2 grid-cols-1'>
						<div className='w-full h-full relative bg-blue rounded-t' >
							<canvas
								ref={canvasRef}
								height='32'
								width='16'
								className='scale-[4] m-auto mt-12'
								style={{ imageRendering: 'pixelated' }}
							/>

						</div>
						<div className="bg-darkblue">
							<div className="px-8">
							<Tabs tabs={tabs} currentState={currentState} setCurrentState={setCurrentState}/>
							{customiseCanvas && (
								<div className="px-8 py-4">
							<Attributes customise={customiseCanvas} attributePlural="Bodies" attributeSingular="Body" limit={7}/>
								</div>
							)}
							</div>

						</div>
					</div>
					{/* <div className='flex justify-center mt-8'>
						<button
							onClick={onCreate}
							className='w-40 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
							Create Character
						</button>
					</div> */}
				</div>
			</div>
		</div>
  )
}
