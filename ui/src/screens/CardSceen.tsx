import { useEffect } from "react";
import {
  Col,
  ListGroup,
  Row,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Message from "../Components/Message";
import { useAppDispatch } from "../redux/Hooks/hooks";
import addToCardSlice, {
  addToCardAction,
} from "../redux/Reducers/addToCardSlice";
import { RootState } from "../redux/store";
const CardSceen = () => {
  const url = import.meta.env.VITE_URL;
  const { id } = useParams();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const cartItem = useSelector((state: RootState) => state.card.cardItems);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(addToCardAction({ id, qty }));
    }
  }, [qty]);
  const removeFromCardHandler = (_id: string) => {
    dispatch(addToCardSlice.actions.removeFromCard(_id));
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shoping Cart</h1>
        {cartItem.length === 0 ? (
          <Message>
            <div>
              Your cart is empty{" "}
              <Link to="/" style={{ textDecoration: "none" }}>
                Go Back
              </Link>
            </div>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItem.map((item) => {
              const { product } = item;
              return (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={`${url}${item.image}`}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`product/${item.product}`}
                        style={{ textDecoration: "none" }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCardAction({
                              id: product,
                              qty: Number(e.target.value),
                            })
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCardHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItem.reduce((acc, item) => acc + item.qty, 0).toFixed(2)})
                Items
              </h2>
              ${cartItem.reduce((acc, item) => acc + item.qty * item.price, 0)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItem.length == 0}
                onClick={() => {
                  navigate("/login?rediret=shipping");
                }}
              >
                Processed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CardSceen;
