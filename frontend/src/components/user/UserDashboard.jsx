import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    axios.defaults.withCredentials = true;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/user/profile');
                setEmail(response.data.email);
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                // Check if the error response is 401 (Unauthorized)
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
            await axios.post('http://localhost:5001/user/logout');
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="max-w-xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-semibold text-center mb-6">Welcome to Dashboard</h1>
            {error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <>
                    {/* Render profile data here */}
                    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                        <p className="text-lg"><strong>Email:</strong> {email}</p>
                        <p className="text-lg"><strong>Username:</strong> {username}</p>
                    </div>
                    <div className="text-center">
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Logout</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default UserDashboard;
