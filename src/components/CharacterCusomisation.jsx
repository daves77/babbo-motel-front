/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'

import AttributeButtons from './AttributeButtons'

import Customise from '../game/character/Customise'

export default function CharacterCustomisation () {
  const canvasRef = useRef()
  const [customise, setCustomise] = useState(null)

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
		<div className='max-w-7xl m-auto'>
			<canvas
				ref={canvasRef}
				height='32px'
				width='16px'
				className='scale-[5]  m-auto p-8'
				style={{ imageRendering: 'pixelated' }}
			/>
      {customise &&
      <>
      <AttributeButtons customise={customise} attributePlural="Bodies" attributeSingular="Body" limit={9}/>
      <br />
      <AttributeButtons customise={customise} attributePlural="Eyes" attributeSingular="Eyes" limit={7}/>
      <br />
      <AttributeButtons customise={customise} attributePlural="Outfits" attributeSingular="Outfit" limit={132}/>
      <br />
      <AttributeButtons customise={customise} attributePlural="Hairstyles" attributeSingular="Hairstyle" limit={200}/>
        <br />
      <AttributeButtons customise={customise} attributePlural="Accessories" attributeSingular="Accessory" limit={84}/>

      </>
      }
		</div>
  )
}
