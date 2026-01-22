const express = require('express');
const router = express.Router();
const checkJwt = require('../middleware/auth.middleware');
const supabase = require('../config/supabase');

// Protected route to sync Auth0 user with Supabase
router.post('/sync', checkJwt, async (req, res) => {
    try {
        const { name, picture } = req.body;
        const { sub } = req.auth.payload; // Auth0 User ID

        // Normalize data for Supabase
        // If name/picture are missing (e.g. strict privacy), rely on what we have or defaults
        const filteredBody = {
            id: sub,
            full_name: name || 'Unknown User',
            avatar_url: picture || '',
            updated_at: new Date().toISOString()
        };

        // Perform Upsert (Insert or Update)
        // onConflict of 'id' ensures we update if the user exists
        const { data, error } = await supabase
            .from('profiles')
            .upsert(filteredBody, { onConflict: 'id' })
            .select();

        if (error) {
            console.error('Supabase Upsert Error:', error);
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ message: 'User synced successfully', data });

    } catch (err) {
        console.error('User Sync Unexpected Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
