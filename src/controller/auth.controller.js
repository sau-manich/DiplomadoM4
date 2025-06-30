import { comparar } from '../common/bcrypt.js';
import config from '../config/env.js';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken'; // ✅ Corrección aquí

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) return res.status(403).json({ message: 'User not found' });
        const isMatch = await comparar(password, user.password);

        if (!isMatch) return res.status(403).json({ message: 'Invalid password' });
        const token = jwt.sign(
            { userId: user.id },
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRATION }
        );
        res.json({ token });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Internal server error' });
    }
}
export default { login };