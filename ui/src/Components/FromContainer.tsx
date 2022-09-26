import { Col, Container, Row } from 'react-bootstrap';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const FromContainer = (props: Props) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
};

export default FromContainer;
