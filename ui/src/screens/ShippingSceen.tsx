import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckOutStep from '../Components/CheckOutStep';
import FromContainer from '../Components/FromContainer';
import { useAppDispatch } from '../redux/Hooks/hooks';
import { addShippingAddress } from '../Redux/Reducers/addToCardSlice';
import { resetOrderDetail } from '../Redux/Reducers/orderDetailSlice';
import { resetOrder } from '../Redux/Reducers/orderSlice';
import { RootState } from '../Redux/store';
const ShippingSceen = () => {
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };
  const dispatch = useAppDispatch();
  const shippingAddressState = useSelector(
    (state: RootState) => state.card.shippingAddress
  );
  const navigate = useNavigate();
  const onSubmutHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addShippingAddress(shippingAddress));
    navigate('/payment');
  };
  useEffect(() => {
    dispatch(resetOrder());
    dispatch(resetOrderDetail());
    if (shippingAddressState) {
      setShippingAddress({ ...shippingAddressState });
    }
  }, []);
  return (
    <FromContainer>
      <CheckOutStep step1={true} step2={true} />
      <h1>Shipping</h1>
      <Form onSubmit={onSubmutHandler}>
        <FormGroup>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Address"
            name="address"
            id="address"
            required
            value={shippingAddress.address}
            onChange={onChange}
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your City"
            name="city"
            id="city"
            required
            value={shippingAddress.city}
            onChange={onChange}
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Pin Code"
            name="postalCode"
            id="postalCode"
            required
            value={shippingAddress.postalCode}
            onChange={onChange}
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Country"
            name="country"
            id="country"
            required
            value={shippingAddress.country}
            onChange={onChange}
          ></Form.Control>
        </FormGroup>
        <Button type="submit" variant="primary" className="mt-2">
          Submit
        </Button>
      </Form>
    </FromContainer>
  );
};
export default ShippingSceen;
