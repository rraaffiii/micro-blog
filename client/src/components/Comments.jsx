import React, { useState, useEffect, useRef, useContext } from 'react'
import CommentCreate from './CommentCreate'
import Comment from './Comment'
import PostApi from '../api/post'
import CommentApi from '../api/comment'
import { GlobalContext } from '../context/globalContext'

const Comments = ({ postId }) => {
  const global = useContext(GlobalContext)
  const token = localStorage.getItem('token')
  const [comments, setComments] = useState([])
  const commentContent = useRef(null)

  const fetchComments = () => {
    PostApi.getCommentsByPost({ postId })
      .then((res) => {
        setComments(res.data.comments)
      })
      .catch((err) =>
        global.setAlert({
          type: 'danger',
          message: err.response ? err.response.data.message : err.toString(),
        })
      )
  }
  const handleComment = (e) => {
    e.preventDefault()
    const commentData = {
      details: commentContent.current.value,
      post_id: postId,
    }
    CommentApi.createComment(commentData)
      .then((res) => {
        fetchComments()
        global.setAlert({ type: 'success', message: res.data.message })
        commentContent.current.value = null
      })
      .catch((err) => {
        global.setAlert({
          type: 'danger',
          message: err.response ? err.response.data.message : err.toString(),
        })
      })
  }

  useEffect(() => {
    fetchComments()
  }, [])
  return (
    <>
      <div className='comments border-start border-3 my-3'>
        <div className='tab ms-2 ms-sm-5'>
          {token && (
            <CommentCreate ref={commentContent} handleComment={handleComment} />
          )}
          {(comments &&
            comments.length > 0 &&
            comments.map((comment) => (
              <Comment {...comment} key={comment._id} />
            ))) || <p className='text-center'>No comment yet</p>}
        </div>
      </div>
    </>
  )
}

export default Comments
