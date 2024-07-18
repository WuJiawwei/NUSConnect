import React, { useState, useMemo } from 'react'
import "./index.scss"
import ModComponent from "../Mod"
import { reminderStatus, getReminderStatus } from '../../../api/FirestoreAPI';
import ReminderCard from '../ReminderCard';
import { getUniqueID } from '../../../Helpers/getUniqueID';

export default function PostStatus({currentUser}) {
  let userEmail = localStorage.getItem("userEmail")
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([])
  const sendStatus = async () => {
    let object = {
      status: status,
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueID(),
    }
    await reminderStatus(object)
    await setModalOpen(false)
    await setStatus("")
  }
  
  useMemo(() => {
    getReminderStatus(setAllStatus)
  }, [])

  return (
    <div className="reminder-wrapper">
        <div className="reminder-status">
            <button className="open-reminder" onClick={() => setModalOpen(true)}>
                Add a reminder
            </button>
        </div>

        <ModComponent 
          setStatus={setStatus}
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen}
          status={status} 
          sendStatus={sendStatus}
        />

        <div>
          {allStatuses
          .filter((obj) => {
            return obj.userEmail.toLowerCase() === localStorage.getItem("userEmail")
          }).map((reminders) => {
            return (
              <div key={reminders.id}>
                <ReminderCard reminders={reminders} />
              </div>
            )
          })}
        </div> 
    </div>
  )
}