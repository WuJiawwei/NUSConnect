import React, { useMemo, useState } from 'react'
import "./index.scss"
import PostCard from '../PostCard'
import { getStatus } from '../../../api/FirestoreAPI'

export default function ProfileCard({ onEdit, currentUser }) {
  const [allStatuses, setAllStatus] = useState([])
  useMemo(() => {
    getStatus(setAllStatus)
  }, [])
  return (
    <>
    <div className='profile-card'>
      <div className='edit-button'>
        <button onClick={onEdit}>Edit</button>
      </div>
      <h3 className="name">{currentUser.name}</h3>
      <p className='year'>{currentUser.year}</p>
      <p className='major'>{currentUser.major}</p>
      <p className="email">{currentUser.email}</p>
      <p className="tagline">{currentUser.tagline}</p>
    </div>

    <div className='posts'>
      {allStatuses
        .filter((obj) => {
          return obj.userEmail.toLowerCase() === localStorage.getItem("userEmail")
        })
        .map((posts) => {
          return (
            <div key={posts.id}>
              <PostCard posts={posts} />
            </div>
          )
        })}
    </div>

    </>

    
  )
}
