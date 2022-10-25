import React from "react";
import { Card, CardImg } from "react-bootstrap";
import { Link } from "react-router-dom";
import productType from "../Utils/Types/productType";
import Rating from "./Rating";

type Props = {
  product: productType;
};

const Product = (props: Props) => {
  const url = import.meta.env.VITE_URL;
  const { _id, name, image, price, rating, numReviews } = props.product;
  return (
    <Card className="p-3 my-2  rounded" style={{ height: "95%" }}>
      <Link to={`/product/${_id}`}>
        <CardImg src={`${url}${image}`} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title>
            {" "}
            <strong>{name}</strong>{" "}
          </Card.Title>
        </Link>
        <Card.Text>
          <Rating value={rating} text={`${numReviews} Reviews`} />
        </Card.Text>
        <Card.Text as="h3">${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
