import React, { useEffect } from 'react'
import _ from 'lodash'

import useSingleLayer, { createAssetUrl } from '../../hooks/useLayer'
import AttributeContainer from './AttributeContainer'
import Attribute from '../../game/character/Attribute'

export default function Attributes ({ customise, attributePlural, attributeSingular, limit }) {
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

  return (

    <div className="h-40 overflow-auto">
    <div className="grid grid-cols-4 gap-4 grid-rows-2">
    {_.range(1, limit).map(idx => (
      <AttributeContainer key={`${attributeSingular}-${idx}`} imageSrc={createAssetUrl(attributePlural, attributeSingular, idx)} setAttributeUrl={() => {
        console.log('clicked')
        setAttributeUrl(idx)
      }}/>
    ))}
    </div>
    </div >

  )
}
