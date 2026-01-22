const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('SERVER: Missing Supabase URL or Service Role Key in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

module.exports = supabase;
