"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var projectsController_1 = require("../controllers/projectsController");
var authentication_1 = __importDefault(require("../middleware/authentication"));
router.route("/").get(projectsController_1.getAllProjects);
router.use(authentication_1.default);
router.route("/").post(projectsController_1.createProject);
router.route("/upload").post(projectsController_1.uploadImage);
router.route("/:id").get(projectsController_1.getProject).patch(projectsController_1.updateProject);
exports.default = router;
//# sourceMappingURL=projectRoutes.js.map