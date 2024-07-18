import React from 'react'
import "./index.scss"

export default function ReminderCard({reminders}) {
  return (
    <div className='post-card'>
      <p className='text'>{reminders.status}</p>
    </div>
  )
}