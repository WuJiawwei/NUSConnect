import React, { useState, useMemo } from 'react'
import "./index.scss"
import ModalComponent from "../Modal"
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
      userID: currentUser.userID
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
            return (
              <div key={posts.id}>
                <PostCard posts={posts} />
              </div>
            )
          })}
        </div> 
    </div>
  )
}
