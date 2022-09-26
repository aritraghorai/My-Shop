import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rating from '../Components/Rating';
import { useSelector } from 'react-redux';
import Loadder from '../Components/Loadder';
import Message from '../Components/Message';
import { useAppDispatch } from '../redux/Hooks/hooks';
import { getProductDetail } from '../redux/Reducers/fetchParticularProduct';
import { RootState } from '../redux/store';

const ProductScreen = () => {
  const url = import.meta.env.VITE_URL;
  const [Qty, setQty] = useState(1);
  const { loading, product, error } = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: RootState) => state.productDetail
  );
  const param = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductDetail(param.id as string));
  }, [param]);
  const navigate = useNavigate();
  const addToCardHandler = () => {
    navigate(`/cart/${param.id}?qty=${Qty}`);
  };
  return (
    <>
      {loading ? (
        <Loadder />
      ) : error ? (
        <Message varient="danger">
          <div>Error</div>
        </Message>
      ) : (
        <div>
          <Link className="btn btn-dark my-3" to="/">
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={`${url}${product.image}`} alt={product?.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  {product?.rating && (
                    <Rating
                      value={product?.rating}
                      text={`${product?.numReviews} Reviews`}
                    />
                  )}
                </ListGroup.Item>
                <ListGroup.Item>Price ${product?.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description:{product?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product?.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product?.countInStock > 0
                          ? 'In Stock'
                          : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={Qty}
                            onChange={(e) => {
                              setQty(Number(e.target.value));
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroup.Item className="text-center">
                    <Button
                      className="btn-block w-75"
                      disabled={product?.countInStock <= 0}
                      type="button"
                      onClick={addToCardHandler}
                    >
                      Add To Card
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
