import React from 'react'
import "./index.scss"
import { FaRegHeart } from 'react-icons/fa'

export default function LikeButton() {
  return (
    <div className='caption'>
      <FaRegHeart size={20}/>
      <p>Like</p>
    </div>
  )
}
