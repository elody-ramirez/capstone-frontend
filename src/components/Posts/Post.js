import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

import apiUrl from '../../apiConfig'

class Post extends Component {
  constructor () {
    super()

    this.state = {
      post: null
    }
  }

  async componentDidMount () {
    try {
      // await the response from API call
      const response = await axios(`${apiUrl}/posts/${this.props.match.params.id}`)

      // do something with response
      console.log(response)
      this.setState({ post: response.data.post })
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const { post } = this.state

    return (
      <div>
        { post && (
          <Fragment>
            <h1>{post.title}</h1>
            <h2>{post.text}</h2>
            {(this.props.user && post) && this.props.user._id === post.owner
              ? <Button href={`#posts/${post._id}/updatepost`}>Update Post</Button>
              : ''
            }
          </Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(Post)
