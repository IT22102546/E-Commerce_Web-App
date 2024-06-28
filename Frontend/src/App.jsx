import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import AddProducts from './Pages/AddProducts';
import PostProduct from './Pages/PostProduct';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addProducts" element={<AddProducts />} />
        <Route path="/product/:productSlug" element={<PostProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
