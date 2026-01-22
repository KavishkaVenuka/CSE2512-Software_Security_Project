const supabase = require('../config/supabase');

const getCart = async (req, res) => {
    try {
        const userId = req.auth.payload.sub;

        // 1. Find the pending order for the user
        const { data: cart, error: cartError } = await supabase
            .from('orders')
            .select(`
                id,
                total_amount,
                status,
                order_items (
                    id,
                    quantity,
                    unit_price,
                    products (
                        id,
                        name,
                        image_url,
                        price
                    )
                )
            `)
            .eq('user_id', userId)
            .eq('status', 'pending')
            .maybeSingle();

        if (cartError) throw cartError;

        if (!cart) {
            return res.status(200).json([]);
        }

        // Format the response to match frontend expectations
        const formattedItems = cart.order_items.map(item => ({
            id: item.products.id, // Use Product ID for frontend consistency or Item ID? Usually Product ID for "add to cart" checks, but Item ID for "remove". Let's use Product ID as 'id' for now to match mock, or clarify. Mock used 'id' as simple number.
            // Actually, for removal we need order_item_id. Let's send both or map carefully.
            // The frontend mock used simple IDs. Let's map:
            cartItemId: item.id,
            productId: item.products.id,
            name: item.products.name,
            price: parseFloat(item.products.price),
            image: item.products.image_url,
            quantity: item.quantity
        }));

        res.status(200).json(formattedItems);

    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addToCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.auth.payload.sub;

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        // 1. Get Product Details (price is needed)
        const { data: product, error: productError } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();

        if (productError || !product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // --- FIX: Ensure Profile Exists ---
        // Prevents Foreign Key violation if user sync failed
        const { error: profileError } = await supabase
            .from('profiles')
            .upsert({ id: userId }, { onConflict: 'id', ignoreDuplicates: true });

        if (profileError) {
            console.error('Error ensuring profile exists:', profileError);
            // We continue, but it might fail below if upsert failed critically
        }
        // ----------------------------------

        // 2. Find or Create Pending Order
        let { data: order, error: orderError } = await supabase
            .from('orders')
            .select('id')
            .eq('user_id', userId)
            .eq('status', 'pending')
            .maybeSingle();

        if (orderError) throw orderError;

        if (!order) {
            const { data: newOrder, error: createError } = await supabase
                .from('orders')
                .insert({
                    user_id: userId,
                    status: 'pending',
                    total_amount: 0 // Will be recalculated or ignored for now
                })
                .select()
                .single();

            if (createError) throw createError;
            order = newOrder;
        }

        // 3. Check if item exists in order
        const { data: existingItem, error: itemError } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id)
            .eq('product_id', productId)
            .maybeSingle();

        if (itemError) throw itemError;

        if (existingItem) {
            // Update quantity
            const { error: updateError } = await supabase
                .from('order_items')
                .update({
                    quantity: existingItem.quantity + 1
                })
                .eq('id', existingItem.id);

            if (updateError) throw updateError;
        } else {
            // Insert new item
            const { error: insertError } = await supabase
                .from('order_items')
                .insert({
                    order_id: order.id,
                    product_id: productId,
                    quantity: 1,
                    unit_price: product.price
                });

            if (insertError) throw insertError;
        }

        res.status(200).json({ message: 'Item added to cart' });

    } catch (error) {
        console.error('Error adding to cart:', error);
        if (error.code === '23503') { // Foreign key violation info
            console.error('Foreign key violation! Check if user exists in profiles table.');
            return res.status(400).json({ message: 'User profile not found. Please log in again or contact support.' });
        }
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

const testWrite = async (req, res) => {
    try {
        console.log('--- TEST WRITE INITIATED ---');
        // Test 1: Write to non-relational table or just check count
        const { count, error: countError } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true });

        if (countError) throw new Error(`Read Check Failed: ${countError.message}`);
        console.log('Read Check Success. Product Count:', count);

        // Test 2: Upsert a test profile
        const testId = 'test_user_' + Date.now();
        const { error: profileError } = await supabase
            .from('profiles')
            .insert({
                id: testId,
                email: 'test@example.com',
                full_name: 'Test Write User'
            });

        if (profileError) throw new Error(`Profile Write Failed: ${profileError.message}`);
        console.log('Profile Write Success');

        // Clean up
        await supabase.from('profiles').delete().eq('id', testId);

        res.json({ message: 'Database Read/Write Check Passed' });
    } catch (error) {
        console.error('Test Write Failed:', error);
        res.status(500).json({
            message: 'Database Check Failed',
            error: error.message
        });
    }
};

module.exports = {
    getCart,
    addToCart,
    testWrite
};
