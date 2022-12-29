import React from 'react'

const TagList = (tag) => {
  return (
    <div className='tag'> 
      <h5>{tag.name}</h5>
      <p>{tag.discription}</p>
    </div>
  )
}

export default TagList
