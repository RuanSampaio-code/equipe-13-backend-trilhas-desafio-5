import { db } from '../config/firebase.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.FIREBASE_CONFIG;

class UsersController {

    static async getUsers(req, res) {
        
        try {   
            const usersSnapshot = await db.collection('users').get();
            const users = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            res.status(200).json(users);
        } catch (error) {
            console.error('Erro ao buscar usuários do Firebase:', error);
            res.status(500).json({ error: 'Erro ao buscar usuários.' });
        }
    }

    static async registerUser(req, res) {
        try {
        const { name, email, password } = req.body;

        //Validar os campos obrigatórios
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email and password are required.' });
        }

        // Gerar hash da senha (salt padrão 10)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        };


        const docRef = await db.collection('users').add(userData);

        res.status(201).json({ id: docRef.id, name, email, createdAt: userData.createdAt });
        } catch (error) {
        console.error('Erro ao salvar usuário no Firebase:', error);
        res.status(500).json({ error: 'Erro ao salvar usuário.' });
        }
    }

     static async loginUser(req, res) {
    console.log('Chegou na rota de login');
    try {
      const { email, passaword } = req.body;

      if (!email || !passaword) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
      }

      const snapshot = await db.collection('users').where('email', '==', email).get();
      if (snapshot.empty) {
        return res.status(401).json({ erro: 'Credenciais inválidas.' });
      }

      const doc = snapshot.docs[0];
      const usuario = doc.data();

      const senhaValida = await bcrypt.compare(passaword, usuario.passaword);
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Credenciais inválidas.' });
      }

      const token = jwt.sign(
        { id: doc.id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        mensagem: 'Login realizado com sucesso!',
        token,
        usuario: {
          id: doc.id,
          nome: usuario.nome,
          email: usuario.email,
          tipo: usuario.tipo
        }
      });
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      res.status(500).json({ erro: 'Erro ao fazer login.', detalhes: err.message });
    }
  }

}



export default UsersController;
