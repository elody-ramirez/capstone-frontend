import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Comment = ({ comment, user, handleEdit, handleDelete }) => {
  const commentJsx =
  <Fragment>
    <p>{comment.text}</p>
    <p>Created by:{comment.owner.username}</p>
    {user && user._id === comment.owner._id
      ? <Fragment>
        <Button onClick={() => handleDelete(comment._id)}>
          Delete This Comment
        </Button>
      </Fragment>
      : ''}
  </Fragment>

  return commentJsx
}

export default withRouter(Comment)
