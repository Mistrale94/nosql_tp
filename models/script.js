const { MongoClient, ObjectId } = require('mongodb');

// Connexion à la base de données MongoDB Atlas
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Définition de la collection "products"
const productSchema = {
  name: 'products',
  fields: {
    name: { type: 'string', required: true, default: 'nom du produit' },
    description: { type: 'string', default: 'description du produit' },
    stock: { type: 'int32', required: true },
    date_add: { type: 'date', default: new Date() },
    is_still_sell: { type: 'boolean' },
    dimensions: {
      type: 'object',
      fields: {
        width: { type: 'number' },
        length: { type: 'number' },
        height: { type: 'number' }
      }
    },
    variations: { type: 'array', items: { type: 'string' } }
  }
};

// Définition de la collection "orders"
const orderSchema = {
  name: 'orders',
  fields: {
    order_number: { type: 'int', required: true },
    user: { type: 'object', required: true },
    products: { type: 'array', required: true },
    date_billing: { type: 'date' }
  }
};

// Définition de la collection "users"
const userSchema = {
  name: 'users',
  fields: {
    email: { type: 'string', required: true },
    firstname: { type: 'string', required: true },
    lastname: { type: 'string', required: true },
    password: { type: 'string', required: true },
    address: { type: 'array', required: true },
    date_add: { type: 'date' }
  }
};

// Exemple d'utilisation pour insérer un document dans la collection "products"
async function insertProduct(product) {
  try {
    await client.connect();
    const database = client.db('nom_de_votre_base_de_donnees');
    const collection = database.collection(productSchema.name);
    await collection.insertOne(product);
    console.log('Document inséré avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'insertion du document:', error);
  } finally {
    await client.close();
  }
}

// Exemple d'utilisation pour insérer un document dans la collection "orders"
async function insertOrder(order) {
  try {
    await client.connect();
    const database = client.db('nom_de_votre_base_de_donnees');
    const collection = database.collection(orderSchema.name);
    await collection.insertOne(order);
    console.log('Document inséré avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'insertion du document:', error);
  } finally {
    await client.close();
  }
}

// Exemple d'utilisation pour insérer un document dans la collection "users"
async function insertUser(user) {
  try {
    await client.connect();
    const database = client.db('nom_de_votre_base_de_donnees');
    const collection = database.collection(userSchema.name);
    await collection.insertOne(user);
    console.log('Document inséré avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'insertion du document:', error);
  } finally {
    await client.close();
  }
}
