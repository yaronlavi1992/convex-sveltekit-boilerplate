import { Polar } from '@polar-sh/sdk';

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN || 'polar_oat_0WCN75PrHvFY9i7hw27a07y9zdpwfLArwzjva3wOHbx'
});

async function listProducts() {
  try {
    const response = await polar.products.list({});
    
    console.log('\n=== Your Polar Products ===\n');
    
    for await (const page of response) {
      if (page.items && page.items.length > 0) {
        page.items.forEach(product => {
          console.log(`Name: ${product.name}`);
          console.log(`ID: ${product.id}`);
          console.log(`Description: ${product.description || 'N/A'}`);
          if (product.prices && product.prices.length > 0) {
            console.log('Prices:');
            product.prices.forEach(price => {
              console.log(`  - ${price.amountType}: $${price.priceAmount / 100} ${price.priceCurrency}`);
            });
          }
          console.log('---');
        });
      } else {
        console.log('No products found. Create products at: https://polar.sh/dashboard/products');
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
    if (error.body) {
      console.error('Details:', JSON.stringify(error.body, null, 2));
    }
  }
}

listProducts();
