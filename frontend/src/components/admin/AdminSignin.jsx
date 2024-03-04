import React, {useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function AdminSignin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5001/realtor/signin', {email, password})
            alert(response.data.msg);
            if(response.data.msg === "Signin successful"){
                navigate('/admin/dashboard')
            }
        }catch(e){
            console.log(e);
        }   
    }

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="block text-gray-900 text-lg font-bold mb-6">Admin Signin</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input id="email" type="email" onChange={(e)=>setEmail(e.target.value)}
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input id="password" type="password" onChange={(e)=>setPassword(e.target.value)}
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Signin
                        </button>
                        <a href="/admin/forgotPassword" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Forgot password?
                        </a>
                    </div>
                    <div className="text-center mt-4">
                        <a href="/admin/signup" className="font-medium text-sm text-blue-600 hover:text-blue-900">
                            Don't have an account?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminSignin;
