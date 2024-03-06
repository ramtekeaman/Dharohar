import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./css/Add.css"
import { get } from 'react-hook-form';
import Cookies from 'js-cookie';

export default function GenerateInvoice({cart,setCart,dbpath,vsb}) {

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
  const [hsncode, setHsncode] = useState('');
  const [gstValue, setGstvalue] = useState('0');

  const navigate = useNavigate();

  function handleClick() {
    navigate("/Quotation");
  }
  
  const isUserLoggedIn = Cookies.get('userLoggedIn');

      useEffect(() => {
          if (isUserLoggedIn !== 'true') {
              navigate('/AdminLogin');
          }
          else
          {
              vsb('1');
          }
      }, [isUserLoggedIn]);    


  const fetchData = async() => { 
      let result;
      let tqrid;
      if(qrid.includes('display'))
      {
        tqrid =qrid.slice(-8);
        setQrid(tqrid);
        console.log(" wd "+tqrid);
        result = await axios.get(dbpath+"invoicefetch.php?qrid="+tqrid);
      }
      else
      {
         result = await axios.get(dbpath+"invoicefetch.php?qrid="+qrid);
      } 
      if (!result.data.phpresult || result.data.phpresult.length === 0) {
      
        alert("Invalid QR ID. Please enter a valid QR ID.");
        return;

      }
      
      setArtifact(result.data.phpresult);
    
      setPname(result.data.phpresult[0]['name']);
      setId(result.data.phpresult[0]['id']);
      setPrice(result.data.phpresult[0]['price']);
      document.getElementById("finalp").value = result.data.phpresult[0]['price'];
      setHsncode(result.data.phpresult[0]['hsncode']);
      setImage(result.data.phpresult[0]['image']);
      addCart(result.data.phpresult[0]['hsncode'],result.data.phpresult[0]['name'],result.data.phpresult[0]['price'],result.data.phpresult[0]['price']);
      calculateFprice(result.data.phpresult[0]['price'],damount,gst);
  }

  const submit = () => {
    if (name.length === 0) {
      alert("Name has been left blank!");
    }  else if (cart.length === 0) {
      alert("No Products added to the invoice!");
    } else if (pname.length === 0) {
      alert("Product Name has been left blank!");
    } else if (id.length === 0) {
      alert("Product Id has been left blank!");
    } else if (price.length === 0) {
      alert("Product cost has been left blank!");
    }  else {
      //alert("Invoice Generated");
      const url = dbpath+'addQuotation.php';
      let fData = new FormData();
      fData.append('name', name);
      fData.append('email', email);
      fData.append('cno', cno);
      fData.append('address', address);
      fData.append('qrid', qrid);
      fData.append('pname', pname);
      fData.append('id', id);
      fData.append('price', tamount);
      fData.append('hsncode', hsncode);
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
    document.getElementById('totalid').innerHTML = priceFormat(ttamount);
    var tdisc= (ttamount/100)*damount;
    var discountedtamount = ttamount - tdisc;
    var tgst = (discountedtamount/100)*gst;
    setFprice(parseInt(discountedtamount)+parseInt(tgst));
    document.getElementById('finalp').value = parseInt(discountedtamount)+parseInt(tgst);
  }

  const calgstanddiscount = () => {
    var tdisc = (tamount / 100) * damount;
    var discountedtamount = tamount - tdisc;
    var tgst = (discountedtamount / 100) * gst;
    setFprice(parseInt(discountedtamount) + parseInt(tgst));
    document.getElementById('finalp').value = parseInt(discountedtamount) + parseInt(tgst);
  };

  const onQuantyityAdd = (index) => {
    const newCart = [...cart];
    newCart[index].quantity = parseInt(newCart[index].quantity) + 1;
    setCart(newCart);
    calculateTotalAmount(newCart);
  };
  
  const onQuantyitySub = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity = parseInt(newCart[index].quantity) - 1;
      setCart(newCart);
      calculateTotalAmount(newCart);
    } else {
      alert("Quantity can't be less than 1");
    }
  };
  
  const priceFormat = (price) => {
    price=price.toString();
    var lastThree = price.substring(price.length-3);
    var otherNumbers = price.substring(0,price.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  }

  const calculateTotalAmount = (cartItems) => {
    let total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let discountAmount = (total / 100) * damount;
    let discountedTotal = total - discountAmount;
    let gstAmount = (discountedTotal / 100) * gst;
    let finalAmount = discountedTotal + gstAmount;

    setTamount(total);
    document.getElementById('totalid').innerHTML = total;

    setFprice(finalAmount);
  };

  /* const viewCart = () =>{
    for (let index = 0; index < cart.length; index++) {
      let item = cart[index];
      console.log(`Item ${index + 1}:`);
      console.log(`Name: ${item.pname}`);
      console.log(`HSN Code: ${item.qrid}`);
      console.log(`Rate: ${item.rate}`);
      console.log(`Quantity: ${item.quantity}`);
      console.log(`Price: ${item.price}`);
      console.log("--------------------");
    }
  }
  
  const updateItemDB = () => {
    for (let index = 0; index < cart.length; index++) {
      let item = cart[index];
      const selectedQuantity = item.quantity;
      console.log(`Item ${index + 1}:`);
      console.log(`Name: ${item.pname}`);
      console.log(`HSN Code: ${item.qrid}`);
      console.log(`Rate: ${item.rate}`);
      console.log(`Quantity: ${item.quantity}`);
      console.log(`Price: ${item.price}`);
      console.log(selectedQuantity);
      console.log("--------------------");

      let quantityCheck = 0;
      const url1 = dbpath+'getQuantity.php';

      let fData1 = new FormData();
      fData1.append('id', item.qrid);
      
      console.log(fData1);
      axios.post(url1, fData1)
        .then()
        .catch(error => {
          console.log(error.toJSON());
        });

         */
      
          

      /* const url = dbpath+'updateQuantity.xphp';

      let fData = new FormData();
      fData.append('id', item.qrid);
      fData.append('quantity', item.quantity);
      
      console.log(fData);
      axios.post(url, fData)
        .then(response => alert(response.data))
        .catch(error => {
          console.log(error.toJSON());
        });
    }
  } */
  

  const addCart = (hsncodef,pnamef,ratef,pricef) => { 
    setCart([
      ...cart,
      {
        qrid: hsncodef,
        pname: pnamef,
        rate: ratef,
        quantity: '1',
        price: ratef

      }
    ]);
  };
  
  return (
    <>
   
    <div style={{backgroundColor:'#f1ebff'}}>
      <br /><br /><br /><br /><br /><br />
    {/*   <input type='button' value="view Cart" onClick={updateItemDB}></input> */}
      <div className="container shadow-lg" style={{border:'1px solid rgb(67,35,130)', padding:'50px', backgroundColor:'white'}}> 
        <center><h3 className="sp1" style={{fontWeight:'700', color:'rgb(67,35,130)'}}>Generate Quotation</h3></center>
        <form >
          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Customer Name<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Contact Number</label>
            <input type="text" className="form-control" id="cno"  onChange={(e) => setCno(e.target.value)}/>
          </div>

          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> GST Number</label>
            <input type="email" className="form-control" id="email"  onChange={(e) => setEmail(e.target.value)}/>
          </div>
          
          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Address</label>
            <input type="text" className="form-control" id="address"  onChange={(e) => setAddress(e.target.value)}/>
          </div>

          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Product QR ID<span style={{color:'red'}}>*</span></label>
            <div style={{display:'flex'}}>
              <input type="text" className="form-control" id="qrid" style={{width:'280%'}} onChange={(e) => setQrid(e.target.value)} /> &nbsp;&nbsp;&nbsp;
              <button id="btn" type='button' className="btn btn-primary1" style={{backgroundColor:'rgb(67,35,130)', height:"7%"}} onClick={() => {fetchData()}}>Fetch data</button>
            </div>
          </div>
       
         {/*  <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Product Name<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="pname" onChange={(e) => setPname(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Product ID<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="pid" onChange={(e) => setId(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Product Cost<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="pcost" onChange={(e) => setPrice(e.target.value)}/>
          </div> */}

          <div className="mb-3" style={{color:'black'}}>

            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Cart items:</label>

            <table class="table">
            <thead>
              <tr>
                <th scope="col" style={{width:'25px'}}>Sr.No.</th>
                <th scope="col">Name</th>
                <th scope="col">HSN Code</th>
                <th scope="col">Rate</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
            {cart.map((item, index) =>
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.pname}</td>
                <td>{item.qrid}</td>
                <td>{priceFormat(item.price)}</td>
                <td>
                  <button type='button' onClick={() => onQuantyitySub(index)}>-</button> 
                  &nbsp;<span id={'quantity'+index}>{item.quantity}</span>&nbsp;
                  <button type='button' onClick={() => onQuantyityAdd(index)}>+</button>
                </td>
                <td><span id={'rate'+index}>{priceFormat(item.price * item.quantity)}</span></td>
              </tr>
            )}

                <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total : </td>    
                <td><span id="totalid"><b>&nbsp;&nbsp;-</b></span></td>              
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> GST</label>
            <div style={{display:'flex'}}>
              <input type="text" className="form-control" id="discount" style={{width:'280%'}}  placeholder='In Percentage for eg : 10' onChange={(e) => setGst(e.target.value)} /> &nbsp;&nbsp;&nbsp;
              <button id="btn" type='button' className="btn btn-primary1" style={{backgroundColor:'rgb(67,35,130)', height:"7%"}} onClick={(e) => {calgstanddiscount()}}>Add GST</button>
            </div>    
          </div>
          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Discount</label>
            <div style={{display:'flex'}}>
              <input type="text" className="form-control" id="discount" style={{width:'280%'}}  placeholder='In Percentage for eg : 10' onChange={(e) => setDAmount(e.target.value)} /> &nbsp;&nbsp;&nbsp;
              <button id="btn" type='button' className="btn btn-primary1" style={{backgroundColor:'rgb(67,35,130)', height:"7%"}} onClick={(e) => {calgstanddiscount()}}>Add Discount</button>
            </div>  
          </div>
          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Final Price<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="finalp" value={priceFormat(fprice)} disabled/>

          </div>
          <center>
          <button type="button" id="btn1" className="btn btn-primary1 mt-3" style={{backgroundColor:'rgb(67,35,130)'}} onClick={() => { submit() }}>Submit</button>
          </center>
        </form>
      </div>
      <br></br><br></br><br></br>
      </div>
    </>
  );
}