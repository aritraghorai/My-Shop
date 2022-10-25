import React, { useCallback, useEffect } from "react";
import { Card, Col, ListGroup, Row, Image, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loadder from "../Components/Loadder";
import Message from "../Components/Message";
import { useAppDispatch } from "../redux/Hooks/hooks";
import {
  checkOrderSuccess,
  getOrderDetail,
} from "../Redux/Reducers/orderDetailSlice";
import { RootState } from "../Redux/store";
import useRazorpay, { RazorpayOptions } from "react-razorpay";

const OrderSceen = () => {
  const param = useParams();
  const KEY = import.meta.env.VITE_AZORPAY_KEY_ID;
  const id = param.id || "";

  const { error, isLoading, order } = useSelector(
    (state: RootState) => state.orderDetail
  );
  const url = import.meta.env.VITE_URL;
  const dispatch = useAppDispatch();
  const Razorpay = useRazorpay();
  const handlePayment = useCallback(() => {
    const options: RazorpayOptions = {
      key: KEY,
      amount: String(order?.totalPrice),
      currency: "INR",
      name: "MyShop",
      description: "Online Payment",
      image: "https://example.com/your_logo",
      order_id: order?.paymentResult?.id as string,
      handler: (res) => {
        dispatch(
          checkOrderSuccess({
            razorpay_order_id: res.razorpay_order_id,
            razorpay_payment_id: res.razorpay_payment_id,
            razorpay_signature: res.razorpay_signature,
            order_id: order?._id as string,
          })
        );
      },
      prefill: {
        name: order?.user?.name,
        email: order?.user?.email,
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  useEffect(() => {
    if (id) {
      dispatch(getOrderDetail({ id }));
    }
  }, [id]);
  if (error) {
    return (
      <Message varient="danger">
        <>{error}</>
      </Message>
    );
  }
  return (
    <>
      {isLoading && <Loadder />}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>Name:{order?.user?.name}</p>
              <p>Email:{order?.user?.email}</p>
              <p>
                <strong>Address:</strong>
                {order?.shippingAddress?.address},{order?.shippingAddress?.city}
                ,{order?.shippingAddress?.postalCode},
                {order?.shippingAddress?.country}
              </p>
              {order?.isDelivered ? (
                <Message>
                  <>Successfully Deliver on {order?.deliveredAt}</>
                </Message>
              ) : (
                <Message varient="danger">
                  <div>Not Deliver</div>
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payemt Method</h2>
              <strong>Method:</strong>
              {order?.payementMethod}
              {order?.isPaid ? (
                <Message>
                  <>Successfully Paid on {order?.paidAt}</>
                </Message>
              ) : (
                <Message varient="danger">
                  <div>Not Paid</div>
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Item</h2>
              {order?.orderItem.length === 0 ? (
                <Message>
                  <div>Your Card Is Empty</div>
                </Message>
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItem.map((item, index) => (
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
                            style={{ textDecoration: "none" }}
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
                  <Col>${order?.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  style={{ width: "90%" }}
                  onClick={handlePayment}
                  disabled={order?.isPaid}
                >
                  Pay
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderSceen;
