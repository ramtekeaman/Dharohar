import React from 'react'
import './css/Recipt.css'
import rcss from './css/Recipt.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import img1 from './images/img1.png';
export default function Invoice() {

  useEffect(() => {
    fetchData();
  }, []);   



  const fetchData = async() => { 
    const result = await axios.get("http://localhost/archaeoshop/getInvoice.php");
    console.log(result.data.phpresult);
    document.getElementById("p_img").src = "http://localhost/archaeoshop/uploads/"+result.data.phpresult[0]['image'];
    document.getElementById("name").innerHTML = result.data.phpresult[0]['name'];
    document.getElementById("cno").innerHTML = result.data.phpresult[0]['contact']; 
    document.getElementById("email").innerHTML = result.data.phpresult[0]['email']; 
    document.getElementById("iid").innerHTML = result.data.phpresult[0]['id']; 
    document.getElementById("pname").innerHTML = result.data.phpresult[0]['pname']; 
    document.getElementById("pid").innerHTML = result.data.phpresult[0]['pid']; 
    document.getElementById("price").innerHTML = result.data.phpresult[0]['price']; 
    document.getElementById("qrid").innerHTML = result.data.phpresult[0]['pqrid']; 
    document.getElementById("pprice").innerHTML = result.data.phpresult[0]['price']; 
    document.getElementById("gst").innerHTML = result.data.phpresult[0]['gst']; 
    document.getElementById("discount").innerHTML = result.data.phpresult[0]['discount']; 
    document.getElementById("fprice").innerHTML = result.data.phpresult[0]['fprice']; 
}

function printDiv() {
  var divContents = document.getElementById("receipt_div").innerHTML;
  var a = window.open('', '', 'height=800, width=800');
  a.document.write('<html>');
  a.document.write('<head>');
  a.document.write('</head>');
  a.document.write('<body >');
  a.document.write(divContents);
  a.document.write('</body></html>');
  a.document.close();
  a.print();

}

  return (
    <>
      <br></br><br></br>
      <div id="receipt_div" > 
      <div className='receipt_div shadow-lg mb-5 bg-body-tertiary rounded' style={{border:'solid 1px black', width:'800px', margin:'0 auto'}} >
        <div className='col-12 ' style={{height: '5px', backgroundColor: 'black', width: '100%'}}>
        </div>
        <div className='col-12' style={{height: '10px', backgroundColor: 'rgb(166, 2, 2)', width: '100%'}}>
        </div>
        <center>
          <br></br><br></br>
          <span className=' mt-4' style={{fontFamily: '"Times New Roman", Times, serif'}}>INVOICE - <span id='iid'>NA</span></span>
          <h5 className='mt-1'>𝓐𝓻𝓬𝓱𝓪𝓮𝓸𝓼𝓱𝓸𝓹</h5>
        </center>
        <br></br><br></br>  
        <div st >
          <div style={{display:'flex'}}>
            <div >

            </div>
            <div style={{marginLeft: '10%'}}>
              Invoice To,<br></br>
              <span id="name">NA</span><br></br>
              <span id="cno">NA</span><br></br>
              <span id="email">NA</span>
            </div>
            <div >

            </div>
            <div className='c_name' style={{marginLeft: '50%'}}>
              Invoice From,<br></br>
              Archaeoshop<br></br>
              billing@archaeo.com<br></br>
              121 Sitburdi, Nagpur
            </div>
          </div>
        </div>
        <br></br><br></br><br></br>
        <div >
          <div style={{display:'flex'}}>
           
            <div style={{marginLeft: '10%'}}>
              <br></br>
              Product Details,<br></br>
              Name : <span id="pname">NA</span><br></br>
              ID : <span id="pid">NA</span><br></br> 
              Price : <span id="price">NA</span><br></br>
              QR ID : <span id="qrid">NA</span><br></br>
            </div>
           
            <div style={{marginLeft: '42%'}}>
                <img className='i_img mt-2'  id="p_img" style={{marginLeft:'-25px', width: '200px', border:'rgb(166, 2, 2) solid 2px', borderRadius: '10px'}} src=""></img>
            </div>
        </div>
        </div>
        <center>
          <br></br><br></br><br></br>
          <table style={{width: '80%', border: '1px solid '}} >
            <tbody>
              <tr>
                <td className='l_col' style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '70%'}}>Product Amount</td>
                <td className='r_col' style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', paddingLeft: '20px'}}>&nbsp;&nbsp;&nbsp;<span id="pprice">NA</span></td>
              </tr>
              <tr>
                <td className='l_col' style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '70%'}}>GST</td>
                <td className='r_col' style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', paddingLeft: '20px'}}>&nbsp;&nbsp;&nbsp;<span id="gst">NA</span></td>
              </tr>
              <tr>
                <td className='l_col' style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '70%'}}>Discount</td>
                <td className='r_col' style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', paddingLeft: '20px'}}>- <span id="discount"> NA</span></td>
              </tr>
              <tr>
                <td className='l_col' style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '70%'}}>Total</td>
                <td className='r_col' style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', paddingLeft: '20px'}}>&nbsp;&nbsp;&nbsp;<span id="fprice">NA</span>/-</td>
              </tr>
            </tbody>
          </table>
          <br></br>
            <div class="receipt-right">
							<span style={{fontSize: '15px'}}><b>Date :</b> 15 Aug 2016</span>
							<h6 className='mt-1' style={{color: 'rgb(140, 140, 140)'}}>Thanks for shopping.!</h6>
						</div>
            <br></br>
          </center>
          <div className='col-12' style={{height: '7px', backgroundColor: 'black', width: '100%'}}>
        </div>
      </div>
      </div>
      <center><button type="button" class="btn btn-primary" onClick={printDiv}>Print</button></center>
    </>
  )
}
