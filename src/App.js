import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Add from './components/Add';
import Qr from './components/qr';
import GenerateInvoice from './components/GenerateInvoice';
import { useState, useEffect } from 'react';

import {  
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Display from './components/Display';
import Invoice from './components/Invoice';


function App() {
  const [cart, setCart] = useState([]);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={
              <>
                <Home/>
              </>
          }>
          </Route>

          <Route exact path="/Dashboard" element={
            <Dashboard />
          }>
          </Route>
 
          <Route exact path="/Display/:id" element= {
            <>
              <Display/>
            </>
          } >
          </Route>
          
          <Route exact path="/GenerateInvoice" element={
            <GenerateInvoice cart={cart} setCart={setCart}/>
          }>
          </Route>

          <Route exact path="/Add" element={
            <Add />
          }></Route>

          <Route exact path="/Invoice" element={
            <Invoice cart={cart}/>
          }></Route>

          <Route exact path="/Qr" element={
            <Qr />
          }>
          </Route>
         
        </Routes>
        <br/><br/>
        <Footer />
      </Router>
    </>
  );
}

export default App;
