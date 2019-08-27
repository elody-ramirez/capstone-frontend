import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Comments from '../Comments/Comments'

import apiUrl from '../../apiConfig'

class Post extends Component {
  constructor () {
    super()

    this.state = {
      post: null,
      deleted: false
    }
  }

  async componentDidMount () {
    try {
      // await the response from API call
      const response = await axios(`${apiUrl}/posts/${this.props.match.params.id}`)

      // do something with response
      console.log(response)
      console.log(response.data.post.comments)
      this.setState({ post: response.data.post })
    } catch (error) {
      console.error(error)
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
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }

  render () {
    const { post, deleted } = this.state
    const { user } = this.props

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
        <Button href={`#posts/${post._id}/edit`}>Update This Post</Button>
        <Button onClick={this.deletePost}>Delete This Post</Button>
      </Fragment>

      postJsx =
      <div>
        { post && (
          <Fragment>
            <h1>{post.title}</h1>
            <h2>{post.text}</h2>
            {(this.props.user && post) && this.props.user._id === post.owner
              ? updateAndDelete
              : ''
            }
            <Comments user={user} alert={alert} post={post} />
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
