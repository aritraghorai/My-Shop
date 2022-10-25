import React from "react";
import { Alert } from "react-bootstrap";

type propsType = {
  varient: string;
  children: JSX.Element;
};
const Message = ({ varient, children }: propsType) => {
  return <Alert variant={varient}>{children}</Alert>;
};
Message.defaultProps = {
  varient: "info",
};

export default Message;
