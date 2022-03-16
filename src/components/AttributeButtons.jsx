import React, { useEffect } from 'react'
import useSingleLayer from '../hooks/useLayer'

import Attribute from '../game/Attribute'

export default function AttributeButtons ({ customise, attributePlural, attributeSingular, limit }) {
  const [attributeUrl, setAttributeUrl] = useSingleLayer(attributePlural, attributeSingular, limit)

  useEffect(() => {
    const attribute = new Attribute({
      src: attributeUrl
    })
    customise.updateAttribute(attributeSingular, attribute)
  })
  console.log(attributeUrl)
  return (
      <>{attributeSingular}
      <button onClick={() => setAttributeUrl(1)}>Up</button>
      <button onClick={() => setAttributeUrl(-1)}>Down</button>
      </>
  )
}
