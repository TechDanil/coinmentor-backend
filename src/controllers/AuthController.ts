import { Request, Response } from 'express';
import { User } from '../models/User';
import { getManager } from 'typeorm';
import { generateAccessToken } from '../utils/generateAccessToken/generateAccessToken';
import { generateRefreshToken } from '../utils/generateRefreshToken/generateRefreshToken';

class AuthController {
    register = async (req: Request, res: Response) => {
        const { username, email, password, isLicenseAccepted } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'fill in the gaps' });
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

        if (isLicenseAccepted) {
            const refreshToken = generateRefreshToken();
            user.refreshToken = refreshToken;

            await userRepository.save(user);

            res.status(201).json({ message: 'User registered successfully', accessToken, refreshToken });
        } else {
            res.status(400).json({ message: 'License agreement not accepted. Registration failed.' });
        }
    }
}

export default new AuthController();