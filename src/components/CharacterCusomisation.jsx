/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react'
import useSingleLayer from '../hooks/useSingleLayer'
import useDoubleLayer from '../hooks/useDoubleLayer'

import Customise from '../game/Customise'

export default function CharacterCustomisation () {
  const canvasRef = useRef()
  const [bodyUrl, setBodyUrl] = useSingleLayer('Bodies', 'Body', 9)
  const [eyesUrl, setEyesUrl] = useSingleLayer('Eyes', 'Eyes', 7)
  const [outfitUrl, setOutfitUrl] = useDoubleLayer('Outfits', 'Outfit', 33, 3)
  const [hairUrl, setHairStyleUrl, setHairColorUrl] = useDoubleLayer('Hairstyles', 'Hairstyle', 26, 6)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const customise = new Customise({
      ctx,
      body: bodyUrl,
      eyes: eyesUrl,
      outfit: outfitUrl,
      hair: hairUrl
    })

    customise.init()

    // setTimeout(() => {
    //   const dl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    //   window.location.href = dl
    // }, 2000)
  })

  return (
		<div className='max-w-7xl m-auto'>
			<canvas
				ref={canvasRef}
				height='32'
				width='16'
				className='scale-[5] max-w-xl m-auto p-8'
				style={{ imageRendering: 'pixelated' }}
			/>
			<button type='button' onClick={() => setBodyUrl(1)}>
        up
			</button>
			<button type='button' onClick={() => setBodyUrl(-1)}>
        down
			</button>
			<button type='button' onClick={() => setEyesUrl(1)}>
        eye up
			</button>
			<button type='button' onClick={() => setEyesUrl(-1)}>
         eye down
			</button>
		</div>
  )
}
