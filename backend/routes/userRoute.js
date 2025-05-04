const express = require('express');
const { createUser, getAllUsers, updateUser, deleteUser, login} =  require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);
userRouter.put('/:userId', updateUser);
userRouter.delete('/:userId', deleteUser);

module.exports = userRouter;