import crypto from 'crypto';

/**
 * Generates a high-entropy random string.
 * Used for Magic Link tokens and Refresh tokens.
 */
export const generateToken = (bytes = 32): string => {
  return crypto.randomBytes(bytes).toString('hex');
};

/**
 * Creates a SHA-256 hash of a string.
 * Used to store tokens securely in the database.
 * 
 * Note: While bcrypt/argon2 are needed for passwords, SHA-256 is 
 * sufficient for high-entropy random tokens that cannot be dictionary attacked.
 */
export const hashToken = (token: string): string => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
};