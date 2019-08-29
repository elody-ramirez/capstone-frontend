import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'

// React bootstrap
import ListGroup from 'react-bootstrap/ListGroup'
import { Container, Row } from 'react-bootstrap'

// Url to development and production API
import apiUrl from '../../apiConfig'

// FontAwesome with React
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

import './Posts.scss'

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
        <Row>
          <div className="col-2">
            <FontAwesomeIcon icon={faComment} />
            <p>{post.comments.length}</p>
          </div>
          <h3 className="col-8">{post.title}</h3>
          <p className="col-2">created by: {post.owner.username}</p>
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
