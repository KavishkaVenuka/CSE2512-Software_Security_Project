const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const supabase = require('./src/config/supabase');

async function debugDB() {
    console.log('--- DEBUGGING DATABASE ---');

    // 1. Check Products
    const { data: products, error: pError } = await supabase
        .from('products')
        .select('id, name')
        .limit(3);

    if (pError) console.error('Products Error:', pError);
    else console.log(`Found ${products.length} products. first:`, products[0]);

    // 2. Check Profiles (to ensure user exists)
    const { data: profiles, error: prError } = await supabase
        .from('profiles')
        .select('id, email')
        .limit(3);

    if (prError) console.error('Profiles Error:', prError);
    else console.log(`Found ${profiles.length} profiles.`);

    // 3. Check Orders
    const { data: orders, error: oError } = await supabase
        .from('orders')
        .select('*');

    if (oError) console.error('Orders Error:', oError);
    else {
        console.log(`Found ${orders.length} orders.`);
        orders.forEach(o => console.log(` - Order ${o.id}: User ${o.user_id}, Status ${o.status}`));
    }

    // 4. Check Order Items
    const { data: items, error: iError } = await supabase
        .from('order_items')
        .select('*');

    if (iError) console.error('Order Items Error:', iError);
    else {
        console.log(`Found ${items.length} order items.`);
        items.forEach(i => console.log(` - Item: Order ${i.order_id}, Product ${i.product_id}, Qty ${i.quantity}`));
    }

    console.log('--- END DEBUG ---');
}

debugDB();
