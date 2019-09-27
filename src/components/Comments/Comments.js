import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'

import Comment from './Comment'
import CreateComment from './CreateComment'
import apiUrl from '../../apiConfig'

import './Comments.scss'

class Comments extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  onCreate = () => {
    this.props.updatePostState()
  }

  handleDelete = (id) => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/comments/${id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(response => {
        this.props.alert({
          heading: 'Success!!!!!!',
          message: 'You deleted a comment.',
          variant: 'success'
        })
        this.props.updatePostState()
      })
      .catch(console.error)
  }

  render () {
    const { user, post, alert } = this.props
    const comments = post.comments

    let commentsJsx

    if (comments.length !== 0) {
      commentsJsx = comments.map(comment => (
        <ListGroup.Item key={comment._id}>
          <Comment
            user={user} alert={alert} comment={comment} post={post} handleDelete={this.handleDelete}
          />
        </ListGroup.Item>
      )).reverse()
    } else {
      commentsJsx = 'No Comments, Be The First'
    }

    return (
      <ListGroup>
        { user &&
          <ListGroup.Item>
            <div className='test'>
              <h2>Create a Comment here</h2>
              <CreateComment
                user={user}
                post={post}
                alert={alert}
                onCreate={this.onCreate}
              />
            </div>
          </ListGroup.Item>
        }
        <ListGroup.Item>
          {commentsJsx}
        </ListGroup.Item>
      </ListGroup>
    )
  }
}

export default withRouter(Comments)
