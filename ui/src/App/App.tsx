import * as React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import AlertComponent from "../Components/AlertComponent";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

export default function App() {
  return (
    <>
      <Header />
      <AlertComponent />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
}
