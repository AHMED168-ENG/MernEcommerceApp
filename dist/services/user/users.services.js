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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../../model/users"));
const config_1 = require("../../config/config");
const helper_1 = require("../../helper/helper");
const ErrorBuilder_1 = __importDefault(require("../../helper/ErrorBuilder"));
const http_status_1 = __importDefault(require("http-status"));
class UserService {
    generateToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign({ id }, config_1.Config.SECRET_KEY, { expiresIn: "1d" });
        });
    }
    refreshToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign({ id }, config_1.Config.SECRET_KEY, { expiresIn: "3d" });
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.default.create(body);
            return user;
        });
    }
    updateOne(_id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.default.findOneAndUpdate({ _id }, body, { new: true });
            return user;
        });
    }
    find(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.default.paginate({ limit, page, select: { password: 0 } });
            return user;
        });
    }
    findWithEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.default.findOne({ email });
            return user;
        });
    }
    findWithQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.default.find(query, { password: 0 });
            return user;
        });
    }
    findOne(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.default.findOne({ _id }, { password: 0 });
            return user;
        });
    }
    findWishList(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.default.findOne({ _id }, { password: 0 }).populate("wishlist");
            return user;
        });
    }
    deleteOne(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.default.deleteOne({ _id });
            return user;
        });
    }
    updatePassword(password, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.default.findOne({ _id });
            user.password = password;
            return user.save();
        });
    }
    activeMyAccount(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.updateOne(_id, { active: true });
        });
    }
    uploadImage(file, dimension, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file)
                throw (0, ErrorBuilder_1.default)(http_status_1.default.FORBIDDEN, "chose your user image");
            let user = yield this.findOne(id);
            let imageOperations = new helper_1.ImageOperations();
            let imagesFormate = yield imageOperations.formateImage(file, { width: +dimension.width, height: +dimension.height });
            let imagesCloud = yield imageOperations.uploadFilesCloud(imagesFormate, "user");
            let publicId = user.image.public_id;
            if (publicId)
                yield imageOperations.deleteFilesCloud(publicId);
            let image = { url: imagesCloud.url, public_id: imagesCloud.public_id };
            return yield this.updateOne(id, { $set: { image: image } });
        });
    }
}
exports.default = UserService;
