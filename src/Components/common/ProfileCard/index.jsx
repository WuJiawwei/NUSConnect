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
        <div className = "year-data">
          <div className="year-field">Year</div>
          <div className="year-input">{currentUser.year}</div>
        </div>
        <div className="major-data">
          <div className="major-field">Major</div>
          <div className="major-input">{currentUser.major}</div>
        </div>
        <div className="email-data">
          <div className="email-field">Email</div>
          <div className="email-input">{currentUser.email}</div>
        </div>
        <div className="tagline-data">
          <div className="tagline-field">Tagline</div>
          <div className="tagline-input"></div>
        </div>
        <div className="preferences-data">
          <div className="preference-field">Preferences</div>
          <div className="preference-input">
            {currentUser["wantsToBefriend"] ? <div>Is open to befriending</div> : <div></div>}
            {currentUser["wantsToBefriend"] && currentUser["wantsToTutor"]? <div>, </div> : <div></div>}
            {currentUser["wantsToTutor"] ? <div className="preferences">Is open to do tutoring</div> : <div></div>}
          </div>
        </div>
        {currentUser["wantsToTutor"] ? <p className="module">Tutors: {currentUser["Module Code"]}</p> : <div></div>}
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
