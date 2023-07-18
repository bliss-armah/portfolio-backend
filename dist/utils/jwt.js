"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenValid = exports.createJwt = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createJwt = function (payload) {
    var token = jsonwebtoken_1.default.sign({ userId: payload }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
};
exports.createJwt = createJwt;
var isTokenValid = function (token) { return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET); };
exports.isTokenValid = isTokenValid;
//# sourceMappingURL=jwt.js.map