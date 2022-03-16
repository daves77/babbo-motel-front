import { useState } from 'react'

const createAssetUrl = (partPlural, partSingular, index, size = '16x16') => {
  const baseUrl =
		'https://babbo-motel.s3.ap-southeast-1.amazonaws.com/Character_Generation'
  const formattedIndex = String(index).length < 2 ? `0${index}` : index
  return `${baseUrl}/${partPlural}/${size}/${partSingular}_${formattedIndex}.png`
}

const updateIndex = (index, counter, limit) => {
  const newIndex =
    	Math.abs(index + counter) > limit
    	  ? 1
    	  : index + counter === 0
    	    ? limit
    	    : Math.abs(index + counter)
  return newIndex
}

const useSingleLayer = (plural, singular, limit) => {
  const [index, setIndex] = useState(1)
  const [url, setUrl] = useState(createAssetUrl(plural, singular, index))

  const updateUrl = (counter) => {
    const newIndex = updateIndex(index, counter, limit)

    setIndex(newIndex)
    setUrl(createAssetUrl(plural, singular, newIndex))
  }

  return [url, updateUrl]
}

export default useSingleLayer
