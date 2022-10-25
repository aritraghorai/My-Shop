import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import FromContainer from "../../Components/FromContainer";
import Loadder from "../../Components/Loadder";
import Message from "../../Components/Message";
import { useAppDispatch } from "../../redux/Hooks/hooks";
import {
  getUserDetailByIdAction,
  updateUserByIdAction,
} from "../../Redux/Reducers/Admin/UserDetailById";
import { RootState, showAlertFun } from "../../redux/store";

const UserEdit = () => {
  const { id } = useParams();
  console.log(id);
  const [userEdit, setUserEditState] = useState({
    name: "",
    email: "",
  });

  const [checkboxState, setCheackboxState] = useState(false);

  const dispatch = useAppDispatch();

  const { isLoading, error, user } = useSelector(
    (state: RootState) => state.userDetail
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (id) dispatch(getUserDetailByIdAction({ id }));
  }, []);

  useEffect(() => {
    if (user) {
      setUserEditState({
        name: user.name,
        email: user.email,
      });
      setCheackboxState(user.isAdmin);
    }
  }, [user]);

  const submitHander = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id)
      dispatch(
        updateUserByIdAction({
          id,
          body: {
            name: userEdit.name,
            email: userEdit.email,
            isAdmin: checkboxState,
          },
        })
      );
    if (!error) {
      navigate("/admin/userlist");
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEditState({ ...userEdit, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Link to="/admin/userList" className="btn btn-block btn-dark">
        Go Back
      </Link>
      <FromContainer>
        <h1>User Edit</h1>
        {isLoading ? <Loadder /> : <></>}
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
              placeholder="Enter Your New Name"
              value={userEdit.name}
              onChange={onChangeHandler}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              required
              placeholder="Enter Your Email"
              value={userEdit.email}
              onChange={onChangeHandler}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="isAdmin" className="py-2">
            <Form.Check
              type="checkbox"
              name="isAdmin"
              label="Is Admin"
              checked={checkboxState}
              onChange={() => {
                setCheackboxState(!checkboxState);
              }}
            ></Form.Check>
          </Form.Group>
          <Button type="submit" className="my-3" variant="primary">
            Update
          </Button>
        </Form>
      </FromContainer>
    </>
  );
};

export default UserEdit;
