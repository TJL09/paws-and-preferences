import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'

const Spinner = () => {
    return (
        <div className="flex flex-col items-center justify-center p-6">
            <Tailspin
                size="40"
                stroke="5"
                speed="0.9"
                color="black"
            />
            <h2 className='text-xl font-semibold mt-3 text-red-700'>Fetching our pawsome friends...🐈</h2>
        </div> 
    )
}

export default Spinner
