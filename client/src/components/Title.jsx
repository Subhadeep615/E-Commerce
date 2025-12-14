import React from 'react'

const Title = ({ text }) => {
    return (
        <div className='inline-flex justify-center'>
            <div className='flex flex-col gap-1 items-end w-max'>
                <p className='font-medium'>{text}</p>
                <div className='w-[50%] h-0.5  bg-primary rounded-full'></div>
            </div>
        </div>
    )
}

export default Title
