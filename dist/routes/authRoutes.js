"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var authController_1 = require("../controllers/authController");
var authentication_1 = __importDefault(require("../middleware/authentication"));
router.get("/", authentication_1.default, authController_1.getUsers);
router.post("/register", authController_1.createUser);
router.post("/login", authController_1.loginUser);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map