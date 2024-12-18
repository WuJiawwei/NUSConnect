import React from 'react'
import "../Sass/HomeComponent.scss"
import PostStatus from './common/CreatePost'

export default function HomeComponent({currentUser}) {
  return (
    <div className="home-component">
      <PostStatus currentUser={currentUser}/>
    </div>
  )
}