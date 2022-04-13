/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Attributes from './attributes/Attributes'
import Customise from '../game/character/Customise'
import Tabs from '../components/Tabs'
import { Context, toggleModal } from '../store'

const tabs = [
  { name: 'Body', current: true },
  { name: 'Eyes', current: true },
  { name: 'Hairstyle', current: true },
  { name: 'Clothing', current: false },
  { name: 'Accessory', current: false }
]

export default function CharacterCustomisation () {
  const { store, dispatch } = useContext(Context)
  const navigate = useNavigate()
  const [currentState, setCurrentState] = useState(tabs[0].name)
  const [stage, setStage] = useState(true)
  const [customiseCanvas, setCustomiseCanvas] = useState(null)

  const canvasRef = useRef()
  const hiddenCanvasRef = useRef()
  const hiddenCanvasRef2 = useRef()

  useEffect(() => {
    if (store.modalOpen) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const customiseCanvas = new Customise({
        canvas,
        ctx
      })

      customiseCanvas.init()
      setCustomiseCanvas(customiseCanvas)
    }
  }, [store.modalOpen])

  const onToggle = () => {
    dispatch(toggleModal(!store.modalOpen))
  }

  const onUpdate = async () => {
    const canvas1 = hiddenCanvasRef.current
    const canvas2 = hiddenCanvasRef2.current
    const [spriteSheetBlob, headBlob] = customiseCanvas.saveSprite(
      canvas1,
      canvas2
    )
    // include jwt with request
    const data = new FormData()
    data.append('file', spriteSheetBlob)
    data.append('file', headBlob)
    data.append('attributes', JSON.stringify(customiseCanvas.spriteAttributes))
    await axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/api/sprite/update`,
			data,
			{
			  headers: {
			    'Content-Type': 'application/json',
			    Authorization: `${localStorage.getItem('token')}`
			  }
			}
    )
    console.log('navigating')
    navigate('/game', { replace: true })
  }

  return (
    <>
    {
      store.modalOpen && (
	<div className='min-h-full relative flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<canvas
				ref={hiddenCanvasRef}
				height='656'
				width='927'
				className='hidden'
			/>
			<canvas
				ref={hiddenCanvasRef2}
				height='24'
				width='16'
				className='hidden'
			/>
			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className=' shadow sm:rounded-lg'>
					<div className='grid grid-rows-5 grid-cols-1'>
						<div className='w-full h-full relative bg-blue rounded-t row-span-2'>
							<canvas
								ref={canvasRef}
								height='32'
								width='16'
								className='scale-[4] m-auto mt-12'
								style={{ imageRendering: 'pixelated' }}
							/>
						</div>
						<div className='bg-darkblue rounded-b row-span-3'>
							<div className='px-8'>
								<Tabs
									tabs={tabs}
									currentState={currentState}
									setCurrentState={setCurrentState}
								/>
								{customiseCanvas && (
									<div className='px-8 py-4'>
										{currentState === 'Body' && (
											<Attributes
												customise={customiseCanvas}
												attributePlural='Bodies'
												attributeSingular='Body'
												limit={7}
											/>
										)}
										{currentState === 'Eyes' && (
											<Attributes
												customise={customiseCanvas}
												attributePlural='Eyes'
												attributeSingular='Eyes'
												limit={7}
											/>
										)}
										{currentState === 'Hairstyle' && (
											<Attributes
												customise={customiseCanvas}
												attributePlural='Hairstyles'
												attributeSingular='Hairstyle'
												limit={40}
											/>
										)}
										{currentState === 'Clothing' && (
											<Attributes
												customise={customiseCanvas}
												attributePlural='Outfits'
												attributeSingular='Outfit'
												limit={8}
											/>
										)}
										{currentState === 'Accessory' && (
											<Attributes
												customise={customiseCanvas}
												attributePlural='Accessories'
												attributeSingular='Accessory'
												limit={80}
											/>
										)}
									</div>
								)}
								<div className='flex justify-between pb-4 px-4'>
									<button
										onClick={onToggle}
										className='w-40 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
										Close
									</button>
									<button
										onClick={onUpdate}
										className='w-40 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
										Update
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
      )
    }
	</>
  )
}
