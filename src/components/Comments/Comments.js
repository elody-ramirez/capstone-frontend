import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'

import Comment from './Comment'
import apiUrl from '../../apiConfig'

class Comments extends Component {
  constructor (props) {
    super(props)

    console.log(this.props)
    this.state = {
      deleted: false
    }
  }

  handleDelete = (id) => {
    console.log(id)
    axios({
      method: 'DELETE',
      url: `${apiUrl}/comments/${id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(this.setState({ deleted: true }))
      .catch(console.error)
  }

  render () {
    const { user, post } = this.props
    const { deleted } = this.state
    const comments = post.comments

    let commentsJsx

    if (deleted) {
      console.log(this.props.match.params.id)
      return <Redirect to={
        {
          pathname: `/posts/${this.props.match.params.id}`
        }
      }/>
    } else if (comments) {
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
