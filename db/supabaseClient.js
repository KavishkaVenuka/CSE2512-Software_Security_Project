// supabaseClient.js
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY; // Use the Service Role Key here

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;