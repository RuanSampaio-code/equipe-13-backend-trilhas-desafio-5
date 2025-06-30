import { db } from '../config/firebase.js';

class HealthUnitController {
    // Cadastrar unidade favorita
    static async addFavorite(req, res) {
        try {
            const {
                id,
                name,
                address,
                latitude,
                longitude,
                rating,        // opcional
                phoneNumber,   // opcional
                website,       // opcional
                types,
                addedAt,
                userId
            } = req.body;

            // Validação dos campos obrigatórios
            if (!id || !name || !address || latitude === undefined || longitude === undefined || !types || !addedAt || !userId) {
                return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
            }

            const favoriteData = {
                id,
                name,
                address,
                latitude,
                longitude,
                rating: rating ?? null,
                phoneNumber: phoneNumber ?? null,
                website: website ?? null,
                types,
                addedAt,
                userId
            };

            const docRef = await db.collection('favorites').add(favoriteData);

            res.status(201).json({
                firebaseId: docRef.id, // ID gerado pelo Firestore
                ...favoriteData
            });

        } catch (error) {
            console.error('Erro ao salvar unidade favorita:', error);
            res.status(500).json({ error: 'Erro ao salvar unidade favorita' });
        }
    }

    // Listar todas as unidades favoritas por usuario
    static async getFavorites(req, res) {
        try {
            const userId = req.query.userId; // Filtro por usuário
            
            let query = db.collection('favorites');
            
            if (userId) {
                query = query.where('userId', '==', userId);
            }

            const snapshot = await query.get();
            const favorites = snapshot.docs.map(doc => ({
                firebaseId: doc.id, // ID gerado pelo Firestore
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

    //delete
    static async deleteFavorite(req, res) {
        try {
            const id = req.params.id;
            const docRef = db.collection('favorites').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return res.status(404).json({ message: "Unidade favorita não encontrada" });
            }

            await docRef.delete();
            res.status(200).json({ message: "Unidade favorita removida com sucesso" });
        } catch (error) {
            res.status(500).json({ message: `Erro ao remover unidade favorita: ${error.message}` });
        }
    }
}

export default HealthUnitController;