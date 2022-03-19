import React, { useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

import useSingleLayer from '../hooks/useLayer'

import Attribute from '../game/character/Attribute'

export default function AttributeButtons ({
  customise,
  attributePlural,
  attributeSingular,
  limit
}) {
  const [attributeUrl, setAttributeUrl] = useSingleLayer(
    attributePlural,
    attributeSingular,
    limit
  )

  useEffect(() => {
    const attribute = new Attribute({
      src: attributeUrl
    })
    customise.updateAttribute(attributeSingular, attribute)
  })

  console.log(attributeUrl)
  return (
		<>
			<div className='flex items-center mb-2'>
				<button className='cursor-pointer' onClick={() => setAttributeUrl(1)}>
					<ChevronLeftIcon className='text-slate-800  h-4 w-4' />
				</button>
				<div className='w-20'>
					<p className='text-center'>{attributeSingular}</p>
				</div>
				<button className='cursor-pointer' onClick={() => setAttributeUrl(-1)}>
					<ChevronRightIcon className='h-4 w-4 text-slate-800' />
				</button>
			</div>
		</>
  )
}
