import React from 'react';
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
export default function Display(props) {

    const { id } = useParams();
    const [artifact, setArtifact] = useState([]);
/* 
    fetch('http://localhost/archaeoshop/display1.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    })
      .then(response => response.json())
      .then(data => {
        // Process the fetched data
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
 */
   /*  const loadArtifacts = async () => {
        const url='http://localhost/archaeoshop/display.php';
        let fData = new FormData();
        fData.append('id',id);
        const result = axios.post(url,fData).then(response=> console.log(JSON.stringify(response.data))).catch(error=> {
          let str = result.data.phpresult[0]['id'];

          console.log(error.toJSON());
        }) 
      } 
      useEffect(() => {
        loadArtifacts();
    }, []);   
      */

    const loadArtifacts = async () => {

        
          const result = await axios.get("http://shopdb.42web.io/archaeoshop/display.php?id="+id);
          setArtifact(result.data.phpresult);
          console.log(result.data.phpresult);
          let str = result.data.phpresult[0]['id']+","+result.data.phpresult[0]['name']+","+result.data.phpresult[0]['name']+","+result.data.phpresult[0]['conditions']+","+result.data.phpresult[0]['description']+","+result.data.phpresult[0]['material']+","+result.data.phpresult[0]['origin']+","+result.data.phpresult[0]['price']+","+result.data.phpresult[0]['rarity'];
          console.log(str); 
      
    
      }
      useEffect(() => {
        loadArtifacts();
    }, []); 

  

  return (
    <>
        Artifact Details
        id = {id}
        <div>  
              <br></br>

              <h5> details fetched </h5>

            {artifact.map((res)=>
                
                <div>
                    id : {res.id} <br></br>
                    name : {res.name} <br></br>
                    desc : {res.desc} <br></br>
                    age : {res.age} <br></br>
                    origin : {res.origin} <br></br>
                    material : {res.material} <br></br>
                    condition : {res.condition} <br></br>
                    rarity : {res.rarity} <br></br>
                    price : {res.price} <br></br>
                </div>
            )}  
            
          </div>


    </>
  )
}
