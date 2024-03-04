import React, {useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function UserForgotPassword(){
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5001/user/forgot-password', {email})
            alert(response.data.msg);
            // if(response.data.msg == "UserForgotPassword successful"){
            //     navigate('/signin')
            // }
        }catch(e){
            console.log(e);
        }   
    }

    return(
        <>
        <h1>User ForgotPassword</h1>
        <label> Email </label>
        <br />
        <input type="email" onChange={(e)=>setEmail(e.target.value)}/>
        <br /><br />
        <button onClick={handleSubmit}>ForgotPassword</button>
        <br />
        </>
    )
}

export default UserForgotPassword;