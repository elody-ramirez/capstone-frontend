import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import PostForm from './PostForm'

class UpdatePost extends Component {
  state = {
    post: {
      title: '',
      text: ''
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/posts/${this.props.match.params.id}`)
      .then(response => this.setState({ post: response.data.post }))
      .catch(() => this.props.alert({
        heading: 'Error',
        message: 'You failed',
        variant: 'danger'
      }))
  }

  handleChange = event => {
    this.setState({
      post: { ...this.state.post, [event.target.name]: event.target.value }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'PATCH',
      url: `${apiUrl}/posts/${this.state.post._id}`,
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
          message: 'You updated a post.',
          variant: 'success'
        })
        console.log('this is', response)
        this.props.history.push(`/posts/${this.state.post._id}`)
      })
      .catch(console.error)
  }

  render () {
    if (!this.state.post) {
      return (
        <h1>Loading...</h1>
      )
    }
    return (
      <PostForm
        post={this.state.post}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(UpdatePost)
