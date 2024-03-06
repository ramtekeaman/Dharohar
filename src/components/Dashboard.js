// import React from 'react';
// import axios from 'axios';
// import QRCode from 'react-qr-code';
// import  {useState, useEffect} from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './css/Dashboard.css';
// import Cookies from 'js-cookie';

// export default function Dashboard({qrid,dbpath,cart,setQrid,vsb,setBtnstatus}) {

//   const [id , setId] = useState('');

//   const [artifact, setArtifact] = useState([]);
//   const navigate = useNavigate();

//   const loadArtifacts = async () => {
//     const result = await axios.get(dbpath+"displayall.php");
//     setArtifact(result.data.phpresult);
//     console.log(result.data.phpresult);
//   }

//   function onLogout()
//   {
//       Cookies.set('userLoggedIn', 'false');
//       setBtnstatus('Admin Login');
//       navigate('/');
//   }

//   const isUserLoggedIn = Cookies.get('userLoggedIn');

//       useEffect(() => {
//           if (isUserLoggedIn !== 'true') {
//               navigate('/AdminLogin');
//               cart.splice(0,cart.length);
//           }
//           else
//           {
//               loadArtifacts();
//               cart.splice(0,cart.length);
//               vsb('1');
//           }
//       }, [isUserLoggedIn]);

//       const priceFormat = (price) => {
//         var lastThree = price.substring(price.length-3);
//         var otherNumbers = price.substring(0,price.length-3);
//         if(otherNumbers != '')
//             lastThree = ',' + lastThree;
//         var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
//         return res;
//       }

//      const onDelete = () => {
//       if (qrid.length === 0) {
//         alert("Qrid has been left blank!");
//       }   else {

//         const url = dbpath+'deleteartifact.php';
//         let fData = new FormData();
//         fData.append('qrid', qrid);
//         axios.post(url, fData)
//           .then(response => alert(response.data))
//           .catch(error => {
//             console.log(error.toJSON());
//           });

//         }
//       }

//   return (
//     <>
//     <div style={{ backgroundColor:'#f1ebff', color:'black'}}>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//         <center> Admin Panel<br></br><br></br>
//         <Link style={{width:'8%'}} to="/Add"><button type="button" className='btn-primary btn' style={{backgroundColor:'rgb(67,35,130)'}}>Add Artifact</button></Link> &nbsp;&nbsp;&nbsp;&nbsp;
//         <Link style={{width:'8%'}} to="/GenerateInvoice"><button type="button" className='btn-primary btn' style={{backgroundColor:'rgb(67,35,130)'}}>Generate Invoice</button></Link> &nbsp;&nbsp;&nbsp;&nbsp;
//         <Link style={{width:'8%'}} to="/GenerateQuotation"><button type="button" className='btn-primary btn' style={{backgroundColor:'rgb(67,35,130)'}}>Generate Quotation</button></Link> &nbsp;&nbsp;&nbsp;&nbsp;

//         <Link style={{width:'8%'}} to="/UpdateQuantity"><button type="button" className='btn-primary btn' style={{backgroundColor:'rgb(67,35,130)'}}>Qunatity</button></Link> &nbsp;&nbsp;&nbsp;&nbsp;
//         <Link style={{width:'8%'}} to="/PrintInvoice"><button type="button" className='btn-primary btn' style={{backgroundColor:'rgb(67,35,130)'}}>Print Invoice</button></Link> &nbsp;&nbsp;&nbsp;&nbsp;
//         <button type="button" className='btn-primary btn' style={{backgroundColor:'rgb(67,35,130)', width:'8%'}} onClick={onLogout}>Logout</button>
//       <br></br><br></br><br></br>

//         <form>
//           <div class="mb-3">
//             <input type="text" style={{width:'60%'}} class="form-control" placeholder='Enter Qrid' onChange={(e)=>setQrid(e.target.value)} id="id" required></input>
//           </div>
//           <div style={{display:'flex', marginLeft:'40%', gap:'20px'}}>
//           <Link className="nav-link" style={{width:'8%'}} to={`/qr`} state={{ from: "occupation" }}><button type="submit" class="btn btn-primary" style={{backgroundColor:'rgb(67,35,130)'}}>Get QR</button></Link>
//           <Link className="nav-link" style={{width:'8%'}} to={`/display/`+qrid} state={{ from: "occupation" }}><button type="submit" class="btn btn-primary" style={{backgroundColor:'rgb(67,35,130)'}}>Display</button></Link>
//           <Link className="nav-link" style={{width:'8%'}}> <button type="submit" class="btn btn-primary" onClick={onDelete} style={{backgroundColor:'rgb(67,35,130)'}}>Delete</button></Link>
//            </div>
//         </form></center>

