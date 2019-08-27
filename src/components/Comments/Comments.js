import React, { Component, Fragment } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

class Comments extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comments: this.props.post.comments
    }
  }

  render () {
    let commentsJsx
    let updateAndDelete

    if (this.state.comments.length) {
      updateAndDelete =
      <Fragment>
        <Button onClick={this.deletePost}>Delete This Comment</Button>
      </Fragment>

      commentsJsx = this.state.comments.map(comment => (
        <ListGroup.Item as="a" href={`#/comments/${comment._id}`} key={comment._id}>
          {comment.text}
          {(this.props.user) && this.props.user._id === comment.owner
            ? updateAndDelete
            : ''
          }
        </ListGroup.Item>
      ))
    }

    return (
      <ListGroup>
        {this.state.comments.length ? commentsJsx : <ListGroup.Item> No Comments Found</ListGroup.Item>}
        { // this.state.comments.length && commentsJsx}
        }
      </ListGroup>
    )
  }
}

export default Comments
