import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const useUserSync = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const syncUser = async () => {
            try {
                if (isAuthenticated && user) {
                    const token = await getAccessTokenSilently();

                    await fetch('http://localhost:5000/api/user/sync', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: user.name,
                            picture: user.picture,
                        }),
                    });

                    console.log('User synced with backend');
                }
            } catch (error) {
                console.error('Error syncing user:', error);
            }
        };

        syncUser();
    }, [isAuthenticated, user, getAccessTokenSilently]);
};

export default useUserSync;
