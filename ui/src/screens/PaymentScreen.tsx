import React, { useEffect, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckOutStep from '../Components/CheckOutStep';
import FromContainer from '../Components/FromContainer';
import { useAppDispatch } from '../redux/Hooks/hooks';
import { addPaymentMode } from '../Redux/Reducers/addToCardSlice';
import { RootState } from '../Redux/store';

const PaymentScreen = () => {
  const shippingAddressState = useSelector(
    (state: RootState) => state.card.shippingAddress
  );

  const [paymentMethod, setPaymentMethod] = useState('Razorpay');
  const navigate = useNavigate();
  useEffect(() => {
    if (!shippingAddressState) {
      navigate('/shipping');
    }
  }, []);
  const dispatch = useAppDispatch();
  const onSubmutHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addPaymentMode(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FromContainer>
      <CheckOutStep step1={true} step2={true} step3={true} />
      <h1>Payment Mathod</h1>
      <Form.Group>
        <Form.Label as="legend">Select Method</Form.Label>
        <Col>
          <Form.Check
            type="radio"
            label="Razorpay"
            id="Razorpay"
            name="paymentMethod"
            value="Razorpay"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
      </Form.Group>
      <Form onSubmit={onSubmutHandler}>
        <Button type="submit" variant="primary" className="mt-2">
          Continue
        </Button>
      </Form>
    </FromContainer>
  );
};

export default PaymentScreen;
