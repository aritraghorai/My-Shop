import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FromContainer from '../Components/FromContainer';
import Loadder from '../Components/Loadder';
import Message from '../Components/Message';
import { useAppDispatch } from '../redux/Hooks/hooks';
import { registerUser } from '../redux/Reducers/userAuthSlice';
import { RootState, showAlertFun } from '../redux/store';

const RegisterScreen = () => {
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '';
  const [registerState, setRegisterState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const dispatch = useAppDispatch();
  const userDetail = useSelector((state: RootState) => state.loginDetail);
  const { loading, error } = userDetail;
  const navigate = useNavigate();
  useEffect(() => {
    if (userDetail.token) {
      if (redirect) {
        navigate(`/${redirect}`);
      } else navigate('/');
    }
  }, [userDetail.token]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitHander = (e: any) => {
    e.preventDefault();
    if (registerState.password !== registerState.passwordConfirm) {
      showAlertFun({
        Message: 'Password Do Not Match',
        Type: 'danger',
      });
    } else {
      dispatch(
        registerUser({
          name: registerState.name,
          email: registerState.email,
          password: registerState.password,
        })
      );
    }
    if (redirect) {
      navigate(`./${redirect}`);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClick = (e: any) => {
    setRegisterState({ ...registerState, [e.target.name]: e.target.value });
  };
  return (
    <FromContainer>
      <h1>SIGN UP</h1>
      {loading ? <Loadder /> : <></>}
      {error ? (
        <Message varient="danger">
          <div>{error}</div>
        </Message>
      ) : (
        <></>
      )}
      <Form onSubmit={submitHander}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            required
            placeholder="Enter Your Email"
            value={registerState.name}
            onChange={onClick}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
            placeholder="Enter Your Email"
            value={registerState.email}
            onChange={onClick}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            name="password"
            placeholder="Enter Your Password"
            value={registerState.password}
            onChange={onClick}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-3" controlId="passwordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type=""
            required
            name="passwordConfirm"
            placeholder="Enter Your Password"
            value={registerState.passwordConfirm}
            onChange={onClick}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="my-3" variant="primary">
          Sign Up
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have An Account?
          <Link
            style={{ textDecoration: 'none', font: 'bold' }}
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FromContainer>
  );
};

export default RegisterScreen;
