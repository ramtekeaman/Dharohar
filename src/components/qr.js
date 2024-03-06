import React from 'react';
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import Cookies from 'js-cookie';
export default function Success({dbpath,qrid,vsb}) {

  const {id} = useParams(); 
  const [value, setValue] = useState('error');
  const [back, setBack] = useState('#FFFFFF');
  const [fore, setFore] = useState('#000000');
  const [size, setSize] = useState(256);

  const [artifact, setArtifact] = useState([]);
  const [name, setName] = useState();
  const [price, setPrice] = useState();

  const loadArtifacts = async () => {
    console.log("dwjodiw ---- -"+qrid)
    const result   = await axios.get(dbpath+"display.php?id="+qrid);
    setArtifact(result.data.phpresult);
    console.log(result.data.phpresult); 
    let str = "http://localhost/archaeoshop//Display/"+qrid;
    console.log(str);
    setValue(str);
     setName(result.data.phpresult[0]['name']);
    setPrice(result.data.phpresult[0]['price']);  
    document.getElementById("priceid").innerHTML = priceFormat(result.data.phpresult[0]['price']);
}

  const navigate = useNavigate();
  const isUserLoggedIn = Cookies.get('userLoggedIn');

      useEffect(() => {
          if (isUserLoggedIn !== 'true') {
              navigate('/AdminLogin');
          }
          else
          {
            loadArtifacts();
            vsb('1');
          }
      }, [2000]);    

  {artifact.map((res)=>
    <tr>    
       
    </tr>
  )}

  const priceFormat = (price) => {
    price=price.toString();
    var lastThree = price.substring(price.length-3);
    var otherNumbers = price.substring(0,price.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  }

  function printDiv() {
      var divContents = document.getElementById("qrdiv").innerHTML;
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
        <div style={{ backgroundColor:'#f1ebff', color:'black'}}>
        
            <br/> <br/>
            <div id="qrdiv">
            <center>
            <br></br><br></br>
            <div class="card shadow-lg p-3 mb-5 bg-body rounded"  style={{ padding:'20px', width:'450px', marginTop:'20px'}}>
            <center><br></br>
              <div className='card-img-top'>
                {value && (
                  <QRCode
                      title="Artifact QR"
                      value={value}
                      bgColor={back}
                      fgColor={fore}
                      size={342}
                  />
                )}
              </div>
              <div class="card-body">
                <p style={{fontSize:'40px', fontWeight:'bold'}}  class="card-title">QR ID : {qrid}</p>
                <p style={{fontSize:'40px', fontWeight:'bold'}} className='card-title'>Price (₹) : {/* {priceFormat(price)} */}<span id="priceid">Loading..</span>/-</p>
              </div>
              </center>
            </div>
            </center>
            </div>
            <center> <button type="button" class="btn btn-primary" style={{backgroundColor:'rgb(67,35,130)'}} onClick={printDiv}>Print</button> </center>   
          <br/><br/><br/>
        </div>   
    </>
  )
}
