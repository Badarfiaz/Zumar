// seedProducts.js
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Your Firebase admin SDK service account key JSON
const serviceAccount = require('./path/to/serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const products = [
  {
    name: 'Olive Zipper Polo Shirt',
    price: 29.99,
    image: 'https://thehawk.pk/cdn/shop/products/1_8d9d9da0-613c-4108-9930-b0b276395477.jpg?v=1679415467&width=1100',
  },
  {
    name: 'Black Zipper Polo Shirt',
    price: 39.99,
    image: 'https://thehawk.pk/cdn/shop/products/a5736647dc5b445e5a197c02a66609d4.jpg?v=1680808653&width=1100',
  },
  // add all your products here...
];

async function seed() {
  const collectionRef = db.collection('products');
  for (const product of products) {
    await collectionRef.add(product);
    console.log(`Added product: ${product.name}`);
  }
  console.log('Seeding complete.');
  process.exit(0);
}

seed().catch(console.error);
