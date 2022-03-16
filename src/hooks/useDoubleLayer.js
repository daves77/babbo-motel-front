import { useState } from 'react'

const formatIndex = (index) => String(index).length < 2 ? `0${index}` : index

const createAssetUrl = (partPlural, partSingular, firstIndex, secondIndex, size = '16x16') => {
  const baseUrl =
		'https://babbo-motel.s3.ap-southeast-1.amazonaws.com/Character_Generation'
  const formattedFirstIndex = formatIndex(firstIndex)
  const formattedSecondIndex = formatIndex(secondIndex)
  return `${baseUrl}/${partPlural}/${size}/${partSingular}_${formattedFirstIndex}_${formattedSecondIndex}.png`
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

const useDoubleLayer = (plural, singular, firstLimit, secondLimit) => {
  const [firstIndex, setFirstIndex] = useState(1)
  const [secondIndex, setSecondIndex] = useState(1)
  const [url, setUrl] = useState(createAssetUrl(plural, singular, firstIndex, secondIndex))

  const updateFirstIndex = (counter) => {
    const newIndex = updateIndex(firstIndex, counter, firstLimit)
    setFirstIndex(newIndex)
    setUrl(createAssetUrl(plural, singular, newIndex, secondIndex))
  }

  const updateSecondIndex = (counter) => {
    const newIndex = updateIndex(secondIndex, counter, secondLimit)
    setSecondIndex(newIndex)
    setUrl(createAssetUrl(plural, singular, firstIndex, newIndex))
  }

  return [url, updateFirstIndex, updateSecondIndex]
}

export default useDoubleLayer
