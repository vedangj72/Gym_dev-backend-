import "dotenv/config.js"
import pkg from "jsonwebtoken"

const { sign, verify } = pkg

/**
 * Generate a JWT token.
 *
 * @param {Object} data - The payload to be encoded into the JWT.
 * @param {Object} [options={}] - Additional options for the JWT (e.g., expiration).
 * @returns {string|null} The generated JWT token, or null if an error occurs.
 */
export function getJwt(data, options = {}) {
    try {
        return sign(data, process.env.JWT_SECRET_KEY, options);
    } catch (error) {
        console.error("JWT Generation Error:", error.message);
        return null;
    }
}

/**
 * Verify and decode a JWT token.
 *
 * @param {string} authorization - The JWT token to be verified.
 * @returns {Object|null} The decoded payload if verification is successful, or null if an error occurs.
 */
export async function verifyJwt(authorization) {
    try {
        return  await verify(authorization, process.env.JWT_SECRET_KEY);
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return null;
    }
}