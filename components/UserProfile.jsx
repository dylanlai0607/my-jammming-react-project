import { useState, useEffect } from 'react';

function UserProfile() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchUserProfle() {
            try {
                const response = await fetch('http://127.0.0.1:8888/api/my-profile');
                if (!response.ok) throw new Error('Failed to fetch profile');
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchUserProfle();
    }, []);

    if (data) {
        return (
            <div className="user-profile-card">
                <div className="profile-top">
                    <div className="profile-picture-placeholder"></div>
                    <div className="profile-header">
                        <h1 className="profile-welcome">Welcome, {data.display_name}!</h1>
                    </div>
                </div>
                <div className="profile-content">
                    <div className="profile-stat">
                        <span className="stat-label">Followers</span>
                        <span className="stat-value">{data.followers?.total || 0}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfile;