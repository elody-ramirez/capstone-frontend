import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

import messages from '../AutoDismissAlert/messages'
import Comments from '../Comments/Comments'
import apiUrl from '../../apiConfig'

class Post extends Component {
  constructor () {
    super()

    this.state = {
      post: null,
      deleted: false,
      changedComments: false
    }
  }

  updatePostState = () => this.setState({ changedComments: true })

  async componentDidMount () {
    try {
      // await the response from API call
      const response = await axios(`${apiUrl}/posts/${this.props.match.params.id}`)

      // do something with response
      this.setState({ post: response.data.post })
    } catch (error) {
      this.props.alert({
        heading: 'Error',
        message: messages.indexPostFailure,
        variant: 'danger'
      })
    }
  }

  async componentDidUpdate () {
    if (this.state.changedComments) {
      try {
        const response = await axios(`${apiUrl}/posts/${this.props.match.params.id}`)

        // do something with response
        this.setState({ post: response.data.post })
        this.setState({ changedComments: false })
      } catch (error) {
        this.props.alert({
          heading: 'Error',
          message: messages.indexPostFailure,
          variant: 'danger'
        })
      }
    }
  }

  deletePost = () => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/posts/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => {
        this.props.alert({
          heading: 'Success!!!!!!',
          message: messages.deletePostSuccess,
          variant: 'success'
        })
      })
      .then(() => this.setState({ deleted: true }))
      .catch(() => this.props.alert({
        heading: 'Error',
        message: messages.deletePostFailure,
        variant: 'danger'
      }))
  }

  render () {
    const { post, deleted } = this.state
    const { user, alert } = this.props

    let postJsx
    let updateAndDelete

    if (deleted) {
      return <Redirect to={
        {
          pathname: '/'
        }
      }/>
    } else if (post) {
      updateAndDelete =
      <Fragment>
        <Button variant="secondary" href={`#posts/${post._id}/edit`}>
          Update This Post
        </Button>
        <Button variant="secondary" onClick={this.deletePost}>
          Delete This Post
        </Button>
      </Fragment>

      postJsx =
      <div>
        { post && (
          <Fragment>
            <h1>{post.title}</h1>
            <p>created by: {post.owner.username}</p>
            <h3>{post.text}</h3>
            {(this.props.user && post) && this.props.user._id === post.owner._id
              ? updateAndDelete
              : ''
            }
            <Comments user={user} alert={alert} post={post}
              updatePostState={this.updatePostState} />
          </Fragment>
        )}
      </div>
    } else {
      postJsx = (
        'Loading....'
      )
    }

    return (
      <div>{postJsx}</div>
    )
  }
}

export default withRouter(Post)
