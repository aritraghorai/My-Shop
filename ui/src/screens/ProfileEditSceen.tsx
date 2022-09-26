import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import FromContainer from '../Components/FromContainer';
import Loadder from '../Components/Loadder';

import { useAppDispatch } from '../redux/Hooks/hooks';
import { showAlert } from '../Redux/Reducers/alertReducer';
import { updateUser } from '../Redux/Reducers/userAuthSlice';
import { RootState, showAlertFun } from '../redux/store';

const ProfileEditSceen = () => {
  const location = useLocation();
  const changeType = location.search
    ? location.search.split('=')[1]
    : ('/' as string);
  const [changeState, setChangeState] = useState<{
    currPassword: string;
    confirmPassword: string;
  }>({ confirmPassword: '', currPassword: '' });
  const [newTypeState, setnewTypeState] = useState<string>('');
  const dispatch = useAppDispatch();
  const userDetail = useSelector((state: RootState) => state.loginDetail);
  const { loading, error } = userDetail;
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitHander = (e: any) => {
    e.preventDefault();
    if (changeState.currPassword !== changeState.confirmPassword) {
      showAlertFun({ Type: 'danger', Message: 'Password Does not Match' });
    } else {
      if (changeType === 'name') {
        dispatch(
          updateUser({
            currPassword: changeState.currPassword,
            name: newTypeState,
          })
        );
      } else if (changeType === 'email') {
        dispatch(
          updateUser({
            currPassword: changeState.currPassword,
            email: newTypeState,
          })
        );
      } else if (changeType === 'password') {
        dispatch(
          updateUser({
            currPassword: changeState.currPassword,
            password: newTypeState,
          })
        );
      }
      navigate('/profile');
    }
  };
  useEffect(() => {
    if (!userDetail.token) {
      navigate('/login');
    }
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    setChangeState({ ...changeState, [e.target.name]: e.target.value });
  };
  return (
    <FromContainer>
      <h1>Changing {changeType}</h1>
      {loading ? <Loadder /> : <></>}
      <Form onSubmit={submitHander}>
        <Form.Group controlId={changeType}>
          <Form.Label>Enter New {changeType}</Form.Label>
          <Form.Control
            type={changeType === 'password' ? 'password' : 'text'}
            required
            name={changeType}
            placeholder={`Enter New ${changeType}`}
            value={newTypeState}
            onChange={(e) => {
              setnewTypeState(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-3" controlId="currPassword">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type="password"
            name="currPassword"
            required
            placeholder="Enter Your Password"
            onChange={onChange}
            value={changeState.currPassword}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-3" controlId="confirmPassword">
          <Form.Label>Confirm The Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Enter Password Again"
            name="confirmPassword"
            value={changeState?.confirmPassword}
            onChange={onChange}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="my-3" variant="primary">
          Update
        </Button>
      </Form>
    </FromContainer>
  );
};

export default ProfileEditSceen;