//         <div>
//               <br></br>

//               <br></br>
//               <center><h5> All Artifacts </h5>

//               <br></br>
//                   <div>

//                   </div>
//                   <div className="scrollable-table">
//                     <table class="table" style={{width:"90%", backgroundColor:'white'}}>
//                         <thead>
//                             <tr className='c1'>
//                             <th scope="col">ID</th>
//                             <th scope="col">Name</th>
//                             <th scope="col">Description</th>
//                             <th scope="col">Price</th>
//                             <th scope="col">Qunatity</th>
//                             <th scope="col">QR ID</th>
//                             <th scope="col">HSN Code</th>
//                             <th scope="col">Image</th>
//                             <th scope="col">Action</th>

//                            {/*  <th scope="col">QR</th> */}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {artifact.map((res)=>
//                                 <tr>
//                                     <td>{res.id}</td>
//                                     <td>{res.name}</td>
//                                     <td style={{width:'250px'}}>{res.description}</td>
//                                     <td>{priceFormat(res.price)}</td>
//                                     <td>{res.quantity}</td>
//                                     <td>{res.qrid}</td>
//                                     <td>{res.hsncode}</td>
//                                     <td><a href={"http://localhost/archaeoshop/uploads/"+res.image}><u>view</u></a></td>
//                                     {/*   <td><button type="button" class="btn btn-primary" id="{res.id}" >Generate QR</button></td>   */}
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//                 </center>
//           </div>
//           <br></br><br></br><br></br><br></br>
//         </div>

//     </>
//   )
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { Link, useNavigate } from "react-router-dom";
import "./css/Dashboard.css";
import Cookies from "js-cookie";

