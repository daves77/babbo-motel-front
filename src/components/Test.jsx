import React, { useRef, useEffect } from 'react'
import utils from '../utils'
export default function Test () {
  const canvasRef = useRef()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const image = new Image()
    image.src = 'https://babbo-motel.s3.ap-southeast-1.amazonaws.com/Character_Generation/Bodies/16x16/Body_9.png'
    image.onload = () => {
      ctx.drawImage(
        image,
        utils.withGrid(19),
        utils.withGrid(2),
        utils.withGrid(1),
        utils.withGrid(2),
        0,
        0,
        utils.withGrid(1),
        utils.withGrid(2)
      )
    }
  })
  return (

    <div className="h-16 w-16 rounded bg-sky-900 mt-20 relative">
      <canvas ref={canvasRef} height="32" width="16" className="absolute scale-[1.5] right-0 left-0 m-auto top-0 bottom-0" style={{ imageRendering: 'pixelated' }}/>
    </div>
  )
}
