import { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckOutStep from '../Components/CheckOutStep';
import Loadder from '../Components/Loadder';
import Message from '../Components/Message';
import { useAppDispatch } from '../redux/Hooks/hooks';
import { tAddpayload } from '../Redux/Reducers/addToCardSlice';
import { placeOrder } from '../Redux/Reducers/orderSlice';
import { RootState } from '../Redux/store';

const PlaceOrder = () => {
  const cart = useSelector((state: RootState) => state.card);
  const { isLoading, success, order } = useSelector(
    (state: RootState) => state.order
  );
  const itemPrice = cart.cardItems.reduce((acc: number, item: tAddpayload) => {
    return acc + item.price;
  }, 0);
  const shippingPrice = itemPrice > 100 ? 0 : 100;
  const taxPrice = Number((0.15 * itemPrice).toFixed(2));
  const totalPrice = Number(
    Number(itemPrice + shippingPrice + taxPrice).toFixed(2)
  );
  const url = import.meta.env.VITE_URL;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const placeOrderHander = () => {
    console.log('Plcace Order');
    dispatch(
      placeOrder({
        orderItem: cart.cardItems,
        shippingAddress: cart.shippingAddress,
        payementMethod: cart.payementMethod,
        itemsPrice: itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    );
  };
  useEffect(() => {
    if (success) {
      navigate(`/order/${order?._id}`);
    }
  }, [success]);
  return (
    <>
      {isLoading && <Loadder />}
      <CheckOutStep step1={true} step2={true} step3={true} step4={true} />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress?.address},{cart.shippingAddress?.city},
                {cart.shippingAddress?.postalCode},
                {cart.shippingAddress?.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payemt Method</h2>
              <strong>Method:</strong>
              {cart.payementMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Item</h2>
              {cart.cardItems.length === 0 ? (
                <Message>
                  <div>Your Card Is Empty</div>
                </Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cardItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={`${url}${item.image}`}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            style={{ textDecoration: 'none' }}
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty}*{item.price}=$
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summery</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  onClick={placeOrderHander}
                  type="submit"
                  disabled={cart.cardItems.length === 0}
                  className="btn-block"
                >
                  Plcae Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
