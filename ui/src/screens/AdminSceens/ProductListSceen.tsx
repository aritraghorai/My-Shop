import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loadder from "../../Components/Loadder";
import { useAppDispatch } from "../../redux/Hooks/hooks";
import { getAllProductAction } from "../../Redux/Reducers/fetchProduct";
import { RootState } from "../../Redux/store";

const ProductListSceen = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useSelector(
    (state: RootState) => state.productList
  );
  console.log(products);

  useEffect(() => {
    dispatch(getAllProductAction());
  }, []);

  if (isLoading) {
    return <Loadder />;
  }

  return (
    <>
      <Table striped bordered hover responsive size="sm" className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>BRAND</th>
            <th>CATAGORY</th>
            <th>COUNTINSTOCK</th>
            <th>PRICE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>{product.countInStock}</td>
              <td>{product.price}</td>
              <td>
                <LinkContainer to={`/admin/user/${product._id}/edit`}>
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

export default ProductListSceen;
