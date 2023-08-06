import React, { InputHTMLAttributes } from 'react'

const InputComponent = ({
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="p-4 placeholder-gray-800 text-gray-800 w-full rounded-[46px] h-11 bg-slate-100 drop-shadow-md mb-3"
      {...props}
    />
  )
}

export default InputComponent
