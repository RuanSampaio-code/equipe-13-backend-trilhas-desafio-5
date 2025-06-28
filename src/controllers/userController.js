import { db } from '../config/firebase.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'seusegredoaqui';

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
        try {
            const { email, password } = req.body;
            console.log('Dados recebidos:', email, password);

            if (!email || !password) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
            }

            // Busca usuário pelo email
            const usersSnapshot = await db.collection('users').where('email', '==', email).get();
            if (usersSnapshot.empty) {
                return res.status(401).json({ error: 'Credenciais inválidas.' });
            }

            const userDoc = usersSnapshot.docs[0];
            const user = userDoc.data();

            // Verifica a senha
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Credenciais inválidas.' });
            }

            // Gera o token JWT
            const token = jwt.sign(
                { id: userDoc.id, email: user.email, name: user.name },
                SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ token });
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).json({ error: 'Erro ao fazer login.' });
        }
    }

}

export default UsersController;
