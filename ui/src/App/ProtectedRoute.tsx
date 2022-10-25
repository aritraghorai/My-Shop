import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/Hooks/hooks";

type Props = {
  children: JSX.Element;
};

function ProtectedRoute({ children }: Props) {
  const userDetail = useAppSelector((state) => state.loginDetail);
  if (!userDetail.token) return <Navigate to="login" />;
  return children;
}

export default ProtectedRoute;
