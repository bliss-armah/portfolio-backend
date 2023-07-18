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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.updateProject = exports.getProject = exports.getAllProjects = exports.createProject = void 0;
var config_1 = __importDefault(require("../config"));
var http_status_codes_1 = require("http-status-codes");
var getAllProjects = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projects;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, config_1.default.project.findMany({
                    orderBy: {
                        createdAt: "desc",
                    }
                })];
            case 1:
                projects = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json({ data: projects });
                return [2 /*return*/];
        }
    });
}); };
exports.getAllProjects = getAllProjects;
var getProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, id, project;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.userId;
                id = req.params.id;
                return [4 /*yield*/, config_1.default.project.findMany({
                        where: {
                            id: Number(id),
                            creatorId: Number(userId),
                        },
                    })];
            case 1:
                project = _a.sent();
                // if (project.length < 1) {
                //   return res
                //     .status(StatusCodes.NOT_FOUND)
                //     .json({ msg: `No project found with id: ${id}` });
                // }
                if (!project) {
                    return [2 /*return*/, res
                            .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                            .json({ msg: "No project found with id: ".concat(id) })];
                }
                res.status(http_status_codes_1.StatusCodes.OK).json({ data: project });
                return [2 /*return*/];
        }
    });
}); };
exports.getProject = getProject;
var createProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var createdBy, job;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                createdBy = {
                    connect: { id: Number(req.user.userId) },
                };
                req.body.createdby = createdBy;
                return [4 /*yield*/, config_1.default.project.create({
                        data: req.body,
                    })];
            case 1:
                job = _a.sent();
                if (!job) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: 'Project creation failed' });
                }
                res.status(http_status_codes_1.StatusCodes.CREATED).json({ data: job });
                return [2 /*return*/];
        }
    });
}); };
exports.createProject = createProject;
var updateProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, id, findProject, project;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.userId;
                id = req.params.id;
                return [4 /*yield*/, config_1.default.project.findUnique({
                        where: {
                            id: Number(id),
                        },
                        include: {
                            createdby: {
                                select: {
                                    id: true,
                                },
                            },
                        },
                    })];
            case 1:
                findProject = _a.sent();
                if (!findProject) {
                    return [2 /*return*/, res
                            .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                            .json({ msg: "This project does not exist" })];
                }
                if ((findProject === null || findProject === void 0 ? void 0 : findProject.createdby.id) !== Number(userId)) {
                    return [2 /*return*/, res
                            .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                            .json({ msg: "You're not eligible to update this project" })];
                }
                return [4 /*yield*/, config_1.default.project.update({
                        where: {
                            id: Number(id),
                            // creatorId: Number(userId),
                        },
                        data: req.body,
                    })];
            case 2:
                project = _a.sent();
                if (project) {
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json({ data: project })];
                }
                res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ msg: "No project found with id: ".concat(id) });
                return [2 /*return*/];
        }
    });
}); };
exports.updateProject = updateProject;
var uploadImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log(req.files);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: "Uploading image" });
        return [2 /*return*/];
    });
}); };
exports.uploadImage = uploadImage;
//# sourceMappingURL=projectsController.js.map