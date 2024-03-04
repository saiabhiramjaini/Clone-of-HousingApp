import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserSignin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/user/signin', { email, password });
            alert(response.data.msg);
            if (response.data.msg === "Signin successful") {
                navigate('/user/home');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 px-4 py-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">User Signin</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Signin
                </button>
                <div className="mt-4 text-center">
                    <a href="/user/forgotPassword" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Forgot password?
                    </a>
                </div>
                <div className="mt-2 text-center">
                    <a href="/user/signup" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Don't have an account?
                    </a>
                </div>
            </form>
        </div>
    );
}

export default UserSignin;
