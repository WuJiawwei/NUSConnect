import React, { useState, useMemo } from 'react'
import "./index.scss"
import ModalComponent from "../Modal"
import { postStatus, getStatus } from '../../../api/FirestoreAPI';
import PostCard from '../PostCard';
import { getCurrentTimeStamp } from '../../../Helpers/useMoment';
import { Timestamp } from 'firebase/firestore';

export default function PostStatus() {
  let userEmail = localStorage.getItem("userEmail")
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([])
  const sendStatus = async () => {
    let object = {
      status: status,
      timestamp: getCurrentTimeStamp("LLL"),
      userEmail: userEmail,
    }
    await postStatus(object)
    await setModalOpen(false)
    await setStatus("")
  }
  console.log(getCurrentTimeStamp("LLL"))

  useMemo(() => {
    getStatus(setAllStatus)
  }, [])

  return (
    <div className="post-status-main">
        <div className="post-status">
            <button className="open-post-modal" onClick={() => setModalOpen(true)}>
                Start a Post
            </button>
        </div>

        <ModalComponent 
          setStatus={setStatus}
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen}
          status={status} 
          sendStatus={sendStatus}
        />

        <div>
          {allStatuses.map((posts) => {
            return <PostCard posts={posts} />
          })}
        </div> 
    </div>
  )
}
