import { authClient } from '../../lib/auth-client';

export const registerUser = async (email, password, name, role, phone, location, image) => {
  return await authClient.signUp.email({
    email,
    password,
    name,
    role: role || 'buyer',
    phone,
    location,
    image,
    callbackURL: window.location.origin
  });
};

export const loginUser = async (email, password) => {
  return await authClient.signIn.email({
    email,
    password,
    callbackURL: window.location.origin
  });
};

export const logoutUser = async () => {
  return await authClient.signOut();
};

export const loginWithGoogle = async () => {
  return await authClient.signIn.social({
    provider: 'google',
    callbackURL: window.location.origin,
    flow: 'navigate'
  });
};

export const updateProfile = async (name, image) => {
  return await authClient.updateUser({
    name,
    image
  });
};
