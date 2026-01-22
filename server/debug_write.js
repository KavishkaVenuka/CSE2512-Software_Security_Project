const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const supabase = require('./src/config/supabase');

async function debugWrite() {
    console.log('--- DEBUGGING DB WRITE ---');

    const testId = 'debug_user_' + Date.now();
    console.log(`Attempting to write profile with ID: ${testId}`);

    try {
        const { data, error } = await supabase
            .from('profiles')
            .insert({
                id: testId,
                full_name: 'Debug Write User',
                email: 'debug@example.com'
            })
            .select()
            .single();

        if (error) {
            console.error('❌ WRITE FAILED:', error.message);
            console.error('Details:', error);
        } else {
            console.log('✅ WRITE SUCCESS:', data);

            // Clean up
            console.log('Cleaning up...');
            await supabase.from('profiles').delete().eq('id', testId);
            console.log('Cleanup complete.');
        }

    } catch (err) {
        console.error('❌ CRITICAL ERROR:', err);
    }
}

debugWrite();
