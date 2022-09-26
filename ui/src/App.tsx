import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import AlertComponent from './Components/AlertComponent';
import Footer from './Components/Footer';
import Header from './Components/Header';
import CardSceen from './screens/CardSceen';
import HomeScreen from './screens/HomeScreen';
import LoginSceen from './screens/LoginSceen';
import OrderSceen from './screens/OrderSceen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrder from './screens/PlaceOrder';
import ProductScreen from './screens/ProductScreen';
import ProfileEditSceen from './screens/ProfileEditSceen';
import ProfileScreen from './screens/ProfileSceen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingSceen from './screens/ShippingSceen';

function App() {
  return (
    <>
      <Header />
      <AlertComponent />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/shipping" element={<ShippingSceen />}></Route>
            <Route path="/payment" element={<PaymentScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrder />}></Route>
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id" element={<CardSceen />} />
            <Route path="/order/:id" element={<OrderSceen />} />
            <Route path="/login" element={<LoginSceen />} />
            <Route path="/cart" element={<CardSceen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/profile/edit" element={<ProfileEditSceen />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default App;
