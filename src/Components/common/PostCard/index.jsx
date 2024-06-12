import React from 'react'
import "./index.scss"
import LikeButton from '../LikeButton'

export default function PostCard({posts}) {
  return (
    <div className='post-card'>
      <p className="author">{posts.userName}</p>
      <p className="timestamp">{posts.timestamp}</p>
      <p className='text'>{posts.status}</p>

      <LikeButton />
    </div>
  )
}
