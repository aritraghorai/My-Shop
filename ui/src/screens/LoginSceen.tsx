import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FromContainer from "../Components/FromContainer";
import Loadder from "../Components/Loadder";
import Message from "../Components/Message";
import { useAppDispatch } from "../redux/Hooks/hooks";
import { login } from "../Redux/Reducers/userAuthSlice";
import { RootState } from "../redux/store";

const LoginSceen = () => {
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const userDetail = useSelector((state: RootState) => state.loginDetail);
  const { loading, error } = userDetail;
  const navigate = useNavigate();
  useEffect(() => {
    if (userDetail.token) {
      if (redirect) {
        navigate(`/${redirect}`);
      } else {
        navigate("/");
      }
    }
  }, [userDetail.token]);

  const submitHander = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setEmail("");
    setPassword("");
  };
  return (
    <FromContainer>
      <h1>SIGN IN</h1>
      {loading ? <Loadder /> : <></>}
      {error ? (
        <Message varient="danger">
          <div>{error}</div>
        </Message>
      ) : (
        <></>
      )}
      <Form onSubmit={submitHander}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="my-3" variant="primary">
          Sign in
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?
          <Link
            style={{ textDecoration: "none", font: "bold" }}
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FromContainer>
  );
};

export default LoginSceen;
