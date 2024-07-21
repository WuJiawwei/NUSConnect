import React from 'react'
import "./index.scss"
import { deleteReminder } from '../../../api/FirestoreAPI'
import { MdDelete } from "react-icons/md"

export default function ReminderCard({reminders}) {
  return (
    <div className='post-card'>
      <MdDelete size={20} className="delete-icon" onClick={() => deleteReminder(reminders.id)} />
      <p className='text'>{reminders.status}</p>
    </div>
  )
}