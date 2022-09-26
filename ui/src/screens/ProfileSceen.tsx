import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import Loadder from '../Components/Loadder';
import Message from '../Components/Message';
import { RootState } from '../redux/store';
import { useAppDispatch } from '../redux/Hooks/hooks';
import { fetchAllOrderAction } from '../Redux/Reducers/userOrdersSlice';
import { LinkContainer } from 'react-router-bootstrap';

const ProfileScreen = () => {
  const [userState, setUserState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const allOrder = useSelector((state: RootState) => state.ordersByUser.orders);

  const userDetail = useSelector((state: RootState) => state.loginDetail);
  const { loading, error } = userDetail;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userDetail.token) {
      navigate('/login');
    } else {
      console.log('hi');
      dispatch(fetchAllOrderAction());
      setUserState({
        ...userState,
        name: userDetail.user?.name as string,
        email: userDetail.user?.email as string,
      });
    }
  }, [userDetail.token]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  return (
    <Row>
      <Col md={5}>
        <h2>User Profile</h2>
        {loading ? <Loadder /> : <></>}
        {error && (
          <Message varient="danger">
            <div>{error}</div>
          </Message>
        )}
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                name="name"
                required
                placeholder="Enter Your Email"
                value={userState.name}
                disabled
              ></Form.Control>
              <Button
                variant="outline-secondary"
                id="button-addon1"
                onClick={() => {
                  navigate('/profile/edit?id=name');
                }}
              >
                <FiEdit />
              </Button>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <InputGroup>
              <Form.Control
                type="email"
                name="email"
                required
                placeholder="Enter Your Email"
                value={userState.email}
                disabled
              ></Form.Control>
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={() => {
                  navigate('/profile/edit?id=email');
                }}
              >
                <FiEdit />
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
        <Button
          type="submit"
          className="mt-3"
          onClick={() => {
            navigate('/profile/edit?id=password');
          }}
        >
          Change Password
        </Button>
      </Col>
      <Col md={7}>
        <h2>My Order</h2>
        <Table
          striped
          bordered
          hover
          responsive
          className="table-sm"
          style={{ fontSize: '.8rem' }}
        >
          <thead>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVER</th>
            <th></th>
          </thead>
          <tbody>
            {allOrder?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt?.substring(0, 10)
                  ) : (
                    <i className="fa fas fa-times"></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt?.substring(0, 10)
                  ) : (
                    <i className="fa fas fa-times"></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button size="sm" variant="primary">
                      Detail
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
