import React from 'react'

export default function ErrorMessage ({ errors, input }) {
  const shouldShow = errors[input]
  return (
    <>
    {shouldShow && (
     <p className="mt-2 text-sm text-red-600" id="email-error">
      {errors[input]?.message}
      </p>
    )}
    </>
  )
}
