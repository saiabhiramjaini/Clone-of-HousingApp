import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdNotifications } from 'react-icons/io'; // Import the notification icon

function UserNavbar() {
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    // Calculate the number of unread notifications
    const unreadCount = notifications.filter(notification => !notification.status).length;

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("http://localhost:5001/notifications/getNotifications");
                setNotifications(response.data.notifications);
            } catch (e) {
                console.error(e);
            }
        };
        fetchNotifications();
    }, []);

    const toggleNotifications = () => setShowNotifications(!showNotifications);

    const handleMarkAsRead = async () => {
        try {
            await axios.post("http://localhost:5001/notifications/markAllAsRead");
            setNotifications(notifications.map(notification => ({ ...notification, status: true }))); // Mark all as read locally
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="flex justify-between items-center bg-gray-100 p-4">
            <h1 className="text-xl font-bold">Housing Properties</h1>
            <div className="relative">
                <button onClick={toggleNotifications} className="relative">
                    <IoMdNotifications size={24} />
                    {unreadCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                            {unreadCount}
                        </span>
                    )}
                </button>
                {showNotifications && (
                    <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-lg p-4">
                        <h2 className="font-bold text-lg">Notifications</h2>
                        <ul>
                            {notifications.map((notification, index) => (
                                <li key={index} className={`${notification.status ? 'opacity-50' : ''} mt-2`}>
                                    <p>Notification: {notification.notification}</p>
                                    <p>Status: {notification.status ? 'Read' : 'Unread'}</p>
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleMarkAsRead} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Mark all as read
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserNavbar;
