import React from 'react'

interface HeaderProps {
    title: string;
    subHeader?: string;
}

const Header : React.FC<HeaderProps> = ({title, subHeader}) => {
  return (
    <div className="flex flex-col items-center justify-center p-3 font-roboto">
        <h1 className='text-3xl font-bold text-red-700'>{title}</h1>
        <h2 className='text-2xl font-semibold text-rose-400'>{subHeader}</h2>
    </div>
  )
}

export default Header