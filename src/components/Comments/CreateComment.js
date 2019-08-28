import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import CommentForm from './CommentForm'

class CreateComment extends Component {
  state = {
    comment: {
      text: '',
      post: '5d6548bf5b542c0d046a4170'
    }
  }

  handleChange = event => {
    this.setState({
      comment: { ...this.state.comment, [event.target.name]: event.target.value }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/comments`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        comment: this.state.comment
      }
    })
      .then(response => {
        this.props.alert({
          heading: 'Success!!!!!!',
          message: 'You created a comment.',
          variant: 'success'
        })
        this.props.history.push('/posts/5d6548bf5b542c0d046a4170')
      })
      .catch(console.error)
  }

  render () {
    return (
      <CommentForm
        comment={this.state.comment}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(CreateComment)
