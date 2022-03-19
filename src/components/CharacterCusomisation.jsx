/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'

import AttributeButtons from './AttributeButtons'

import Customise from '../game/character/Customise'

export default function CharacterCustomisation () {
  const canvasRef = useRef()
  const [customise, setCustomise] = useState(null)
  const [randomise, setRandomise] = useState(false) // just used to rerender state

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const x = new Customise({
      canvas,
      ctx
    })

    x.init()
    setCustomise(x)
    // setTimeout(() => {
    //   const dl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    //   window.location.href = dl
    // }, 2000)
  }, [])
  return (
		<div className='min-h-full relative flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<div className='flex justify-between'>
						<div className="w-full relative">
							<canvas
								ref={canvasRef}
								height='32'
								width='16'
								className='scale-[5] absolute top-0 bottom-16 right-0 left-0 m-auto'
								style={{ imageRendering: 'pixelated' }}
							/>
            <input className="absolute bottom-0 right-0 left-0 m-auto w-20 appearance-none block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" placeholder="username" />
						</div>
						<div>
							{customise && (
								<>
                <button type="button" onClick={() => setRandomise(!randomise) }>Randomize</button>
									<AttributeButtons
										customise={customise}
										attributePlural='Bodies'
										attributeSingular='Body'
										limit={9}
                    randomise={randomise}
									/>
									<AttributeButtons
										customise={customise}
										attributePlural='Eyes'
										attributeSingular='Eyes'
										limit={7}
									/>
									<AttributeButtons
										customise={customise}
										attributePlural='Outfits'
										attributeSingular='Outfit'
										limit={132}
									/>
									<AttributeButtons
										customise={customise}
										attributePlural='Hairstyles'
										attributeSingular='Hairstyle'
										limit={200}
									/>
									<AttributeButtons
										customise={customise}
										attributePlural='Accessories'
										attributeSingular='Accessory'
										limit={84}
									/>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}
