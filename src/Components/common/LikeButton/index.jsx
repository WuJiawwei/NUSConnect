import React, {useState, useMemo} from 'react'
import "./index.scss"
import { FaRegHeart, FaHeart, FaCommentDots} from 'react-icons/fa'
import { 
  fetchComments,
  LikePost, 
  getLike, 
  saveComment } from '../../../api/FirestoreAPI'
import { getCurrentTimeStamp } from '../../../Helpers/useMoment'

export default function LikeButton({ userId, postId, currentUser}) {
  const [likeNum, setLikeNum] = useState(0)
  const [liked, setLiked] = useState(false)
  const [commentVisible, setCommentVisible] = useState(false)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  const changeLike = () => {
    LikePost(userId, postId, liked)
  }
  const fetchComment = (obj) => {
    setComment(obj.target.value)
  }

  const addComment = () => {
    saveComment(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name, currentUser?.avatar)
    setComment("")
  }

  useMemo(() => {
    getLike(userId, postId, setLiked, setLikeNum)
    fetchComments(postId, setComments)
  }, [userId, postId])
  return (
    <div>
      <div className='like-comment'>
        <div className='caption' onClick={changeLike}>
          {liked ? (
            <FaHeart size={20} color="pink" />
          ) : (
            <FaRegHeart size={20}/>
          )}
          {likeNum}
        </div>
        <div 
          className='caption' 
          onClick={() => setCommentVisible(!commentVisible)}>
          <FaCommentDots size={20} color="rgb(6, 42, 6)"/>
        </div>
      </div>
      {commentVisible ? (
        <>
          <input 
            onChange={fetchComment}
            placeholder='Comment here' 
            className='box'
            name="comment"
            value= {comment}
          />
          <button className='comment-button' onClick={addComment}>
            Post
          </button>

          {comments.length > 0 ? comments.map((C) => {
            return (
              <div className="comment-line">
                <div className="commenter-name-and-avatar">
                  <img className="commenter-avatar" src={C.CAvatar} width={30}/>
                  <p className='name'>{C.CName}</p>
                </div>
                <p className="every-comment">{C.comment}</p>

                <p className="time">{C.time}</p>
              </div>
            )
          }) : <></>}
        </>
      ) : (
        <></>
      )}
    </div>
  )
}