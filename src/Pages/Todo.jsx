import React from 'react'
import TodoComponent from '../Components/TodoComponent'

export default function Todo({currentUser}) {
  return <TodoComponent currentUser={currentUser} />
}