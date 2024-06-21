import React, { useState } from 'react'
import "./index.scss"
import { editProfile } from '../../../api/FirestoreAPI'

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

  const [wantsToTutor, setWantsToTutor] = useState(false)
  const manageClickForWantToTutor = () => {
    setWantsToTutor(!wantsToTutor)
    setEditInputs((prevInputs) => ({
      ...prevInputs,
      wantsToTutor: !wantsToTutor
    }));
  }

  const [wantsToBefriend, setWantsToBefriend] = useState(false)
  const manageClickForWantToBefriend = () => {
    setWantsToBefriend(!wantsToBefriend)
    setEditInputs((prevInputs) => ({
      ...prevInputs,
      wantsToBefriend: !wantsToBefriend
    }));
  }

  console.log(editInputs)
  return (
    <div className='card'>
      <div className='edit-button'>
        <button onClick={onEdit}>Return</button>
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
          name = 'year'
        />

        <input 
          onChange={getInput}
          className="each" 
          placeholder='Major' 
          name = "major"
        />

        <input 
          onChange={getInput}
          className="each" 
          placeholder='Hobby (in one word...)'
          name = "hobby"
        />

        <input 
          onChange={getInput}
          className="each" 
          placeholder='Tagline' 
          name = "tagline"
        />


        <div>Tell us why you're using NUSConnect:
          <div className="fine-print">You can always turn these options off if you think you need a break.</div>
          <div>
            <button
                onClick={manageClickForWantToBefriend}
                className="options-button"
                style={{backgroundColor: wantsToBefriend ? 'lightgreen' : '#108672'}}
            >
              <input
                  className="indicator-checkbox"
                  type="checkbox"
                  checked={wantsToBefriend ? true : false} />
              To make new connections
            </button>
          </div>
          <div>
            <button
                onClick={manageClickForWantToTutor}
                className="options-button"
                style={{backgroundColor: wantsToTutor ? 'lightgreen' : '#108672'}}
            >
              <input
                  className="indicator-checkbox"
                  type="checkbox"
                  checked={wantsToTutor ? true : false} />
              To be a volunteer tutor
            </button>
          </div>
        </div>

        <div>If you want to become a volunteer tutor, tell us which module you would like to tutor:</div>
        <input
            onChange={getInput}
            className="each"
            placeholder='Module Code(Omit spacing)'
            name = "Module Code"
        />
      </div>

      <button className='save' onClick={updateProfileData}>
        Save
      </button>
    </div>
  )
}
