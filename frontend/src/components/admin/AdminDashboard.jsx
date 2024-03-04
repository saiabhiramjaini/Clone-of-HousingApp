import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    axios.defaults.withCredentials = true;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/realtor/profile');
                setEmail(response.data.email);
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                if (error.response && error.response.status === 401) {
                    setError('Unauthorized access or token expired. Please login again.');
                } else {
                    setError('Error fetching profile data. Please try again later.');
                }
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5001/realtor/logout');
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Dashboard</h1>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <p className="text-gray-700 text-base mb-4">Email: {email}</p>
                        <p className="text-gray-700 text-base mb-6">Username: {username}</p>
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Logout
                        </button>
                    </div>
                    <br />
                    <a href="/admin/uploadProperty" className="text-blue-500 hover:text-blue-800">Upload Property</a>
                </>
            )}
        </div>
    );
}

export default AdminDashboard;
