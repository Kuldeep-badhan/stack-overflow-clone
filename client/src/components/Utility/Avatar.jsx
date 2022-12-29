import React from 'react'

const Avatar = ({color,letter, backgroundColor, borderRadius,py,px}) => {
  const style = {
    color,
    backgroundColor,
    borderRadius,
    padding: `${py} ${px}`,
    
  }
  return (
    <span className='avatar' style={style}>
     {letter}
    </span>
  )
}

export default Avatar;
