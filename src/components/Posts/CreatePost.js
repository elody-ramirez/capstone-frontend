import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import PostForm from './PostForm'

class CreatePost extends Component {
  state = {
    post: {
      title: '',
      text: ''
    }
  }

  handleChange = event => {
    this.setState({
      post: { ...this.state.post, [event.target.name]: event.target.value }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/posts`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        post: this.state.post
      }
    })
      .then(response => {
        this.props.alert({
          heading: 'Success!!!!!!',
          message: 'You created a post.',
          variant: 'success'
        })
        this.props.history.push(`/posts/${response.data.post._id}`)
      })
      .catch(console.error)
  }

  render () {
    return (
      <PostForm
        post={this.state.post}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(CreatePost)
