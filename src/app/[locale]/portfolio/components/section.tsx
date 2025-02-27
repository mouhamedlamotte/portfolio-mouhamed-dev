import React, { PropsWithChildren } from 'react'

export  const Section = (props : PropsWithChildren) => {
  return (
    <div className='px-2 md:px-16 max-w-7xl mx-auto'>
            {props.children}
    </div>
  )
}

