import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loadder from "../Components/Loadder";
import Message from "../Components/Message";
import Product from "../Components/Product";
import { useAppDispatch } from "../redux/Hooks/hooks";
import { getAllProductAction } from "../redux/Reducers/fetchProduct";
import { RootState } from "../redux/store";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const HomeScreen = () => {
  const {
    products,
    error,
    isLoading: loading,
  } = useSelector((state: RootState) => state.productList);
  const [parent] = useAutoAnimate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProductAction());
  }, [dispatch]);
  return (
    <>
      <h1>Latest Product</h1>
      {loading ? (
        <Loadder />
      ) : error ? (
        <Message varient="danger">
          <div>{error}</div>
        </Message>
      ) : (
        <Row ref={parent}>
          {products &&
            products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
