import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const PostForm = ({ post, handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="title">
      <Form.Label>Post title</Form.Label>
      <Form.Control
        type="text"
        placeholder="Type In The Title of Your Post"
        value={post.title}
        onChange={handleChange}
        name="title"
        required
      />
    </Form.Group>

    <Form.Group controlId="text">
      <Form.Label>Text</Form.Label>
      <Form.Control
        type="text"
        placeholder="Type In The Body of Your Post"
        value={post.text}
        onChange={handleChange}
        name="text"
        required
      />
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
)

export default PostForm
