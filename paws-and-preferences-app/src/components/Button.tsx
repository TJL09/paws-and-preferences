import React from 'react'

interface ButtonProps {
    title: string;
    onClick?: () => void;
    className?: string;
}

const Button : React.FC<ButtonProps> = ({title, onClick, className}) => {
  return (
    <button
    type='button'
    onClick={onClick}
    className={`w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 mb-5 font-roboto ${className}`}>
        {title}
    </button>
  )
}

export default Button