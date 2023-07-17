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
  const loadArtifacts = async () => {
    const result = await axios.get("http://localhost/archaeoshop/latestUser.php");
    setArtifact(result.data.phpresult);
    console.log(result.data.phpresult);
    let str = result.data.phpresult[0]['id']+","+result.data.phpresult[0]['name']+","+result.data.phpresult[0]['name']+","+result.data.phpresult[0]['conditions']+","+result.data.phpresult[0]['description']+","+result.data.phpresult[0]['material']+","+result.data.phpresult[0]['origin']+","+result.data.phpresult[0]['price']+","+result.data.phpresult[0]['rarity'];
    console.log(str);
    setValue(str);
    setName(result.data.phpresult[0]['name']);
    setQrid(result.data.phpresult[0]['qrid'])
    }

  

  useEffect(() => {
    loadArtifacts();
  }, []);   



  {artifact.map((res)=>
    <tr>    
       
    </tr>
  )}

  return (
    <>
         <center>
            <div>
            <br></br><br></br>
            <div class="card shadow-lg p-3 mb-5 bg-body rounded" style={{width: '18rem', padding:'20px', width:'350px', marginTop:'20px'  }}>
            <br></br>
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
                <h5 class="card-title">{name}</h5>
                <h5 class="card-title">{qrid}</h5>
              </div>
            </div>
            </div>
          </center>
    </>
  )
}
