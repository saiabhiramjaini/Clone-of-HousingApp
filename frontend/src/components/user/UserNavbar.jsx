import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserNavbar() {
    const [notifications, setNotifications] = useState([]); // Initialize with an empty array

    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("http://localhost:5001/notifications/getNotifications");
                setNotifications(response.data.notifications);
            } catch (e) {
                console.log(e);
            }
        };
        fetchNotifications();
    }, []);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const handleMarkAsRead = async () => {
        try {
            const response = await axios.post("http://localhost:5001/notifications/markAllAsRead")
            alert(response.data.msg);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <button onClick={toggleNotifications}>Notifications</button>
            {showNotifications && (
                <div>
                    <h3>Notifications</h3>
                    <ul>
                        {notifications.map((notification, index) => (
                            <li key={index}>{notification.notification}</li>
                        ))}
                    </ul>
                    <button onClick={handleMarkAsRead}>Mark all as read</button>
                </div>
            )}
        </>
    );
}

export default UserNavbar;