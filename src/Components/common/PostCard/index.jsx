import React from 'react'
import "./index.scss"

export default function PostCard({posts}) {
  return (
    <div className='post-card'>
      <p className="author">{posts.userName}</p>
      <p className="timestamp">{posts.timestamp}</p>
      <p className='text'>{posts.status}</p>
    </div>
  )
}
