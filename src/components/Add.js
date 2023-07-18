import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./css/Add.css"

let container = {
  width: '60%',
  marginLeft: '20%'
};



export default function Add() {

  const [selectedImage, setSelectedImage] = useState('');

  let files;

  const onFileChange = (e) => {
    files = document.getElementById("fileup").files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);

    fileReader.onload = (event) => {
      setSelectedImage(event.target.result);
      console.log(files[0]);
     
    }
  }



  const [id1, setid1] = useState([]);
  const [Fid, setFid] = useState([]);

  const loadFid = async () => {
    const result = await axios.get("http://shopdb.42web.io/archaeoshop/getid.php");
    setFid(result.data.phpresult);
    console.log(result.data.phpresult);
    setId(result.data.phpresult[0]['id']);
  };

  useEffect(() => {
    loadFid();
    setQrid(makeid(8));
    console.log(qrid);
  }, []);   

    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
        }
        return result;
    }

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [age, setAge] = useState('');
  const [origin, setOrigin] = useState('');
  const [material, setMaterial] = useState('');
  const [condition, setCondition] = useState('');
  const [rarity, setRarity] = useState('');
  const [price, setPrice] = useState('');
  const [qrid, setQrid] = useState('');

  
  const navigate = useNavigate();

  function handleClick() {
    navigate("/Qr");
  }

 

  const onAdd = () => {

    if (name.length === 0) {
      alert("Name has been left blank!");
    } else if (desc.length === 0) {
      alert("Description has been left blank!");
    } else if (age.length === 0) {
      alert("Age has been left blank!");
    } else if (origin.length === 0) {
      alert("Origin has been left blank!");
    } else if (material.length === 0) {
      alert("Material has been left blank!");
    } else if (condition.length === 0) {
      alert("Condition has been left blank!");
    } else if (rarity === 0) {
      alert("Rarity has been left blank!");
    } else if (price.length === 0) {
      alert("Price has been left blank!");
    } else {
      
      files = document.getElementById("fileup").files;
      console.log("files\n");
      console.log(files[0]['name']);
      console.log("files\n");

      alert("Artifact added successfully");
      setid1(document.getElementById("trno").value);
      console.log("ew" + id1);
      const url = 'http://localhost/archaeoshop/add.php';
      let fData = new FormData();
      fData.append('qrid', qrid);
      fData.append('id', id);
      fData.append('name', name);
      fData.append('desc', desc);
      fData.append('age', age);
      fData.append('origin', origin);
      fData.append('material', material);
      fData.append('conditions', condition);
      fData.append('rarity', rarity);
      fData.append('price', price);
      fData.append('image',files[0]);
      axios.post(url, fData)
        .then(response => alert(response.data))
        .catch(error => {
          console.log(error.toJSON());
        });

      handleClick();
    }
  }

  return (
    <>
      <br /><br />
      <div className="container" style={container}>
        <center><h3 className="sp1">Add Artifacts</h3></center>
        <form>
          <div className="mb-3">
            <label className="form-label">Artifact ID</label>
            {Fid.map((res) =>
              <input type="number" className="form-control" id="trno" value={res.id} disabled />
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Artifact Name</label>
            <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Artifact Description</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setDesc(e.target.value)}></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Artifact Age</label>
            <input type="text" className="form-control" id="age" onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Artifact Origin</label>
            <input type="text" className="form-control" id="origin" onChange={(e) => setOrigin(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="form-label">Artifact Material</label>
            <input type="text" className="form-control" id="material" onChange={(e) => setMaterial(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="form-label me-3">Upload Image</label>
            <input type="file" id="fileup" onChange={onFileChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Artifact Condition</label>
            <select class="form-select" id="conditions" value={condition} onChange={(e) => setCondition(e.target.value)}>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="damaged">Damaged</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Artifact Rarity</label>
            <select class="form-select" id="rarity" value={rarity} onChange={(e) => setRarity(e.target.value)}>
              <option value="common">Common</option>
              <option value="rare">Rare</option>
              <option value="one_of_a_kind">One-of-a-kind</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Artifact Price</label>
            <input type="number" className="form-control" id="price" onChange={(e) => setPrice(e.target.value)} />
          </div>

          <br /><br />
          <center>
            <button type="submit" id="btn1" className="btn btn-primary1" onClick={() => { onAdd() }}>Submit</button>
          </center>
        </form>
      </div>
    </>
  );
}
