import admin from 'firebase-admin';
import 'dotenv/config'; 

// Load Firebase credentials
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig)
});

const db = admin.firestore();

export { db, admin };