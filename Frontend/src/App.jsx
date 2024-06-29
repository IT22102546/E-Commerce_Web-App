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

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route element={<PrivateRoute/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/> 
        <Route path="/addproduct" element={<AddProducts />} />
        <Route path="/product/:productSlug" element={<PostProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
