import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'

import Comment from './Comment'
import apiUrl from '../../apiConfig'

class Comments extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  handleDelete = (id) => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/comments/${id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(this.props.updatePostState)
      .catch(console.error)
  }

  render () {
    const { user, post } = this.props
    const comments = post.comments

    let commentsJsx

    if (comments) {
      commentsJsx = comments.map(comment => (
        <ListGroup.Item key={comment._id}>
          <Comment
            user={user} alert={alert} comment={comment} post={post} handleDelete={this.handleDelete}
          />
        </ListGroup.Item>
      ))
    } else {
      commentsJsx = 'No Comments, Be The First'
    }

    return (
      <ListGroup>
        <ListGroup.Item>
          {commentsJsx}
        </ListGroup.Item>
      </ListGroup>
    )
  }
}

export default withRouter(Comments)
