import React, { useMemo, useState } from 'react'
import "./index.scss"
import PostCard from '../PostCard'
import { getStatus } from '../../../api/FirestoreAPI'
import {FaPencilAlt, FaSkull, FaExclamationTriangle, FaPowerOff} from 'react-icons/fa'
import DeleteMyAccount from "../Popups/deleteMyAccount.jsx";

export default function ProfileCard({ onEdit, currentUser }) {
  const [allStatuses, setAllStatus] = useState([])
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  useMemo(() => {
    getStatus(setAllStatus)
  }, [])

  const logout = () => {
    // todo: implement logout
  }
  if (currentUser !== null) {
    return (
        <>
          <div className='profile-card'>
            <div>
              <button
                  className='edit-button'
                  onClick={onEdit}>
                <FaPencilAlt />
              </button>
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
            <div className="hobby-data">
              <div className="hobby-field">Hobby</div>
              <div className="hobby-input">{currentUser.hobby}</div>
            </div>
            <div className="tagline-data">
              <div className="tagline-field">Tagline</div>
              <div className="tagline-input">{currentUser.tagline}</div>
            </div>
            <div className="preferences-data">
              <div className="preference-field">Preferences</div>
              <div className="preference-input">
                {currentUser["wantsToBefriend"] && currentUser["wantsToTutor"] ?
                    <div>Open to befriending and tutoring</div> : currentUser["wantsToBefriend"]?
                        <div>Open to befriending</div> : currentUser["wantsToTutor"]?
                            <div>Open to tutoring</div> : <div></div>
                }
              </div>
            </div>
            <div className="module-data">
              <div className="module-field">Is a tutor for</div>
              <div className="module-input">
                {currentUser["wantsToTutor"] && currentUser["Module Code"].length !== 0?
                    <div>{currentUser["Module Code"]}</div> : <div>None</div>}
              </div>
            </div>
            <div className="logout-zone">
              <button className="logout-button" onClick={logout}>
                <div className="logout-button-img"><FaPowerOff/></div>
                <div className="logout-button-text">Logout</div>
              </button>
            </div>
            <div className="danger-zone">
              <div className="danger-text">
                <FaExclamationTriangle/>
                Danger zone below
              </div>
              <button
                  className='delete-button'
                  onClick={setIsDeleteOpen}
              >
                <div className="delete-button-img"><FaSkull/></div>
                <div className="delete-button-text">Delete my account</div>
              </button>
            </div>
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

          {isDeleteOpen ? <DeleteMyAccount isOpen={() => setIsDeleteOpen(!isDeleteOpen)}/> : <div></div>}

        </>
    )
  }
}
