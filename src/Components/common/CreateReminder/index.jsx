import React, { useState, useMemo } from 'react'
import "./index.scss"
import ModComponent from "../Mod"
import { postStatus, getStatus } from '../../../api/FirestoreAPI';
import PostCard from '../PostCard';
import { getCurrentTimeStamp } from '../../../Helpers/useMoment';
import { Timestamp } from 'firebase/firestore';
import { getUniqueID } from '../../../Helpers/getUniqueID';

export default function PostStatus({currentUser}) {
  let userEmail = localStorage.getItem("userEmail")
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([])
  const sendStatus = async () => {
    let object = {
      status: status,
      timestamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueID(),
    }
    await postStatus(object)
    await setModalOpen(false)
    await setStatus("")
  }
  
  useMemo(() => {
    getStatus(setAllStatus)
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

        {/* <div>
          {allStatuses
          .filter((obj) => {
            return obj.userEmail.toLowerCase() === localStorage.getItem("userEmail")
          }).map((posts) => {
            return (
              <div key={posts.id}>
                <PostCard posts={posts} />
              </div>
            )
          })}
        </div>  */}
    </div>
  )
}