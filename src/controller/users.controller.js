
import { User } from '../models/user.js';
import { Task } from '../models/task.js';
import logger from '../logs/logger.js';
import { Status } from '../constants/index.js';

async function getUsers(req, res, next) {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'password', 'status'],
            order: [['id', 'DESC']],
            where: {
                status: Status.ACTIVE,
            },
        });
        res.json(users);
    } catch (error) {
    next(error);
    }
}

async function createUser(req, res, next) {
    const { username, password } = req.body;
    try {
        const user = await User.create({
            username,
            password,
        });
        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function getUser(req, res, next) {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            attributes: ['id', 'username', 'password', 'status'],
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function deleteUser(req, res, next) {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
}


async function updateUser(req, res, next) {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        if (!username && !password) {
            return res
                .status(400)
                .json({ message: 'Username or password is required' });
        }
            const user = await User.update({
                username,
                password,
            }, {
                where: {
                    id,
                },
        })
        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function getTasks(req, res, next) {
    const { userId } = req.user;
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'name', 'done'],
            order: [['name', 'ASC']],
            where: {
                userId,
            },
        });
        res.json(tasks);
    } catch (error) {
        next(error);
    }
}

export default {
    getUsers,
    createUser,
    getUser,
    deleteUser,
    updateUser,
    getTasks,
};