import axios from 'axios';
import React, { useState } from 'react'

const App = () => {

  const [segmentName,setSegmentName]=useState("");
  const [SelectedInput,setSelector] = useState([]);
  const [newSchema,setNewSchema] = useState();
  const [popup,setPopup]=useState(false);
  let output = {
    "Segment_name":segmentName,
    "schema":SelectedInput
  }
 

  let data = [{lable: "First Name", Value: "first_name"},
    {lable: "Last Name", Value: "last_name"},
    { lable: "Gender", Value: "gender"},
    {lable: "Age", Value: "age"},
    {lable: "Account Name", Value: "account_name"},
    {lable: "City", Value: "city"},
    {lable: "State", Value: "state"}];
   
async  function sendData(){
    if(!segmentName){
      alert("Enter the segment name")
    }else if(SelectedInput.length===0){
      alert("Add schema to the segment")
    }else{
      try {
        const config = {
          headers:{"Content-type":"application/json",},
        }
        await axios.post("https://webhook.site/3649626a-0295-40af-8545-3c1399678307",output,config);
        console.log(output);
        alert("schema Saved Successfully");
        setSegmentName("");
        setSelector([]);
        setNewSchema("");
      } catch (error) {
        
      }
    }
   
  }


  function create(){
    var select = document.getElementById('sel');
    let duplicate = SelectedInput.filter((e)=>e.Value===newSchema);
    if(duplicate.length){
      alert(`${newSchema} already there in the blue box`)
    }else{
      let option = data.filter((e)=>e.Value===newSchema);
     
      SelectedInput.push(...option);
      setSelector([...SelectedInput]);
    }
    
    select.selectedIndex = 0;
   
    
  }
  return <>
    <div className='container'>
   
      {
        popup?  <div className='popup'>
          <div className='head'>
            <p className='fs-3'>Saving Segment</p>
            <div><button type='button' className='btn btn-primary' onClick={()=>setPopup(false)}>X</button>
            </div>
          </div>
          <div className='content'>
          <div className='seg-name'>
          <label for="exampleFormControlInput1" class="form-label">Enter the Name of the Segment</label>
          <input type="email" class="form-control" onChange={(e)=>setSegmentName(e.target.value)} id="exampleFormControlInput1" placeholder='Name of the Segment'/>
          <p className='text-muted'>To save your segment, you need to add the schema to build the query</p>
          </div>
        <div className={SelectedInput.length?"blue-box":"disable"}>
        {
         SelectedInput?SelectedInput.map((e,i)=>{
          return<select key={i} class="form-select">
            <option value={e.Value}>{e.lable}</option>
            {
            data.filter((d=>d.Value!==e.Value)).map((e,i)=>{
              return <option key={i} value={e.Value}>{e.lable}</option>
            })
          }
          </select>
         }): "" 
        }
        </div>
        <select id='sel' class="form-select" onChange={(e)=>setNewSchema(e.target.value)}>
          <option default>Add schema to segmant</option>
          {
            data.map((e,i)=>{
              return <option key={i} value={e.Value}>{e.lable}</option>
            })
          }
        </select>
        <p  className='add-schema'  onClick={()=>create()}>+ Add newschema</p>
        <div>
          <button className='btn btn-primary mt-4' onClick={()=>sendData()}>Save Segment</button>
        </div>
        </div>
        </div>:<div className='d-flex justify-content-center align-items-center p-5'>
         <button type='button' className='btn btn-primary' onClick={()=>setPopup(true)}>Save Segment</button>
         </div>
      }
    
     
    </div>
    
  </>
}

export default App;
