import logger from '../utils/logger.js';

export default function errorHandler(err, req, res, next) {
  console.error(err.stack);
  logger.error(err.message);
  
  if (err.name === 'ValidationError') {
    res.status(400).json({message: err.message});
  } else if (err.name === 'JsonWebTokenError') {
    res.status(401).json({message: err.message});
  } else if (err.name === 'TokenExpiredError') {
    res.status(401).json({message: err.message});
  } else if (
    err.name === 'SequelizeDatabaseError' || 
    err.name === 'SequelizeUniqueConstraintError' ||
    err.name === 'sequelizeForeignKeyConstraintError'
) {
    res.status(400).json({message: err.message});
  } else {
    res.status(500).json({message: err.message});
  }
}