import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import AddProducts from './Pages/AddProducts';
import PostProduct from './Pages/PostProduct';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import PrivateRoute from './Components/PrivateRoute';
import DashBoard from './Pages/DashBoard';
import OnlyAdminPrivateRoute from './Components/OnlyAdminPrivateRoute';
import UpdateProducts from './Pages/UpdateProduct';
import ProductPage from './Pages/ProductPage';
import Cart from './Pages/Cart';
import Ordersummary from './Pages/Ordersummary';
import UpdateOrder from './Pages/UpdateOrder';
import CheckoutSuccess from './Pages/CheckoutSuccess';
import Categories from './Components/Categories';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/product-page" element={<ProductPage/>}/>
        <Route path="/" element={<Categories />} />
        <Route path="/product/:productSlug" element={<PostProduct />} />

        <Route element={<PrivateRoute/>}/>
          <Route path="/dashboard" element={<DashBoard/>}/> 
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order-summary" element={<Ordersummary/>}/>
          <Route path="/order-pay-success" element={<CheckoutSuccess/>}/>
        <Route/> 

        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/addproduct" element={<AddProducts />} />
          <Route path="/update-product/:productId" element={<UpdateProducts/>}/>
          <Route path="/update-order/:orderId" element={<UpdateOrder/>}/>
        </Route>
       

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
