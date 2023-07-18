import React from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';
import  {useState, useEffect} from 'react';
import {
    Link
  } from "react-router-dom";
import './css/Dashboard.css'

export default function Dashboard() {

  const [id , setId] = useState(''); 
  const [value, setValue] = useState('https://www.youtube.com/');
  const [back, setBack] = useState('#FFFFFF');
  const [fore, setFore] = useState('#000000');
  const [size, setSize] = useState(256);

  const [artifact, setArtifact] = useState([]);

  const loadArtifacts = async () => {
    const result = await axios.get("http://localhost/archaeoshop/displayall.php");
    setArtifact(result.data.phpresult);
    console.log(result.data.phpresult); 
  }
  useEffect(() => {
      loadArtifacts();
  }, []);     
  return (
    <>
        <center> Dashboard<br></br><br></br>
        <Link style={{width:'8%'}} to="/Add"><button type="button" className='btn-primary btn'>Add Artifact</button></Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link style={{width:'8%'}} to="/GenerateInvoice"><button type="button" className='btn-primary btn'>Generate Invoice</button></Link>
       <br></br><br></br><br></br>
        
        <form>
          <div class="mb-3">
            <input type="number" style={{width:'60%'}} class="form-control" placeholder='Enter id to search' onChange={(e)=>setId(e.target.value)} id="id" required></input>
          </div>
          <Link className="nav-link" style={{width:'8%'}} to={`/Display/${id}`} state={{ from: "occupation" }}><button type="submit" class="btn btn-primary" >Submit</button></Link>
        </form></center>

        <div>  
              <br></br>

              <br></br><br></br>
              <center><h5> All Artifacts </h5></center>
                  <div>

                  <br></br><br></br>
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Age</th>
                            <th scope="col">Origin</th>
                            <th scope="col">Material</th>
                            <th scope="col">Condition</th>
                            <th scope="col">Rarity</th>
                            <th scope="col">Price</th>
                            <th scope="col">QR ID</th>
                           {/*  <th scope="col">QR</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {artifact.map((res)=>
                                <tr>
                                    <td>{res.id}</td>
                                    <td>{res.name}</td>
                                    <td style={{width:'250px'}}>{res.description}</td>
                                    <td>{res.age}</td>
                                    <td>{res.origin}</td>
                                    <td>{res.material}</td>    
                                    <td>{res.conditions}</td>
                                    <td>{res.rarity}</td>                        
                                    <td>{res.price}</td>
                                    <td>{res.qrid}</td>
                                    {/*   <td><button type="button" class="btn btn-primary" id="{res.id}" >Generate QR</button></td>   */}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>                 
          </div>
          
    </>
  )
}
