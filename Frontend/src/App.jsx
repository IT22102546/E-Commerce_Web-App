import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import Footer from './Components/Footer';

export default function App() {
  return (
    
   <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
    <Footer/>
   </BrowserRouter>
  )
}
