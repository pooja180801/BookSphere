import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AppHeader from './components/AppHeader.js';
import Cart from './components/Cart.js';
import Checkout from './components/Checkout.js';
import DeliveryAddressForm from './components/Checkout.js';
import Footer from './components/Footer.js';
import ProductDetails from './components/ProductDetails.js';
import HomePage from './pages/HomePage.js';
import CustomerRoute from './Routers/CustomerRoute.js';


function App() {
  return (
    <div className='app'>

     

      <Router>
      <Routes>
      <Route path='/*' element={<CustomerRoute/>}></Route>
      </Routes>
    </Router>
   
      </div>
  

  );
}

export default App;
