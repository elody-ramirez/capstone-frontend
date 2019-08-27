import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'

import apiUrl from '../../apiConfig'

class Posts extends Component {
  constructor () {
    super()

    this.state = {
      posts: []
    }
  }

  async componentDidMount () {
    try {
      // await the response from API call
      const response = await axios(`${apiUrl}/posts`)

      // do something with response
      this.setState({ posts: response.data.posts })
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const postsJsx = this.state.posts.map(post => (
      <ListGroup.Item as="a" href={`#/posts/${post._id}`} key={post._id}>
        {post.title}
      </ListGroup.Item>
    ))

    return (
      <ListGroup>
        {this.state.posts.length ? postsJsx : <ListGroup.Item> No Posts Found</ListGroup.Item>}
        { // this.state.posts.length && postsJsx}
        }
      </ListGroup>
    )
  }
}

export default withRouter(Posts)
