import React, { useState } from 'react'
import "./index.scss"
import { editProfile } from '../../../api/FirestoreAPI'
import user from "../../../assets/user.png"
import user1 from "../../../assets/user1.svg"
import user2 from "../../../assets/user2.svg"
import user3 from "../../../assets/user3.svg"
import user4 from "../../../assets/user4.svg"
import user5 from "../../../assets/user5.svg"
import user6 from "../../../assets/user6.svg"
import {FaCheckCircle, FaCircle} from "react-icons/fa";

export default function EditProfile({ currentUser, onEdit }) {
  const [editInputs, setEditInputs] = useState({})
  const getInput = (event) => {
    let { name, value } = event.target
    let input = { [name]: value }
    setEditInputs({...editInputs, ...input})
  }

  const updateProfileData = () => {
    editProfile(currentUser?.userID, editInputs)
    onEdit()
  }

  const avatars = [user, user1, user2, user3, user4, user5, user6]
    const [selected, setSelected] = useState([false, false, false, false, false, false, false])
   const manageClickForAvatar = (pos) => {
      for (let i = 0; i < selected.length; i++) {
          if (i === pos) {
              selected[i] = true;
              editInputs["avatar"] = avatars[pos];
          } else {
              selected[i] = false;
          }
      }
   }

  return (
    <div className='card'>
      <div className='edit-button'>
        <button onClick={onEdit}>Return</button>
      </div>

      <div>Pick your avatar:
        <div>
          <button
              className="avatar-button"
              onClick={() => manageClickForAvatar(0)}>
            <img src={user} width={80}/>
          </button>
          <button
              className="avatar-button"
              onClick={() => manageClickForAvatar(1)}>
              <img src={user1} width={80}/>
          </button>
          <button
              className="avatar-button"
              onClick={() => manageClickForAvatar(2)}>
              <img src={user2} width={80}/>
          </button>
          <button
              className="avatar-button"
              onClick={() => manageClickForAvatar(3)}>
              <img src={user3} width={80}/>
          </button>
          <button
              className="avatar-button"
              onClick={() => manageClickForAvatar(4)}>
              <img src={user4} width={80}/>
          </button>
            <button
            className="avatar-button"
            onClick={() => manageClickForAvatar(5)}>
                <img src={user5} width={80}/>
            </button>
            <button
            className="avatar-button"
            onClick={() => manageClickForAvatar(6)}>
                <img src={user6} width={80}/>
            </button>
        </div>
    </div>

        <div className='input'>
            <input
                onChange={getInput}
                className="each"
                placeholder='Name'
                name="name"
            />

            <input
                onChange={getInput}
                className="each"
                placeholder='Year of Study'
                name='year'
            />

            <input
                onChange={getInput}
                className="each"
                placeholder='Major'
                name="major"
            />

            <input
                onChange={getInput}
                className="each"
                placeholder='Hobby (Write in all caps and in one word...)'
                name="hobby"
            />
            <div className="fine-print">
                Writing in all caps will facilitate searching for interests.
            </div>

            <input
                onChange={getInput}
                className="each"
                placeholder='Tagline'
                name="tagline"
            />


            <div>Tell us why you're using NUSConnect:
                <div className="fine-print">You can always turn these options off if you think you need a break.</div>
                <div>
                    <button
                        onClick={manageClickForWantsToBefriend}
                        className="options-button"
                        style={{backgroundColor: wantsToBefriend ? 'lightgreen' : '#108672'}}
                    >
                        <div className="indicator-checkbox">{wantsToBefriend ? <FaCheckCircle/> : <FaCircle/>}</div>
                        To make new connections
                    </button>
                </div>
                <div>
                    <button
                        onClick={manageClickForWantsToTutor}
                        className="options-button"
                        style={{backgroundColor: wantsToTutor ? 'lightgreen' : '#108672'}}
                    >
                        <div className="indicator-checkbox">{wantsToTutor ? <FaCheckCircle/> : <FaCircle/>}</div>
                        To be a volunteer tutor
                    </button>
                </div>
            </div>

            <div>If you want to become a volunteer tutor, tell us which module you would like to tutor:</div>
            <input
                onChange={getInput}
                className="each"
                placeholder='Module Code(Write in all caps, omit spacing)'
                name="Module Code"
            />
            <div className="fine-print">Writing in all capital-letters and no spacing facilitates search for tutors.
            </div>
        </div>

        <button className='save' onClick={updateProfileData}>
            Save
        </button>
    </div>
  )
}
