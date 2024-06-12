import React from 'react'
import "./index.scss"

export default function ProfileCard({ onEdit, currentUser }) {
  return (
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
  )
}
