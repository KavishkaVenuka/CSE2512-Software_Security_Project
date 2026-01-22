const supabase = require('../src/config/supabase');

async function checkProducts() {
    console.log('Checking Products Table...');
    const { data, error, count } = await supabase
        .from('products')
        .select('*', { count: 'exact' });

    if (error) {
        console.error('Error fetching products:', error);
    } else {
        console.log(`Found ${count} products.`);
        console.log('Sample Data:', data.slice(0, 2));
    }
}

checkProducts();
