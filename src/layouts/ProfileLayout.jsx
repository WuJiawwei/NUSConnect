import Profile from "../Pages/Profile"
import Topbar from "../Components/common/Topbar"
import { getCurrentUser } from "../api/FirestoreAPI"
import React, { useMemo, useState } from 'react'

export default function ProfileLayout() {
  const [currentUser, setCurrentUser] = useState({})
  
  useMemo(() => {
    getCurrentUser(setCurrentUser)
  }, [])
  return (
    <div>
      <Topbar />
      <Profile currentUser={currentUser} />
    </div>
  )
}
