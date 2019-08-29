import React from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const Layout = props => {
  const { xs, sm, md, lg } = props
  return (
    <Container>
      <Row className="mx-auto mt-4" xs={xs} sm={sm} md={md} lg={lg}>
        {props.children}
      </Row>
    </Container>
  )
}

export default Layout
