import { useState } from 'react'

export const createAssetUrl = (partPlural, partSingular, index, size = '16x16') => {
  const baseUrl =
		'https://babbo-motel.s3.ap-southeast-1.amazonaws.com/Character_Generation'
  return `${baseUrl}/${partPlural}/${size}/${partSingular}_${index}.png`
}

// const updateIndex = (index, counter, limit) => {
//   const newIndex =
//     	Math.abs(index + counter) > limit
//     	  ? 1
//     	  : index + counter === 0
//     	    ? limit
//     	    : Math.abs(index + counter)
//   return newIndex
// }

const useLayer = (plural, singular, limit) => {
  const [index, setIndex] = useState(1)
  const [url, setUrl] = useState(createAssetUrl(plural, singular, index))

  const updateUrl = (newIndex) => {
    setIndex(newIndex)
    setUrl(createAssetUrl(plural, singular, newIndex))
  }

  return [url, updateUrl]
}

export default useLayer
