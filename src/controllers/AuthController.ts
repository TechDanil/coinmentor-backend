import { Request, Response } from 'express';
import { User } from '../models/User';
import { getManager } from 'typeorm';
import { generateAccessToken } from '../utils/generateAccessToken/generateAccessToken';
import { generateRefreshToken } from '../utils/generateRefreshToken/generateRefreshToken';
import multer from 'multer';
import { verifyToken } from '../utils/verifyToken/verifyToken';
import { comparePassword } from '../utils/comparePassword/comparePassword';
import { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
    user?: JwtPayload;
}

class AuthController {
    private upload = multer();

    register = async (req: Request, res: Response) => {
        this.upload.none()(req, res, async (err: any) => {
            if (err) {
                return res.status(500).json({ message: 'Error processing form data.' });
            }

            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({ message: 'Fill in the gaps.' });
            }

            const userRepository = getManager().getRepository(User);

            const existingUser = await userRepository.findOne({ where: { email } });

            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use.' });
            }

            const user = new User();
            user.username = username;
            user.email = email;
            user.password = password;
            await user.hashPassword();

            const accessToken = generateAccessToken(user.id);
            const refreshToken = generateRefreshToken();
            user.refreshToken = refreshToken;

            await userRepository.save(user);

            // res.cookie('accessToken', accessToken, { httpOnly: true });

            res.status(201).json({ 
                message: 'User registered successfully', 
                accessToken,
                refreshToken,
                user: { id: user.id, username: user.username, email: user.email },
            });
        });
    }

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Fill in the gaps' });
            }

            const userRepository = getManager().getRepository(User);
            const user = await userRepository.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ message: 'There is no user found.' });
            }

            const isPasswordValid = await comparePassword(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            const accessToken = generateAccessToken(user.id);

            const refreshToken = generateRefreshToken();
            user.refreshToken = refreshToken;
            await userRepository.save(user);

            // res.cookie('accessToken', accessToken, { httpOnly: true });
            
            res.status(200).json({ 
                message: 'Login successful',
                accessToken,
                refreshToken,
                user: { id: user.id, username: user.username, email: user.email },
            });
        } catch(error) {
            res.status(500).json({ message: 'Internal server error when logging in...' });
        }
    }

    refresh = async (req: Request, res: Response) => {
        try {
            const refreshToken = req.headers.authorization?.split(' ')[1];

            if (!refreshToken) {
                return res.status(401).json({ message: 'Refresh token not provided.' });
            }

            const userId = verifyToken(refreshToken);
            const userRepository = getManager().getRepository(User);
            const user = await userRepository.findOne({ where: { id: +userId }});

            if (!user) {
                return res.status(401).json({ message: 'User not found.' });
            }

            const newAccessToken = generateAccessToken(+userId);


            console.log(newAccessToken)
            
            res.json({ accessToken: newAccessToken });
        } catch(error) {
            console.error('Error refreshing token:', error);
            res.status(401).json({ message: 'Invalid refresh token.' });
        }
    }

    verify = async (req: CustomRequest, res: Response) => {
        try {
            const userId = (req.user as JwtPayload)?.userId;

            const userRepository = getManager().getRepository(User);
            const user = await userRepository.findOne(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            const accessToken = generateAccessToken(user.id);
            const refreshToken = generateRefreshToken();
            user.refreshToken = refreshToken;

            await userRepository.save(user);

            res.status(200).json({ message: 'User verified successfully', 
            accessToken, 
            refreshToken,
            user: { id: user.id, username: user.username, email: user.email },
         });
        } catch(error) {
            res.status(500).json({ message: 'Internal server error when veryfing...' });
        }
    }
}

export default new AuthController();