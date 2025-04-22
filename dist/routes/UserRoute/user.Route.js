"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_Controller_1 = require("../../controllers/UserControllers/User.Controller");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.post('/', User_Controller_1.newUser);
router.post('/login', User_Controller_1.loginUser);
router.get('/', validate_token_1.default, User_Controller_1.getUsers);
router.get('/:username', validate_token_1.default, User_Controller_1.getUserById);
router.put('/:id', validate_token_1.default, User_Controller_1.updateUser);
router.delete('/:id', validate_token_1.default, User_Controller_1.deleteUser);
exports.default = router;
