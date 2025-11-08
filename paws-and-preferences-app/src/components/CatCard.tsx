import React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface CatCardProps {
    id?: string;
    url: string;
    onSwipe?: (direction: "left" | "right") => void;
    swipable?: boolean;
}

const CatCard: React.FC<CatCardProps> = ({ url, onSwipe, swipable = true }) => {
    const x = useMotionValue(0);
    const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
    const rotate = useTransform(x, [-150, 150], [-18, 18]);

    return (
        <motion.div
            className={`
                relative
                w-full
                h-full
                rounded-2xl
                bg-white
                shadow-md
                duration-300
                hover:shadow-lg
                ${swipable ? 'cursor-grab active:cursor-grabbing' : ''} 
                overflow-hidden
                `}
            style={{
                x: swipable ? x : 0,
                opacity: swipable ? opacity : 1,
                rotate: swipable ? rotate : 0,
            }}
            drag={swipable ? "x" : false}
            dragConstraints={{
                left: 0,
                right: 0,
            }}
            onDragEnd={(_e, info) => {
                if (!swipable || !onSwipe) return;
                if (info.offset.x > 150) onSwipe?.("right");
                else if (info.offset.x < -150) onSwipe?.("left");
            }}
        >
            <img
                src={url}
                className='w-full h-full object-cover hover:cursor-grab active:cursor-grabbing'
                draggable='false'
            />
        </motion.div>
    )
}

export default CatCard