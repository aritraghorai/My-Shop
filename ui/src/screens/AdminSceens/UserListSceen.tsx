import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loadder from "../../Components/Loadder";
import { useAppDispatch } from "../../redux/Hooks/hooks";
import { getAllUsers } from "../../Redux/Reducers/Admin/listAllUser";
import { RootState } from "../../Redux/store";

const UserListSceen = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading } = useSelector(
    (state: RootState) => state.allUsers
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  if (isLoading) {
    return <Loadder />;
  }

  return (
    <>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>
                {user.isAdmin ? (
                  <i className="fa fa-check" style={{ color: "green" }} />
                ) : (
                  <i className="fa fa-times" style={{ color: "red" }} />
                )}
              </td>
              <td>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button variant="light">
                    <i className="fa fa-edit"></i>
                  </Button>
                </LinkContainer>
                <Button variant="danger">
                  <i className="fa fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserListSceen;
