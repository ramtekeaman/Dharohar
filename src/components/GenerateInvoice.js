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

export default function GenerateInvoice() {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [cno, setCno] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [pid, setPid] = useState('');
  const [qrid, setQrid] = useState('');
  const [pname, setPname] = useState('');
  const [fprice, setFprice] = useState('');
  const [damount, setDAmount] = useState('');
  const [gstStatus, setGststatus] = useState('0');
  const [artifact, setArtifact] = useState([]);
  const [gst, setGst] = useState(' ');
  const [image, setImage] = useState('');
  const [gstValue, setGstvalue] = useState('');
  
  const navigate = useNavigate();

  function handleClick() {
    navigate("/Invoice");
  }

  const fetchData = async() => { 
      const result = await axios.get("http://shopdb.42web.io/archaeoshop/invoicefetch.php?qrid="+qrid);
      setArtifact(result.data.phpresult);
      console.log(result.data.phpresult);
      document.getElementById("pname").value = result.data.phpresult[0]['name'];
      document.getElementById("pname").disabled = true;
      setPname(result.data.phpresult[0]['name']);
      document.getElementById("pid").value = result.data.phpresult[0]['id'];
      document.getElementById("pid").disabled = true;
      setId(result.data.phpresult[0]['id']);
      document.getElementById("pcost").value = result.data.phpresult[0]['price'];
      document.getElementById("pcost").disabled = true;
      setPrice(result.data.phpresult[0]['price']);
      let str = result.data.phpresult[0]['id']+","+result.data.phpresult[0]['name']+","+result.data.phpresult[0]['name']+","+result.data.phpresult[0]['conditions']+","+result.data.phpresult[0]['description']+","+result.data.phpresult[0]['material']+","+result.data.phpresult[0]['origin']+","+result.data.phpresult[0]['price']+","+result.data.phpresult[0]['rarity'];
      console.log(str); 
      document.getElementById("finalp").value = result.data.phpresult[0]['price'];
      setFprice(result.data.phpresult[0]['price']);
      setImage(result.data.phpresult[0]['image']);
  }

  const submit = () => {
    if (name.length === 0) {
      alert("Name has been left blank!");
    } else if (email.length === 0) {
      alert("Email has been left blank!");
    } else if (cno.length === 0) {
      alert("Contact has been left blank!");
    } else if (address.length === 0) {
      alert("Address has been left blank!");
    } else if (qrid.length === 0) {
      alert("QR ID has been left blank!");
    } else if (pname.length === 0) {
      alert("Product Name has been left blank!");
    } else if (id.length === 0) {
      alert("Product Id has been left blank!");
    } else if (price.length === 0) {
      alert("Product cost has been left blank!");
    }  else {
      //alert("Invoice Generated");
      const url = 'http://shopdb.42web.io/archaeoshop/addInvoice.php';
      let fData = new FormData();
      fData.append('name', name);
      fData.append('email', email);
      fData.append('cno', cno);
      fData.append('address', address);
      fData.append('qrid', qrid);
      fData.append('pname', pname);
      fData.append('id', id);
      fData.append('price', price);
      fData.append('gst', gst);
      fData.append('fprice', fprice);
      fData.append('discount', damount);
      fData.append('image', image);
      alert(image);
      console.log(fData);
      axios.post(url, fData)
        .then(response => alert(response.data))
        .catch(error => {
          console.log(error.toJSON());
        });

      handleClick();  
    }
  }

  const addDiscount = () => {
      var amount = parseInt(fprice)-parseInt(damount);
      setFprice(amount);
      document.getElementById("finalp").value = amount;
  }

  const addGST = () => {
    var checkBox = document.getElementById("myCheck");
    
    var tgst= (price/100)*gstValue;

    let fp = parseInt(price)+parseInt(damount)+parseInt(tgst);
    setFprice(fp);
    document.getElementById("finalp").value = fp;
    if(gstStatus==='0')
    {
      //setGststatus("1");
      setGst(parseInt(tgst));
      document.getElementById("finalp").value = parseInt(tgst)+parseInt(fprice);
      setFprice(parseInt(tgst)+parseInt(fprice));
    }
    else
    {
     // setGststatus("0");
      setGst(0);
      document.getElementById("finalp").value = price-damount;
      setFprice(price-damount);
    }
  }

  return (
    <>
      <br /><br />
      <div className="container" style={container}>
        <center><h3 className="sp1">Generate Invoice</h3></center>
        <form >
          <div className="mb-3">
            <label className="form-label" >Customer Name</label>
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
            <label className="form-label">Product QR ID</label>
            <div style={{display:'flex'}}>
              <input type="text" className="form-control" id="qrid" style={{width:'280%'}} onChange={(e) => setQrid(e.target.value)} /> &nbsp;&nbsp;&nbsp;
              <button id="btn" type='button' className="btn btn-primary1" style={{height:"7%"}} onClick={() => {fetchData()}}>Fetch data</button>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input type="text" className="form-control" id="pname" onChange={(e) => setPname(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Product ID</label>
            <input type="text" className="form-control" id="pid" onChange={(e) => setId(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Product Cost</label>
            <input type="text" className="form-control" id="pcost" onChange={(e) => setPrice(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label">GST</label>
            <div style={{display:'flex'}}>
              <input type="text" className="form-control" id="discount" style={{width:'280%'}}  placeholder='In Percentage for eg : 10' onChange={(e) => setGstvalue(e.target.value)} /> &nbsp;&nbsp;&nbsp;
              <button id="btn" type='button' className="btn btn-primary1" style={{height:"7%"}} onClick={(e) => {addGST()}}>Add GST</button>
            </div>  
          </div>
          <div className="mb-3">
            <label className="form-label">Discount</label>
            <div style={{display:'flex'}}>
              <input type="text" className="form-control" id="discount" style={{width:'280%'}} onChange={(e) => setDAmount(e.target.value)} /> &nbsp;&nbsp;&nbsp;
              <button id="btn" type='button' className="btn btn-primary1" style={{height:"7%"}} onClick={(e) => {addDiscount()}}>Add Discount</button>
            </div>  
          </div>
          <div className="mb-3">
            <label className="form-label">Final Price</label>
            <input type="text" className="form-control" id="finalp" disabled/>
          </div>

          <center>
          <button type="button" id="btn1" className="btn btn-primary1 mt-3" onClick={() => { submit() }}>Submit</button>
          </center>
        </form>
      </div>
    </>
  );
}