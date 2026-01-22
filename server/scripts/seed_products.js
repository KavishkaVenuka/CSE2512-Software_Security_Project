const supabase = require('../src/config/supabase');

const products = [
    {
        name: "Artisan Dark Truffles",
        price: 24.00,
        image_url: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=800",
        category: "Dark Chocolate",
        description: "Rich and creamy dark chocolate truffles."
    },
    {
        name: "Hazelnut & Sea Salt Praline",
        price: 32.50,
        image_url: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=800",
        category: "Pralines",
        description: "Crunchy hazelnuts meets savory sea salt."
    },
    {
        name: "Ruby Chocolate Delight",
        price: 28.00,
        image_url: "https://images.unsplash.com/photo-1621939514649-28b12e816747?auto=format&fit=crop&q=80&w=800",
        category: "Specialty",
        description: "Naturally pink and fruity ruby chocolate."
    },
    {
        name: "Classic Milk Selection",
        price: 19.99,
        image_url: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=800",
        category: "Milk Chocolate",
        description: "Smooth and creamy milk chocolates."
    },
    {
        name: "Pistachio Ganache Box",
        price: 35.00,
        image_url: "https://images.unsplash.com/photo-1623959146580-cf37a6730331?auto=format&fit=crop&q=80&w=800",
        category: "Gourmet",
        description: "Delicate pistachio ganache."
    },
    {
        name: "Gold Leaf Assortment",
        price: 49.99,
        image_url: "https://images.unsplash.com/photo-1526081347589-7fa342ea51e1?auto=format&fit=crop&q=80&w=800",
        category: "Luxury",
        description: "Edible gold leaf for a luxurious treat."
    },
    {
        name: "Caramel Filled Hearts",
        price: 15.50,
        image_url: "https://images.unsplash.com/photo-1599599810769-bcde5a45ddca?auto=format&fit=crop&q=80&w=800",
        category: "Seasonal",
        description: "Sweet caramel centers."
    },
    {
        name: "Vegan Coconut Bars",
        price: 12.00,
        image_url: "https://images.unsplash.com/photo-1616149562385-1d84e79478bb?auto=format&fit=crop&q=80&w=800",
        category: "Vegan",
        description: "Dairy-free coconut delight."
    }
];

async function seedProducts() {
    console.log('Seeding Products...');

    // Check if empty to avoid double seeding or just upsert?
    // Let's just insert.
    const { data, error } = await supabase
        .from('products')
        .insert(products)
        .select();

    if (error) {
        console.error('Error seeding products:', error);
    } else {
        console.log(`Successfully added ${data.length} products.`);
    }
}

seedProducts();
