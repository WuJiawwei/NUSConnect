import React, { useMemo, useState } from 'react'
import Todo from "../Pages/Todo"
import Topbar from "../Components/common/Topbar"
import { getCurrentUser } from '../api/FirestoreAPI'

export default function TodoLayout() {
    const [currentUser, setCurrentUser] = useState({})
    useMemo(() => {
        getCurrentUser(setCurrentUser)
    }, [])
    return (
        <div>
            <Topbar />
            <Todo currentUser={currentUser} />
        </div>
    )
}