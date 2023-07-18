"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var custom_api_1 = __importDefault(require("./custom-api"));
var unauthenticated_1 = __importDefault(require("./unauthenticated"));
var not_found_1 = __importDefault(require("./not-found"));
var bad_request_1 = __importDefault(require("./bad-request"));
var unauthorized_1 = __importDefault(require("./unauthorized"));
exports.default = {
    CustomAPIError: custom_api_1.default,
    UnauthenticatedError: unauthenticated_1.default,
    NotFoundError: not_found_1.default,
    BadRequestError: bad_request_1.default,
    UnauthorizedError: unauthorized_1.default,
};
//# sourceMappingURL=index.js.map