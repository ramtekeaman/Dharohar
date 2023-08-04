import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./css/Add.css"
import { get } from 'react-hook-form';

let container = {
  width: '60%',
  marginLeft: '20%'
};

export default function GenerateInvoice({cart,setCart}) {

  const [id, setId] = useState('');
  const [name, setName] = useState('-');
  const [cno, setCno] = useState('-');
  const [email, setEmail] = useState('-');
  const [address, setAddress] = useState('-');
  const [price, setPrice] = useState('');
  const [pid, setPid] = useState('');
  const [qrid, setQrid] = useState('');
  const [pname, setPname] = useState('');
  const [fprice, setFprice] = useState('0');
  const [damount, setDAmount] = useState('0');
  const [gstStatus, setGststatus] = useState('0');
  const [tamount, setTamount] = useState('0');
  const [artifact, setArtifact] = useState([]);
  const [gst, setGst] = useState('0');
  const [image, setImage] = useState('');
  const [gstValue, setGstvalue] = useState('0');

  const navigate = useNavigate();

  function handleClick() {
    navigate("/Invoice");
  }



  const fetchData = async() => { 
      const result = await axios.get("http://localhost/archaeoshop/invoicefetch.php?qrid="+qrid);
      setArtifact(result.data.phpresult);
    
      setPname(result.data.phpresult[0]['name']);
      setId(result.data.phpresult[0]['id']);
      setPrice(result.data.phpresult[0]['price']);
      document.getElementById("finalp").value = result.data.phpresult[0]['price'];
    
      setImage(result.data.phpresult[0]['image']);
      addCart(qrid,result.data.phpresult[0]['name'],result.data.phpresult[0]['price']);
      calculateFprice(result.data.phpresult[0]['price'],damount,gst);
  }

  const submit = () => {
    if (name.length === 0) {
      alert("Name has been left blank!");
    }  else if (qrid.length === 0) {
      alert("QR ID has been left blank!");
    } else if (pname.length === 0) {
      alert("Product Name has been left blank!");
    } else if (id.length === 0) {
      alert("Product Id has been left blank!");
    } else if (price.length === 0) {
      alert("Product cost has been left blank!");
    }  else {
      //alert("Invoice Generated");
      const url = 'http://localhost/archaeoshop/addInvoice.php';
      let fData = new FormData();
      fData.append('name', name);
      fData.append('email', email);
      fData.append('cno', cno);
      fData.append('address', address);
      fData.append('qrid', qrid);
      fData.append('pname', pname);
      fData.append('id', id);
      fData.append('price', tamount);
      fData.append('gst', gst);
      fData.append('fprice', fprice);
      fData.append('discount', damount);
      fData.append('image', image);
      console.log(fData);
      axios.post(url, fData)
        .then(response => alert(response.data))
        .catch(error => {
          console.log(error.toJSON());
        });

      handleClick();  
    }
  }

  const calculateFprice = (cprice, cdamount, cgst) => {

    var ttamount = parseInt(tamount) + parseInt(cprice);
    setTamount(parseInt(tamount) + parseInt(cprice));
    document.getElementById('totalid').innerHTML = ttamount;
    var tdisc= (ttamount/100)*damount;
    var discountedtamount = ttamount - tdisc;
    var tgst = (discountedtamount/100)*gst;
    setFprice(parseInt(discountedtamount)+parseInt(tgst));
    document.getElementById('finalp').value = parseInt(discountedtamount)+parseInt(tgst);

  }

  const calgstanddiscount= () =>{
    var tdisc= (tamount/100)*damount;
    var discountedtamount = tamount - tdisc;
    var tgst = (discountedtamount/100)*gst;
    setFprice(parseInt(discountedtamount)+parseInt(tgst));
    document.getElementById('finalp').value = parseInt(discountedtamount)+parseInt(tgst);
  }

  const addCart = (qridf,pnamef,pricef) => { 
    setCart([
      ...cart,
      {
        qrid: qridf,
        pname: pnamef,
        price: pricef
      }
    ]);
  };
  

  return (
    <>
      <br /><br />
      <div className="container" style={container}>
        <center><h3 className="sp1">Generate Invoice</h3></center>
        <form >
          <div className="mb-3">
            <label className="form-label" >Customer Name<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" id="email"  onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Contact Number</label>
            <input type="text" className="form-control" id="cno"  onChange={(e) => setCno(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" id="address"  onChange={(e) => setAddress(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Product QR ID<span style={{color:'red'}}>*</span></label>
            <div style={{display:'flex'}}>
              <input type="text" className="form-control" id="qrid" style={{width:'280%'}} onChange={(e) => setQrid(e.target.value)} /> &nbsp;&nbsp;&nbsp;
              <button id="btn" type='button' className="btn btn-primary1" style={{height:"7%"}} onClick={() => {fetchData()}}>Fetch data</button>
            </div>
          </div>
       
         {/*  <div className="mb-3">
            <label className="form-label">Product Name<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="pname" onChange={(e) => setPname(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Product ID<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="pid" onChange={(e) => setId(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Product Cost<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="pcost" onChange={(e) => setPrice(e.target.value)}/>
          </div> */}

          <div className="mb-3">

            <label className="form-label">Cart items:</label>

            <table class="table">
              <thead>
                <tr>
                  <th scope="col" style={{width:'25px'}}>Sr.No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">QR ID</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
              {cart.map((item, index) =>
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.pname}</td>
                  <td>{item.qrid}</td>
                  <td>{item.price}</td>
                </tr>
              )}

                <tr>
                <td></td>
                <td></td>
                <td>Total : </td>    
                <td><span id="totalid"><b>&nbsp;&nbsp;-</b></span></td>              
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mb-3">
            <label className="form-label">GST</label>
            <div style={{display:'flex'}}>
              <input type="text" className="form-control" id="discount" style={{width:'280%'}}  placeholder='In Percentage for eg : 10' onChange={(e) => setGst(e.target.value)} /> &nbsp;&nbsp;&nbsp;
              <button id="btn" type='button' className="btn btn-primary1" style={{height:"7%"}} onClick={(e) => {calgstanddiscount()}}>Add GST</button>
            </div>  
          </div>
          <div className="mb-3">
            <label className="form-label">Discount</label>
            <div style={{display:'flex'}}>
              <input type="text" className="form-control" id="discount" style={{width:'280%'}}  placeholder='In Percentage for eg : 10' onChange={(e) => setDAmount(e.target.value)} /> &nbsp;&nbsp;&nbsp;
              <button id="btn" type='button' className="btn btn-primary1" style={{height:"7%"}} onClick={(e) => {calgstanddiscount()}}>Add Discount</button>
            </div>  
          </div>
          <div className="mb-3">
            <label className="form-label">Final Price<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="finalp"  disabled/>
          </div>
                
          <center>
          <button type="button" id="btn1" className="btn btn-primary1 mt-3" onClick={() => { submit() }}>Submit</button>
          </center>
        </form>
      </div>
    </>
  );
}