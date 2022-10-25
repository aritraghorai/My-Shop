import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/Hooks/hooks";
import { logoutUser } from "../Redux/Reducers/userAuthSlice";
import { RootState, showAlertFun } from "../redux/store";

const Header = () => {
  const dispatch = useAppDispatch();
  const userLoginState = useSelector((state: RootState) => state.loginDetail);
  const isLogin = userLoginState.token;
  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.clear();
    dispatch(logoutUser());
    showAlertFun({ Message: "Logout Successfully", Type: "success" });
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>My Shop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fa fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                {isLogin ? (
                  <NavDropdown title={userLoginState.user?.name}>
                    <NavDropdown.Item
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </NavDropdown.Item>

                    <NavDropdown.Item onClick={logOutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link>
                    <i className="fa fa-user"></i> Sign In
                  </Nav.Link>
                )}
              </LinkContainer>
              {userLoginState.user && userLoginState.user.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productList">
                    <NavDropdown.Item>Product</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderList">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
