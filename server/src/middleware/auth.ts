import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createError, sendResponse } from '../utils/responseUtils';
import { Request, Response, NextFunction } from 'express';

interface DecodedToken {
    id: string; 
}

// Register User
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let { username, password, email, ...otherDetails } = req.body;
    console.log(req.body)

    // Validate required fields
    if (!(username && password && email)) {
        return next(createError(400, 'Please fill all the fields properly'));
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);

    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({ username });
        const userWithRegisteredEmail = await User.findOne({ email });

        if (existingUser) {
            return next(createError(400, 'Username already in use!'));
        }

        if (userWithRegisteredEmail) {
            return next(createError(400, 'Email already registered!'));
        }

        // Create new user
        const user = new User({ username, password, email, ...otherDetails });
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY!,
            { expiresIn: '1d' }
        );

        // Send response
        sendResponse(res, 201, 'Account created successfully', {
            username,
            token
        });
    } catch (error) {
        next(createError(500, "Internal Server Error"));
    }
};

// Login User
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let { username, password } = req.body;
    console.log(req.body)

    // Validate required fields
    if (!(username && password)) {
        return next(createError(400, 'Please fill all the fields properly'));
    }

    try {
        // Find user by username
        let user = await User.findOne({ username });
        if (!user) {
            return next(createError(404, 'User Not Found'));
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return next(createError(400, 'Wrong Password'));
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY!,
            { expiresIn: '1d' }
        );

        // Send response
        sendResponse(res, 200, 'Logged in successfully', { token, username });
    } catch (error) {
        next(createError(500, "Internal Server Error"));
    }
};



// Define a type for the decoded token
interface DecodedToken extends JwtPayload {
  id: string;
}

// Verify User
export const verifyUser = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const { token, username } = req.query;

    if (typeof token !== 'string' || typeof username !== 'string') {
        return next(createError(400, "Invalid request parameters"));
    }

    try {
        // Verify the token and cast to DecodedToken
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as DecodedToken;

        if (!decodedToken.id) {
            return next(createError(401, "Unauthorized"));
        }

        const user = await User.findById(decodedToken.id);
        if (user?.username !== username) {
            return next(createError(401, "Unauthorized"));
        }

        req.user = decodedToken; // Attach decoded token to req object

        next();
    } catch (error) {
        next(createError(403, "Token is not valid"));
    }
};
