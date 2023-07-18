"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
// import cookieParser from 'cookie-parser'             
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
var not_found_1 = __importDefault(require("./middleware/not-found"));
var error_handler_1 = __importDefault(require("./middleware/error-handler"));
var dotenv_1 = require("dotenv");
require("express-async-errors");
var express_fileupload_1 = __importDefault(require("express-fileupload"));
(0, dotenv_1.config)();
var app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)());
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1/project', projectRoutes_1.default);
app.use(not_found_1.default);
app.use(error_handler_1.default);
var port = process.env.PORT || 3000;
var start = function () {
    try {
        app.listen(port, function () {
            return console.log("Server is listening on port ".concat(port, "..."));
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=app.js.map