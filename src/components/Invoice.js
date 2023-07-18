import React from 'react'
import './css/Recipt.css'
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
  a.document.write('<body >');
  a.document.write(divContents);
  a.document.write('</body></html>');
  a.document.close();
  a.print();
}

  return (
    <>
      <br></br><br></br>
      <div className='receipt_div shadow-lg mb-5 bg-body-tertiary rounded' id="receipt_div">
        <div className='col-12 b_line'>
        </div>
        <div className='col-12 r_line'>
        </div>
        <center>
          <br></br><br></br>
          <span className='invoice_name mt-4'>INVOICE - <span id='iid'>NA</span></span>
          <h5 className='mt-1'>𝓐𝓻𝓬𝓱𝓪𝓮𝓸𝓼𝓱𝓸𝓹</h5>
        </center>
        <br></br><br></br>  
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-1'>

            </div>
            <div className='col-5 b_name'>
              Invoice To,<br></br>
              <span id="name">NA</span><br></br>
              <span id="cno">NA</span><br></br>
              <span id="email">NA</span>
            </div>
            <div className='col-2'>

            </div>
            <div className='col-4 c_name'>
              Invoice From,<br></br>
              Archaeoshop<br></br>
              billing@archaeo.com<br></br>
              121 Sitburdi, Nagpur
            </div>
          </div>
        </div>
        <br></br><br></br>
        <div className='container-fluid '>
          <div className='row'>
            <div className='col-1'>

            </div>
            <div className='col-5 b_name'>
              <br></br>
              Product Details,<br></br>
              Name : <span id="pname">NA</span><br></br>
              ID : <span id="pid">NA</span><br></br> 
              Price : <span id="price">NA</span><br></br>
              QR ID : <span id="qrid">NA</span><br></br>
            </div>
            <div className='col-2'>

            </div>
            <div className='col-4 c_name '>
                <img className='i_img mt-2' id="p_img" style={{marginLeft:'-25px'}} src=""></img>
            </div>
        </div>
        </div>
        <center>
          
          <br></br><br></br>
          <table class=" i_table" >
            <tbody>
              <tr>
                <td className='l_col'>Product Amount</td>
                <td className='r_col'>&nbsp;&nbsp;&nbsp;<span id="pprice">NA</span></td>
              </tr>
              <tr>
                <td className='l_col'>GST</td>
                <td className='r_col'>&nbsp;&nbsp;&nbsp;<span id="gst">NA</span></td>
              </tr>
              <tr>
                <td className='l_col'>Discount</td>
                <td className='r_col'>- <span id="discount"> NA</span></td>
              </tr>
              <tr>
                <td className='l_col'>Total</td>
                <td className='r_col'>&nbsp;&nbsp;&nbsp;<span id="fprice">NA</span>/-</td>
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
          <div className='col-12 b_line2'>
        </div>
      </div>
      {/* <center><button type="button" class="btn btn-primary" onClick={printDiv}>Print</button></center> */}
    </>
  )
}
