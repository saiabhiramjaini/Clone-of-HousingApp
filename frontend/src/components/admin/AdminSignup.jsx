import React, {useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function AdminSignup(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCpassword] = useState("");

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5001/realtor/signup', {username, email, password, cPassword,})
            alert(response.data.msg);
            if(response.data.msg == "User created Successfully"){
                navigate('/admin/signin')
            }
        }catch(e){
            console.log(e);
        }   
    }

    return(
        <>
        <h1>Admin Signup</h1>
        <label> Username </label>
        <br />
        <input type="text" onChange={(e)=>setUsername(e.target.value)}/>
        <br /> <br />
        <label> Email </label>
        <br />
        <input type="email" onChange={(e)=>setEmail(e.target.value)}/>
        <br /><br />
        <label> Password </label>
        <br />
        <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
        <br /><br />
        <label> Confirm Password </label>
        <br />
        <input type="password" onChange={(e)=>setCpassword(e.target.value)}/>
        <br /><br />
        <button onClick={handleSubmit}>AdminSignup</button>
        <br />
        <a href="/admin/signin">Already have an account?</a>
        </>
    )
}

export default AdminSignup;