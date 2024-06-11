import React from 'react'
import "./index.scss"
import { onLogout } from '../../../api/AuthAPI'

export default function ProfilePopup() {
  return (
    <div className="card">
        <ul className="options">
            <li className="option" onClick={onLogout}>
              Logout
            </li>
        </ul>      
    </div>
  )
}
