import React, { useState } from 'react'
import ProfileCard from "./common/ProfileCard/index"
import EditProfile from './common/EditProfile'

export default function ProfileComponent({ currentUser }) {
  const [isEdit, setisEdit] = useState(false)
  const onEdit = () => {
    setisEdit(!isEdit)
  }
  return (
    <div>
      {isEdit ? (
        <EditProfile onEdit={onEdit} currentUser={currentUser} />
      ) : (
        <ProfileCard currentUser={currentUser} onEdit={onEdit} />
      )}
    </div>
  )
}
