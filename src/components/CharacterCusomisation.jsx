/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import ErrorMessage from '../components/ErrorMessage'
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

const schema = yup.object({
  username: yup
    .string()
    .max(8, 'Please enter a username with less than 8 characters.')
    .required('Please enter an username')
})

export default function CharacterCustomisation () {
  const { store, dispatch } = useContext(Context)
  const [currentState, setCurrentState] = useState(tabs[0].name)
  const [stage, setStage] = useState(true)
  const [customiseCanvas, setCustomiseCanvas] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })
  const canvasRef = useRef()
  const hiddenCanvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const customiseCanvas = new Customise({
      canvas,
      ctx
    })

    customiseCanvas.init()
    setCustomiseCanvas(customiseCanvas)
  }, [])

  const onCreate = async (e) => {
    const canvas = hiddenCanvasRef.current
    const blob = customiseCanvas.saveSprite(canvas)
    // include jwt with request
    const data = new FormData()
    data.append('file', blob)
    data.append('attributes', JSON.stringify(customiseCanvas.spriteAttributes))
    data.append('username', e.username)
    // await axios.post(
    // 	`${process.env.REACT_APP_BACKEND_URL}/api/sprite/create`,
    // 	data,
    // 	{
    // 	  headers: {
    // 	    'Content-Type': 'application/json',
    // 	    Authorization: `${localStorage.getItem('token')}`
    // 	  }
    // 	}
    // )
  }

  return (
		<>
			<canvas
				ref={hiddenCanvasRef}
				height='656'
				width='927'
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
							{stage
							  ? (
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
									<div className='flex justify-center pb-4'>
										<button
											onClick={() => setStage(!stage)}
											className='w-40 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
											Next Step
										</button>
									</div>
								</div>
							    )
							  : (
								<form className='h-[248px]' onSubmit={handleSubmit(onCreate)}>
									<div className="h-full flex flex-col justify-between">
			<div className='flex justify-center items-center flex-grow'>
										<div className='w-1/2 '>
											<label
												htmlFor='Username'
												className='block text-sm font-medium text-lightblue'>
												Username
											</label>
											<input
												{...register('username')}
												id='username'
												name='username'
												placeholder='e.g bigDaddyFoong'
												className='bg-lightblue appearance-none block w-full px-3 py-2 border border-blue rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-900 focus:border-indigo-900 sm:text-sm'
											/>
										</div>
									</div>

									<div className='flex justify-between pb-4 px-20'>
										<button
											onClick={() => setStage(!stage)}
											className='w-32 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
											Back
										</button>
										<button
											onClick={onCreate}
											className='w-32 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
											Create Character
										</button>
									</div>
									</div>

								</form>
							    )}
						</div>
					</div>
				</div>
			</div>
		</>
  )
}
