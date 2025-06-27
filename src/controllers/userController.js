import { db } from '../config/firebase.js';
import bcrypt from 'bcryptjs';

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

}

export default UsersController;
