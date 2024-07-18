import React, { useState, useMemo } from 'react'
import "./index.scss"
import LikeButton from '../LikeButton'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, deletePost } from '../../../api/FirestoreAPI'
import { GoPencil } from "react-icons/go"
import { MdDelete } from "react-icons/md"

export default function PostCard({posts, id, fetchEditData}) {
  let navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({})
  useMemo(() => {
    getCurrentUser(setCurrentUser) // can
  }, [])
  
  return (
    <div className='post-card' key={id}>
      <div className='post-header'>
        <div
          className="author"
          onClick={() =>
            navigate("/profile", {
              state: {id: posts?.userID, email: posts.userEmail}
            })
          }
        >
            <div className="author-name-and-avatar">
                <div className="author-name">{posts.userName}</div>
            </div>
        </div>
        {currentUser.userID === posts.userID ? (<div className="icons">
          <GoPencil size={20} className="edit-icon" onClick={() => fetchEditData(posts)}/>
          <MdDelete size={20} className="delete-icon" onClick={() => deletePost(posts.id)}/>
        </div>
        ) : (
          <></>
        )}
      </div>
      <p className="timestamp">{posts.timestamp}</p>
      <p className='text'>{posts.status}</p>

      <LikeButton userId={currentUser?.userID} postId={posts.id} 
      currentUser={currentUser} />
    </div>
  )
}