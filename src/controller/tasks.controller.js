
import { Task } from '../models/task.js';

async function getTasks(req, res, next) {
    const { userId } = req.user;
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'name', 'done'], order: [['name', 'ASC']],
            where: {
            },
        });
        userId,
            res.json(tasks);
    } catch (error) {
        next(error);
    }
}

async function createTask(req, res, next) {
    const { userId } = req.user;
    const { name } = req.body;
    try {
        const task = await Task.create({
            name,
            userId,
        });
        res.json(task);
    } catch (error) {
        next(error);
    }
}

async function getTask(req, res, next) {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id, {
            attributes: ['id', 'name', 'done'],
        });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        next(error);
    }
}
async function deleteTask(req, res, next) {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.destroy();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }
}

export default {
    getTasks,
    createTask,
    getTask,
    deleteTask
};