export default function Dashboard({
  qrid,
  dbpath,
  cart,
  setQrid,
  vsb,
  setBtnstatus,
}) {
  const [artifact, setArtifact] = useState([]);
  const navigate = useNavigate();

  const loadArtifacts = async () => {
    const result = await axios.get(dbpath + "displayall.php");
    setArtifact(result.data.phpresult);
    console.log(result.data.phpresult);
  };

  function onLogout() {
    Cookies.set("userLoggedIn", "false");
    setBtnstatus("Admin Login");
    navigate("/");
  }

  const isUserLoggedIn = Cookies.get("userLoggedIn");

  useEffect(() => {
    if (isUserLoggedIn !== "true") {
      navigate("/AdminLogin");
      cart.splice(0, cart.length);
    } else {
      loadArtifacts();
      cart.splice(0, cart.length);
      vsb("1");
    }
  }, [isUserLoggedIn]);

  const priceFormat = (price) => {
    var lastThree = price.substring(price.length - 3);
    var otherNumbers = price.substring(0, price.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  };

  const handleDelete = (artifactId) => {
    console.log(`Delete artifact with ID ${artifactId}`);
    if (window.confirm("Do you want to delete the data?")) {
      const url = `${dbpath}deleteartifact.php`;
      axios
        .post(url, JSON.stringify({ id: artifactId }), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          loadArtifacts();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // Placeholder for handleUpdate function
  const handleUpdate = (description, price) => {
    // Implement your update logic here
    console.log(
      `Update artifact with description ${description} and price ${price}`
    );
  };

  const onDelete = () => {
    if (qrid.length === 0) {
      alert("Qrid has been left blank!");
    } else {
      if (window.confirm("Do you want to delete the data By QR id?")) {
        const url = dbpath + "deletartifactqr.php";
        let fData = new FormData();
        fData.append("qrid", qrid);
        axios
          .post(url, fData)
          .then((response) => {
            console.log(response.data);
            loadArtifacts();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#f1ebff", color: "black" }}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <center>
          {" "}
          Admin Panel<br></br>
          <br></br>
          <Link style={{ width: "8%" }} to="/Add">
            <button
              type="button"
              className="btn-primary btn"
              style={{ backgroundColor: "rgb(67,35,130)" }}
            >
              Add Artifact
            </button>
          </Link>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link style={{ width: "8%" }} to="/GenerateInvoice">
            <button
              type="button"
              className="btn-primary btn"
              style={{ backgroundColor: "rgb(67,35,130)" }}
            >
              Generate Invoice
            </button>
          </Link>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link style={{ width: "8%" }} to="/GenerateQuotation">
            <button
              type="button"
              className="btn-primary btn"
              style={{ backgroundColor: "rgb(67,35,130)" }}
            >
              Generate Quotation
            </button>
          </Link>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link style={{ width: "8%" }} to="/UpdateQuantity">
            <button
              type="button"
              className="btn-primary btn"
              style={{ backgroundColor: "rgb(67,35,130)" }}
            >
              Quantity
            </button>
          </Link>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link style={{ width: "8%" }} to="/PrintInvoice">
            <button
              type="button"
              className="btn-primary btn"
              style={{ backgroundColor: "rgb(67,35,130)" }}
            >
              Print Invoice
            </button>
          </Link>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link style={{ width: "8%" }} to="/UpdateArtifact">
            <button
              type="button"
              className="btn-primary btn"
              style={{ backgroundColor: "rgb(67,35,130)" }}
            >
              Update
            </button>
          </Link>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            type="button"
            className="btn-primary btn"
            style={{ backgroundColor: "rgb(67,35,130)", width: "8%" }}
            onClick={onLogout}
          >
            Logout
          </button>
          <br></br>
          <br></br>
          <br></br>
          <form>
            <div class="mb-3">
              <input
                type="text"
                style={{ width: "60%" }}
                class="form-control"
                placeholder="Enter Qrid"
                onChange={(e) => setQrid(e.target.value)}
                id="id"
                required
              ></input>
            </div>
            <div style={{ display: "flex", marginLeft: "40%", gap: "20px" }}>
              <Link
                className="nav-link"
                style={{ width: "8%" }}
                to={`/qr`}
                state={{ from: "occupation" }}
              >
                <button
                  type="submit"
                  class="btn btn-primary"
                  style={{ backgroundColor: "rgb(67,35,130)" }}
                >
                  Get QR
                </button>
              </Link>
              <Link
                className="nav-link"
                style={{ width: "8%" }}
                to={`/display/` + qrid}
                state={{ from: "occupation" }}
              >
                <button
                  type="submit"
                  class="btn btn-primary"
                  style={{ backgroundColor: "rgb(67,35,130)" }}
                >
                  Display
                </button>
              </Link>
              <Link className="nav-link" style={{ width: "8%" }}>
                {" "}
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={onDelete}
                  style={{ backgroundColor: "rgb(67,35,130)" }}
                >
                  Delete
                </button>
              </Link>
            </div>
          </form>
        </center>

        <div>
          <br></br>

          <br></br>
          <center>
            <h5> All Artifacts </h5>

            <br></br>
            <div></div>
            <div className="scrollable-table">
              <table
                class="table"
                style={{ width: "90%", backgroundColor: "white" }}
              >
                <thead>
                  <tr className="c1">
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Qunatity</th>
                    <th scope="col">QR ID</th>
                    <th scope="col">HSN Code</th>
                    <th scope="col">Image</th>
                    {/* <th scope="col">UPDATE</th>
                    <th scope="col">DELETE</th> */}

                    {/*  <th scope="col">QR</th> */}
                  </tr>
                </thead>
                <tbody>
                  {artifact.map((res) => (
                    <tr>
                      <td>{res.id}</td>
                      <td>{res.name}</td>
                      <td style={{ width: "250px" }}>{res.description}</td>
                      <td>{priceFormat(res.price)}</td>
                      <td>{res.quantity}</td>
                      <td>{res.qrid}</td>
                      <td>{res.hsncode}</td>
                      <td>
                        <a
                          href={
                            "http://localhost/archaeoshop/uploads/" + res.image
                          }
                        >
                          <u>view</u>
                        </a>
                      </td>
                      {/* <td>
                                     <Link style={{ width: "8%" }} to="/UpdateArtifact">
            <button
              type="button"
              className="btn-primary btn"
              style={{ backgroundColor: "rgb(67,35,130)" }}
            >
              Update 
            </button>
          </Link>{" "}                </td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDelete(res.id)}
                        >
                          Delete
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </center>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </>
  );
}
