import React, { useState, useMemo } from 'react'
import "./index.scss"
import LikeButton from '../LikeButton'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../../api/FirestoreAPI'

export default function PostCard({posts, id}) {
  let navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({})
  useMemo(() => {
    getCurrentUser(setCurrentUser)
  }, [])

  return (
    <div className='post-card' key={id}>
      <p 
        className="author"
        onClick={() =>
          navigate("/profile", {
            state: {id: posts?.userID, email: posts.userEmail}
          })
        }
      >
          {posts.userName}
      </p>
      <p className="timestamp">{posts.timestamp}</p>
      <p className='text'>{posts.status}</p>

      <LikeButton userId={currentUser?.userID} postId={posts.id} />
    </div>
  )
}