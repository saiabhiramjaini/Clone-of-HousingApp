import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserForgotPassword(){
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5001/user/forgot-password', {email});
            alert(response.data.msg);
            // Optionally navigate the user after a successful request
            // if(response.data.msg === "Password reset email sent successfully"){
            //     navigate('/signin');
            // }
        }catch(e){
            console.log(e);
        }   
    }

    return(
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h1 className="text-xl font-bold mb-8">Reset Your Password</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" required
                           className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                           onChange={(e)=>setEmail(e.target.value)}/>
                    <div className="mt-6">
                        <button type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Send Reset Link
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserForgotPassword;
