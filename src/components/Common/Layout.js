import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Layout = props => {
  const { xs, sm, md, lg } = props
  return (
    <Row>
      <Col className="mx-auto mt-4" xs={xs} sm={sm} md={md} lg={lg}>
        {props.children}
      </Col>
    </Row>
  )
}

export default Layout
