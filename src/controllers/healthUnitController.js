import { db } from '../config/firebase.js';

class HealthUnitController {
    // Cadastrar unidade favorita
    static async addFavorite(req, res) {
        try {
            const { 
                userId, 
                name, 
                address: { logradouro, numero, bairro, cep, estado }, 
                longitude, 
                latitude 
            } = req.body;

            // Validação básica
            if (!userId || !name || !logradouro || !numero || !bairro || !cep || !estado || !longitude || !latitude) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            }

            const favoriteData = {
                userId,
                name,
                address: { logradouro, numero, bairro, cep, estado },
                longitude,
                latitude,
                createdAt: new Date()
            };

            const docRef = await db.collection('favorites').add(favoriteData);
            
            res.status(201).json({ 
                id: docRef.id, 
                ...favoriteData 
            });
            
        } catch (error) {
            console.error('Erro ao salvar unidade favorita:', error);
            res.status(500).json({ error: 'Erro ao salvar unidade favorita' });
        }
    }

    // Listar todas as unidades favoritas
    static async getFavorites(req, res) {
        try {
            const userId = req.query.userId; // Filtro por usuário
            
            let query = db.collection('favorites');
            
            if (userId) {
                query = query.where('userId', '==', userId);
            }

            const snapshot = await query.get();
            const favorites = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            res.status(200).json(favorites);
        } catch (error) {
            console.error('Erro ao buscar favoritos:', error);
            res.status(500).json({ error: 'Erro ao buscar unidades favoritas' });
        }
    }

    //todas as unidades de saúde
    static async getHealthUnits(req, res) {
        try {
            const snapshot = await db.collection('favorites').get();
            const healthUnits = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            res.status(200).json(healthUnits);
        } catch (error) {
            console.error('Erro ao buscar unidades de saúde:', error);
            res.status(500).json({ error: 'Erro ao buscar unidades de saúde' });
        }
    }
}

export default HealthUnitController;