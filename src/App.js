// import logo from './logo.svg';
// import './App.css';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './components/Home';
// import Dashboard from './components/Dashboard';
// import Add from './components/Add';
// import Qr from './components/qr';
// import GenerateInvoice from './components/GenerateInvoice';
// import GenerateQuotation from './components/GenerateQuotation';
// import AdminLogin from './components/AdminLogin';
// import UpdateQuantity from './components/updateQuantity';
// import { useState, useEffect } from 'react';


// import {  
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link
// } from "react-router-dom";
// import Display from './components/Display';
// import Invoice from './components/Invoice';
// import Quotation from './components/Quotation';
// import PInvoice from './components/PInvoice';


// function App() {
//   const [cart, setCart] = useState([]);
//   const [qrid, setQrid] = useState([]);
//   const [btnStatus, setBtnstatus] = useState('Admin Login');
//   const [dbpath, setdbpath] = useState('https://test2.royalswebtech.com/archaeoshop/');
//   const [loginstatus, setloginstatus] = useState('0');

//   const vsb = (hfVisiblity) => {
//     const elements = document.getElementsByClassName('hf-hide');
//     for(let i = 0; i < elements.length; i++) {
//         if(hfVisiblity==='1') {
//             elements[i].style.display = "visible";
//         } else {
//             elements[i].style.display = "none"; // Note: This is the same color for both conditions.
//         }
//     }
//   }

//   return (
//     <>
//       <Router>
//         <Header btnStatus={btnStatus} setBtnstatus={setBtnstatus}/>
//         <Routes>
//           <Route path="/" element={
//               <>
//                 <Home dbpath={dbpath} vsb={vsb}/>
//               </>
//           } />

//           <Route path="/Home" element={
//               <>
//                 <Home dbpath={dbpath} vsb={vsb}/>
//               </>
//           } />
//           <Route path="/Dashboard" element={<Dashboard qrid={qrid} dbpath={dbpath} cart={cart} vsb={vsb} setQrid={setQrid} setBtnstatus={setBtnstatus}/>} />
//           <Route path="/Display/:id" element={<Display dbpath={dbpath} vsb={vsb} /> } />
//           <Route path="/GenerateInvoice" element={<GenerateInvoice cart={cart} setCart={setCart} dbpath={dbpath} vsb={vsb} />} />
//           <Route path="/GenerateQuotation" element={<GenerateQuotation cart={cart} setCart={setCart} dbpath={dbpath} vsb={vsb} />} />
//           <Route path="/Add" element={<Add dbpath={dbpath} vsb={vsb} qrid={qrid} setQrid={setQrid}/>} />
//           <Route path="/UpdateQuantity" element={<UpdateQuantity dbpath={dbpath} vsb={vsb} qrid={qrid} setQrid={setQrid}/>} />
//           <Route path="/Invoice" element={<Invoice cart={cart} dbpath={dbpath} vsb={vsb} />} />
//           <Route path="/PrintInvoice" element={<PInvoice cart={cart} dbpath={dbpath} vsb={vsb} />} />
         
//           <Route path="/Quotation" element={<Quotation cart={cart} dbpath={dbpath} vsb={vsb} />} />
//           <Route path="/AdminLogin" element={<AdminLogin loginstatus={loginstatus} dbpath={dbpath} vsb={vsb} setBtnstatus={setBtnstatus} />} />
//           <Route path="/Qr" element={<Qr dbpath={dbpath} vsb={vsb} qrid={qrid}/>} />
//           <Route path="/Qr/:qrid" element={<Qr dbpath={dbpath} vsb={vsb} />} />
//         </Routes>
//         <Footer dbpath={dbpath}/>
//       </Router>
//     </>
//   );
// }

// export default App;


import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Add from './components/Add';
import Qr from './components/qr';
import GenerateInvoice from './components/GenerateInvoice';
import GenerateQuotation from './components/GenerateQuotation';
import AdminLogin from './components/AdminLogin';
import UpdateQuantity from './components/updateQuantity';
import UpdateArtifact from './components/UpdateArtifact'; // Corrected the component name
import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Display from './components/Display';
import Invoice from './components/Invoice';
import Quotation from './components/Quotation';
import PInvoice from './components/PInvoice';


function App() {
  const [cart, setCart] = useState([]);
  const [qrid, setQrid] = useState([]);
  const [btnStatus, setBtnstatus] = useState('Admin Login');
  const [dbpath, setdbpath] = useState('http://localhost/archaeoshop/');
  const [artifact, setArtifact] = useState([]);

  const [loginstatus, setloginstatus] = useState('0');

  const vsb = (hfVisiblity) => {
    const elements = document.getElementsByClassName('hf-hide');
    for(let i = 0; i < elements.length; i++) {
        if(hfVisiblity==='1') {
            elements[i].style.display = "visible";
        } else {
            elements[i].style.display = "none";
        }
    }
  }

  return (
    <>
      <Router>
        <Header btnStatus={btnStatus} setBtnstatus={setBtnstatus}/>
        <Routes>
          <Route path="/" element={<Home dbpath={dbpath} vsb={vsb} />} />
          <Route path="/Home" element={<Home dbpath={dbpath} vsb={vsb} />} />
          <Route path="/Dashboard" element={<Dashboard qrid={qrid} dbpath={dbpath} cart={cart} vsb={vsb} setQrid={setQrid} setBtnstatus={setBtnstatus}/>} />
          <Route path="/Display/:id" element={<Display dbpath={dbpath} vsb={vsb} />} />
          <Route path="/GenerateInvoice" element={<GenerateInvoice cart={cart} setCart={setCart} dbpath={dbpath} vsb={vsb} />} />
          <Route path="/GenerateQuotation" element={<GenerateQuotation cart={cart} setCart={setCart} dbpath={dbpath} vsb={vsb} />} />
          <Route path="/Add" element={<Add dbpath={dbpath} vsb={vsb} qrid={qrid} setQrid={setQrid} />} />
          <Route path="/UpdateQuantity" element={<UpdateQuantity dbpath={dbpath} vsb={vsb} qrid={qrid} setQrid={setQrid} />} />
          <Route path="/UpdateArtifact" element={<UpdateArtifact dbpath={dbpath} vsb={vsb} qrid={qrid} setQrid={setQrid} />} />

          <Route path="/Invoice" element={<Invoice cart={cart} dbpath={dbpath} vsb={vsb} />} />
          <Route path="/PrintInvoice" element={<PInvoice cart={cart} dbpath={dbpath} vsb={vsb} />} />
          <Route path="/Quotation" element={<Quotation cart={cart} dbpath={dbpath} vsb={vsb} />} />
          <Route path="/AdminLogin" element={<AdminLogin loginstatus={loginstatus} dbpath={dbpath} vsb={vsb} setBtnstatus={setBtnstatus} />} />
          <Route path="/Qr" element={<Qr dbpath={dbpath} vsb={vsb} qrid={qrid} />} />
          <Route path="/Qr/:qrid" element={<Qr dbpath={dbpath} vsb={vsb} />} />
        </Routes>
        <Footer dbpath={dbpath}/>
      </Router>
    </>
  );
}

export default App;
