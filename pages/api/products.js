// pages/api/products.js
import { connectToDatabase } from '../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Ajouter un produit
    const { name, description, stock, is_still_sell, dimensions, variations } = req.body;
    const { db } = await connectToDatabase();
    const productsCollection = db.collection('products');
    await productsCollection.insertOne({
      name,
      description,
      stock,
      date_add: new Date(),
      is_still_sell,
      dimensions,
      variations
    });
    res.status(201).json({ message: 'Produit ajouté avec succès' });
  } else if (req.method === 'GET') {
    // Voir la fiche d'un produit
    const { id } = req.query;
    const { db } = await connectToDatabase();
    const productsCollection = db.collection('products');
    const product = await productsCollection.findOne({ _id: id });
    res.status(200).json(product);
  } else if (req.method === 'PUT') {
    // Modifier un produit
    const { id } = req.query;
    const { name, description, stock, is_still_sell, dimensions, variations } = req.body;
    const { db } = await connectToDatabase();
    const productsCollection = db.collection('products');
    await productsCollection.updateOne(
      { _id: id },
      {
        $set: {
          name,
          description,
          stock,
          is_still_sell,
          dimensions,
          variations
        }
      }
    );
    res.status(200).json({ message: 'Produit mis à jour avec succès' });
  } else if (req.method === 'DELETE') {
    // Supprimer un produit
    const { id } = req.query;
    const { db } = await connectToDatabase();
    const productsCollection = db.collection('products');
    await productsCollection.deleteOne({ _id: id });
    res.status(200).json({ message: 'Produit supprimé avec succès' });
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
