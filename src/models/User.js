import { getDb } from '../config/db.js';

export const getUserCollection = () => getDb().collection('users');
