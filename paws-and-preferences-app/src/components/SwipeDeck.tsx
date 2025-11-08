import React from 'react'
import type { Cat } from '../types/catTypes';
import CatCard from './CatCard';

interface SwipeDeckProps {
  cats: Cat[];
  onSwipe: (id: string, direction: "left" | "right") => void;
}

const SwipeDeck: React.FC<SwipeDeckProps> = ({ cats, onSwipe }) => {

  return (
    <div className="
      relative
      mx-auto
      mb-8
      w-[90vw]
      max-w-md
      aspect-3/4
      flex
      items-center
      justify-center
    ">
      {cats.map((cat, index) => (
        <div
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
          style={{ zIndex: cats.length - index }}
          key={cat.id}
        >
          <CatCard url={cat.imageUrl} id={cat.id} onSwipe={(dir) => onSwipe(cat.id, dir)} />
        </div>
      ))}
    </div>
  )
}

export default SwipeDeck