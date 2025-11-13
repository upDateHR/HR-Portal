// HR-Portal/server/middleware/auth.js

// This middleware checks if a user is logged in (has a valid token).
const protect = (req, res, next) => {
    let token;

    // 1. Check if the request contains an authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            
            // NOTE: In a real application, you would use jwt.verify(token, secret) here
            // to decode the token and attach the user's ID to the request object (req.user)

            if (token) {
                // If a token is present, we allow the request to proceed for now.
                return next(); 
            }

        } catch (error) {
            console.error('Error processing token:', error);
            // Return an error if the token is invalid (e.g., expired or tampered with)
            return res.status(401).json({ message: 'Not authorized, invalid token.' });
        }
    }

    // 2. If no token is found in the header
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided.' });
    }
};

module.exports = { protect };