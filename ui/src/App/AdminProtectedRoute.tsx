import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/Hooks/hooks";

type Props = {
  children: JSX.Element;
};

export default function AdminProtectedRoute({ children }: Props) {
  const userDetail = useAppSelector((state) => state.loginDetail);
  if (!userDetail.user?.isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
}
