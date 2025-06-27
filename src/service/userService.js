import { db } from '../config/firebase';
import User from '../models/userModel';

class UserService {
  async registerUser(userData) {
    const { name, email, password } = userData;

    // Validate user data
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    // Check if user already exists
    const existingUser = await db.collection('users').where('email', '==', email).get();
    if (!existingUser.empty) {
      throw new Error('User already exists');
    }

    // Create a new user
    const newUser = new User(name, email, password);
    await db.collection('users').add(newUser);

    return { message: 'User registered successfully' };
  }
}

export default UserService;