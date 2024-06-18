import React, {useState, useMemo} from 'react'
import "./index.scss"
import { FaRegHeart, FaHeart} from 'react-icons/fa'
import { LikePost, getLike } from '../../../api/FirestoreAPI'

export default function LikeButton({ userId, postId }) {
  const [likeNum, setLikeNum] = useState(0)
  const [liked, setLiked] = useState(false)
  const changeLike = () => {
    LikePost(userId, postId, liked)
  }

  useMemo(() => {
    getLike(userId, postId, setLiked, setLikeNum)
  }, [userId, postId])
  return (
    <div className='caption' onClick={changeLike}>
      {liked ? (
        <FaHeart size={20} color="pink" />
      ) : (
        <FaRegHeart size={20}/>
      )}
      {likeNum}
    </div>
  )
}
