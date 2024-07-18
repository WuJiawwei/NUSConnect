import React from 'react'
import "../Sass/HomeComponent.scss"
import ReminderStatus from './common/CreateReminder'

export default function TodoComponent({currentUser}) {
  return (
    <div className="home-component">
      <ReminderStatus currentUser={currentUser}/>
    </div>
  )
}