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
          placeholder='Hobby' 
          name = "hobby"
        />

        <input 
          onChange={getInput}
          className="each" 
          placeholder='Tagline' 
          name = "tagline"
        />

      </div>

      <button className='save' onClick={updateProfileData}>
        Save
      </button>
    </div>
  )
}
