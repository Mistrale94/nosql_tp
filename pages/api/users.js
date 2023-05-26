// pages/api/users.js
import { connectToDatabase } from '../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Ajouter un utilisateur
    const { email, firstname, lastname, password, address } = req.body;
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    await usersCollection.insertOne({
      email,
      firstname,
      lastname,
      password,
      address,
      date_add: new Date()
    });
    res.status(201).json({ message: 'Utilisateur ajouté avec succès' });
  } else if (req.method === 'GET') {
    // Voir les informations d'un utilisateur
    const { id } = req.query;
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ _id: id });
    res.status(200).json(user);
  } else if (req.method === 'PUT') {
    // Modifier les informations d'un utilisateur
    const { id } = req.query;
    const { email, firstname, lastname, password, address } = req.body;
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    await usersCollection.updateOne(
      { _id: id },
      {
        $set: {
          email,
          firstname,
          lastname,
          password,
          address
        }
      }
    );
    res.status(200).json({ message: 'Informations utilisateur mises à jour avec succès' });
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
