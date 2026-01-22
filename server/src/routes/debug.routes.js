const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// DB Heartbeat Route
router.get('/db-check', async (req, res) => {
    try {
        const { count, error } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.error('DB Check Error:', error);
            return res.status(500).json({ status: "error", error: error.message });
        }

        res.json({ status: "ok", product_count: count });
    } catch (err) {
        console.error('DB Check Unexpected Error:', err);
        res.status(500).json({ status: "error", error: err.message });
    }
});

module.exports = router;
