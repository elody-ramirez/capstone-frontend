import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import { Container, Row, Col } from 'react-bootstrap'

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
    const { user } = this.props
    const postsJsx = this.state.posts.map(post => (
      <ListGroup.Item as="a" href={`#/posts/${post._id}`} key={post._id}>
        {console.log(post.owner.username)}
        <Row>
          <Col><p>comment count: {post.comments.length}</p></Col>
          <Col><h3>{post.title}</h3></Col>
          <Col><p>created by: {post.owner.username}</p></Col>
        </Row>
      </ListGroup.Item>
    ))

    return (
      <Container>
        <div className="container text-right my-2">
          { user &&
            <Link to='/createpost'>
              <button className="btn btn-primary">Create a Post</button>
            </Link>
          }
        </div>
        <ListGroup>
          {this.state.posts.length ? postsJsx : <ListGroup.Item> No Posts Found</ListGroup.Item>}
          { // this.state.posts.length && postsJsx}
          }
        </ListGroup>
      </Container>
    )
  }
}

export default withRouter(Posts)
