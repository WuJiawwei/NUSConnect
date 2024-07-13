import React, { useState, useMemo } from 'react'
import "./index.scss"
import ModalComponent from "../Modal"
import { postStatus, getStatus, updatePost } from '../../../api/FirestoreAPI';
import PostCard from '../PostCard';
import { getCurrentTimeStamp } from '../../../Helpers/useMoment';
import { Timestamp } from 'firebase/firestore';
import { getUniqueID } from '../../../Helpers/getUniqueID';

export default function PostStatus({currentUser}) {
  let userEmail = localStorage.getItem("userEmail")
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [currPost, setCurrPost] = useState({})
  const sendStatus = async () => {
    let obj = {
      status: status,
      timestamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueID(),
      userID: currentUser.userID
    }
    await postStatus(obj)
    await setModalOpen(false)
    setIsEdit(false)
    await setStatus("")
  }
  
  const fetchEditData = (posts) => {
    setModalOpen(true)
    setStatus(posts?.status)
    setCurrPost(posts)
    setIsEdit(true)
  }

  const updateStatus = () => {
    console.log(status)
    updatePost(currPost.id, status)
    setModalOpen(false)
  }

  useMemo(() => {
    getStatus(setAllStatus)
  }, [])

  return (
    <div className="post-wrapper">
        <div className="post">
            <button 
              className="make-post" 
              onClick={() => {
                setModalOpen(true)
                setIsEdit(false)
              }}
            >
                Start a Post
            </button>
        </div>

        <ModalComponent 
          setStatus={setStatus}
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen}
          status={status} 
          sendStatus={sendStatus}
          isEdit={isEdit}
          updateStatus={updateStatus}
        />

        <div>
          {allStatuses.map((posts) => {
            return (
              <div key={posts.id}>
                <PostCard posts={posts} fetchEditData={fetchEditData} />
              </div>
            )
          })}
        </div> 
    </div>
  )
}
