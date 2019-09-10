import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CommentForm = ({ comment, handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="text">
      <Form.Label>Text</Form.Label>
      <Form.Control
        type="text"
        placeholder="Type In The Body of Your Comment"
        value={comment.text}
        onChange={handleChange}
        name="text"
        required
      />
    </Form.Group>

    <Button variant="secondary" type="submit">
      Submit
    </Button>
  </Form>
)

export default CommentForm
