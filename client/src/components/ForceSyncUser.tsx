import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ForceSyncUser: React.FC = () => {
    const { getAccessTokenSilently, user } = useAuth0();

    const handleSync = async () => {
        try {
            console.log("Force Sync: Getting token...");
            const token = await getAccessTokenSilently();
            console.log("Force Sync: Token received:", token);

            const response = await fetch('http://localhost:5000/api/user/sync', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: user?.name,
                    picture: user?.picture
                })
            });

            const data = await response.json();
            console.log("Force Sync: Response data:", data);
            alert(`Sync Status: ${response.status}\nMessage: ${JSON.stringify(data)}`);

        } catch (error: any) {
            console.error("Force Sync Error:", error);
            alert(`Sync Failed: ${error.message}`);
        }
    };

    return (
        <button
            onClick={handleSync}
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 9999,
                padding: '10px 20px',
                backgroundColor: 'red',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer'
            }}
        >
            Force Sync User
        </button>
    );
};

export default ForceSyncUser;
