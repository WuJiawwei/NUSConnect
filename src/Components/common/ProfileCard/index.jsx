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
        <div className="name-and-profile">
          <div><img className="profile-avatar" src={currentUser.avatar} width={80} height={80}/></div>
          <div><h3 className="name">{currentUser.name}</h3></div>
        </div>
        <p className='year'>Year: {currentUser.year}</p>
        <p className='major'>Major: {currentUser.major}</p>
        <p className="email">Email: {currentUser.email}</p>
        {currentUser["wantsToBefriend"] ? <p className="preferences" >Is open to befriending</p> : <div></div>}
        {currentUser["wantsToTutor"] ? <p className="preferences">Is open to do tutoring</p> : <div></div>}
        {currentUser["wantsToTutor"] ? <p className="module">Tutors: {currentUser["Module Code"]}</p> : <div></div>}
        <p className="tagline">Tagline: {currentUser.tagline}</p>
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
