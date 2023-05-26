// pages/api/orders.js
import { connectToDatabase } from '../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Ajouter une commande
    const { order_number, user, products, date_billing } = req.body;
    const { db } = await connectToDatabase();
    const ordersCollection = db.collection('orders');
    await ordersCollection.insertOne({
      order_number,
      user,
      products,
      date_billing: new Date(date_billing)
    });
    res.status(201).json({ message: 'Commande ajoutée avec succès' });
  } else if (req.method === 'GET') {
    // Afficher les commandes d'un utilisateur
    const { user } = req.query;
    const { db } = await connectToDatabase();
    const ordersCollection = db.collection('orders');
    const orders = await ordersCollection.find({ user }).toArray();
    res.status(200).json(orders);
  } else if (req.method === 'PUT') {
    // Afficher l'ensemble des produits d'une commande
    const { id } = req.query;
    const { db } = await connectToDatabase();
    const ordersCollection = db.collection('orders');
    const order = await ordersCollection.findOne({ _id: id });
    const productsCollection = db.collection('products');
    const products = await productsCollection.find({ _id: { $in: order.products } }).toArray();
    res.status(200).json(products);
  } else if (req.method === 'DELETE') {
    // Supprimer une commande
    const { id } = req.query;
    const { db } = await connectToDatabase();
    const ordersCollection = db.collection('orders');
    await ordersCollection.deleteOne({ _id: id });
    res.status(200).json({ message: 'Commande supprimée avec succès' });
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
