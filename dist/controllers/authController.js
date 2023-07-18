"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.loginUser = exports.createUser = void 0;
var hashPassword_1 = require("./../utils/hashPassword");
var config_1 = __importDefault(require("../config"));
var http_status_codes_1 = require("http-status-codes");
var jwt_1 = require("../utils/jwt");
var bcrypt_1 = __importDefault(require("bcrypt"));
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, emailAlreadyExists, passwordhashed, newUser, omitPassword, userWithoutPassword, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, config_1.default.user.findUnique({
                        where: { email: email },
                    })];
            case 1:
                emailAlreadyExists = _b.sent();
                if (emailAlreadyExists) {
                    return [2 /*return*/, res
                            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                            .json({ msg: "Email already exists" })];
                }
                return [4 /*yield*/, (0, hashPassword_1.hashPassword)(password)];
            case 2:
                passwordhashed = _b.sent();
                return [4 /*yield*/, config_1.default.user.create({
                        data: {
                            email: email,
                            password: passwordhashed,
                        },
                    })];
            case 3:
                newUser = _b.sent();
                omitPassword = newUser.password, userWithoutPassword = __rest(newUser, ["password"]);
                token = (0, jwt_1.createJwt)(String(newUser.id));
                res.status(http_status_codes_1.StatusCodes.CREATED).json({ newUser: userWithoutPassword, token: token });
                return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isPasswordValid, omitPassword, userWithoutPassword, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, config_1.default.user.findUnique({
                        where: { email: email },
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res
                            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                            .json({ msg: "Invalid credentials" })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                isPasswordValid = _b.sent();
                if (!isPasswordValid) {
                    return [2 /*return*/, res
                            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                            .json({ msg: "Invalid credentials" })];
                }
                omitPassword = user.password, userWithoutPassword = __rest(user, ["password"]);
                token = (0, jwt_1.createJwt)(String(user.id));
                res.status(http_status_codes_1.StatusCodes.OK).json({ user: userWithoutPassword, token: token });
                return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                return [4 /*yield*/, config_1.default.user.findMany()];
            case 1:
                user = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json({ user: user });
                return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
//# sourceMappingURL=authController.js.map