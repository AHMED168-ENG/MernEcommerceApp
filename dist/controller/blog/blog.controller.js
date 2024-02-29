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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const helper_1 = require("../../helper/helper");
const blog_services_1 = __importDefault(require("../../services/blog/blog.services"));
class BlogController {
    constructor() { }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const blogService = new blog_services_1.default();
                const others = new helper_1.Others();
                body.slug = yield others.makeSlug(body.title);
                const blog = yield blogService.create(body);
                return res.status(http_status_1.default.CREATED).json(blog);
            }
            catch (error) {
                next(error);
            }
        });
    }
    find(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query;
                const blogService = new blog_services_1.default();
                const blogs = yield blogService.find(query, ["title", "brand"]);
                return res.status(http_status_1.default.OK).json(blogs);
            }
            catch (error) {
                next(error);
            }
        });
    }
    findOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const blogService = new blog_services_1.default();
                const blog = yield blogService.findOne(id);
                return res.status(http_status_1.default.OK).json({
                    blog,
                    success: true
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { body } = req;
                const others = new helper_1.Others();
                body.slug = yield others.makeSlug(body.title);
                const blogService = new blog_services_1.default();
                const blog = yield blogService.updateOne(id, body);
                return res.status(http_status_1.default.OK).json(blog);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const blogService = new blog_services_1.default();
                yield blogService.deleteOne(id);
                return res.status(http_status_1.default.OK).json({
                    success: true
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    changeBlogViewNumber(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { blogsId } = req.body;
                const { id } = req.user;
                const blogService = new blog_services_1.default();
                yield blogService.changeBlogViews(blogsId, id);
                return res.status(http_status_1.default.OK).json({
                    success: true,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    likesAndDislike(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = req.user.id;
                const { isLiked, isDisLiked } = req.body;
                const blogService = new blog_services_1.default();
                yield blogService.likesAndDislike(id, isLiked, isDisLiked, userId);
                return res.status(http_status_1.default.OK).json({
                    success: true,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    activationBlog(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const blogService = new blog_services_1.default();
                let blog = yield blogService.findOne(id);
                let newBlog = yield blogService.activation(id, { active: !blog.active });
                return res.status(http_status_1.default.OK).json(newBlog);
            }
            catch (error) {
                next(error);
            }
        });
    }
    uploadImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { files } = req;
                const { width, height } = req.body;
                const blogService = new blog_services_1.default();
                let blog = yield blogService.uploadImage(files, { width, height }, id);
                return res.status(http_status_1.default.OK).json(blog);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = BlogController;
