import React from 'react';
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
export default function Success() {

  //const [id , setId] = useState(''); 
  const [value, setValue] = useState('error');
  const [back, setBack] = useState('#FFFFFF');
  const [fore, setFore] = useState('#000000');
  const [size, setSize] = useState(256);

  const [artifact, setArtifact] = useState([]);
  const [name, setName] = useState();
  const [qrid, setQrid] = useState();
  const [price, setPrice] = useState();
  const loadArtifacts = async () => {
    const result = await axios.get("http://localhost/archaeoshop/latestUser.php");
    setArtifact(result.data.phpresult);
    console.log(result.data.phpresult);
    let str = "Id : "+result.data.phpresult[0]['id']+" |\n Name : "+result.data.phpresult[0]['name']+" |\n Condition : "+result.data.phpresult[0]['conditions']+" |\nDescription : "+result.data.phpresult[0]['description']+" |\nMaterial : "+result.data.phpresult[0]['material']+" |\nOrigin : "+result.data.phpresult[0]['origin']+" |\nPrice : "+result.data.phpresult[0]['price']+" |\nRarity : "+result.data.phpresult[0]['rarity']+" |\nQR ID : "+result.data.phpresult[0]['qrid'];
    console.log(str);
    setValue(str);
   
    setName(result.data.phpresult[0]['name']);
    setQrid(result.data.phpresult[0]['qrid'])
    setPrice(result.data.phpresult[0]['price']);
    }

  

  useEffect(() => {
    loadArtifacts();
  }, []);   



  {artifact.map((res)=>
    <tr>    
       
    </tr>
  )}

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
         
            <div>
            <center>
            <br></br><br></br>
            <div class="card shadow-lg p-3 mb-5 bg-body rounded" id="qrdiv" style={{width: '18rem', padding:'20px', width:'350px', marginTop:'20px'  }}>
            <center><br></br>
              <div className='card-img-top'>
                {value && (
                  <QRCode
                      title="Artifact QR"
                      value={value}
                      bgColor={back}
                      fgColor={fore}
                      size={size === '' ? 0 : size}
                  />

                )}
              </div>
              <div class="card-body">
                <h5 class="card-title">Name : {name}</h5>
                <h5 class="card-title">Qr ID : {qrid}</h5>
                <h5 className='card-title'>Price (₹) : {price}/-</h5>
              </div>
              </center>
            </div>
            <button type="button" class="btn btn-primary" onClick={printDiv}>Print</button>  </center>
            </div>
        
    </>
  )
}
