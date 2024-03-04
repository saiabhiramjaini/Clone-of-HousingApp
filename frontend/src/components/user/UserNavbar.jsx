import React, {useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function UserNavbar(){
    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5001/properties/search', {query})
            
        }catch(e){
            console.log(e);
        }   
    }

    return(
        <>
        <input type="text" onChange={(e)=>setQuery(e.target.value)}/>
        <button onClick={handleSubmit}>Search</button>
        <br />
        </>
    )
}

export default UserNavbar;