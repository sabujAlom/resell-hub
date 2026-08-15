import { authClient } from '@/lib/auth-client';

export const registerUser = async (email, password, name, role, phone, location, image) => {
  return await authClient.signUp.email({
    email,
    password,
    name,
    role: role || 'buyer',
    phone,
    location,
    image,
    callbackURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000'
  });
};

export const loginUser = async (email, password) => {
  return await authClient.signIn.email({
    email,
    password,
    callbackURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000'
  });
};

export const logoutUser = async () => {
  return await authClient.signOut();
};

export const loginWithGoogle = async () => {
  return await authClient.signIn.social({
    provider: 'google',
    callbackURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000'
  });
};

export const updateProfile = async (name, image) => {
  return await authClient.updateUser({
    name,
    image
  });
};
