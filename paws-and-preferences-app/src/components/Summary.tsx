import React from 'react'
import type { Cat } from '../types/catTypes'
import CatCard from './CatCard';

interface SummaryProps {
    cats: Cat[];
    amount: number;
}

const Summary: React.FC<SummaryProps> = ({ cats, amount }) => {
    return (
        <div className="flex flex-col items-center px-4 py-8 font-roboto text-center">
            <h2 className='text-2xl sm:text-3xl font-bold text-rose-700 mb-6'>You liked {amount} cats, here they are! 🐱</h2>

            <div className="
            grid 
            grid-cols-3 
            gap-4
            sm:gap-6
            w-full
            max-w-6xl
            justify-items-center
            ">
                {cats.map((cat) => (
                    <CatCard url={cat.imageUrl} id={cat.id} swipable={false}/>
                ))}
            </div>
        </div>
    )
}

export default Summary