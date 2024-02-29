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
exports.Others = exports.StartActions = exports.ImageOperations = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const moment_1 = __importDefault(require("moment"));
const slugify_1 = __importDefault(require("slugify"));
const cloudinary_1 = require("cloudinary");
const fs = require("fs");
class ImageOperations {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: 'ahmed-zakys',
            api_key: '657617286879229',
            api_secret: 'AVjsexl9m9dmlnO3Th0iW2Sn5yQ'
        });
    }
    uploadFilesCloud(file, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            if (Array.isArray(file)) {
                for (let x = 0; x < file.length; x++) {
                    result.push(yield cloudinary_1.v2.uploader.upload(file[x].filePath, { folder: `Ecommerce/${folder}` }));
                    fs.unlink(file[x].filePath, (err) => { if (err)
                        throw new Error(err.message); });
                }
            }
            else {
                result = yield cloudinary_1.v2.uploader.upload(file.filePath, { folder: `Ecommerce/${folder}` });
                fs.unlink(file.filePath, (err) => { if (err)
                    throw new Error(err.message); });
            }
            return result;
        });
    }
    deleteFilesCloud(publicId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            if (Array.isArray(publicId)) {
                result = cloudinary_1.v2.api.delete_resources(publicId);
            }
            else {
                result = cloudinary_1.v2.uploader.destroy(publicId);
            }
            return result;
        });
    }
    formateImage(file, dimensions) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = Date.now() + "_" + file.originalname;
            let filePath = path_1.default.join(__dirname, "../../assets/" + fileName);
            let fileFormate = yield (0, sharp_1.default)(file.buffer).resize(dimensions.width, dimensions.height).toFormat("jpg", { quality: 90 }).toFile(filePath);
            return Object.assign(Object.assign({}, fileFormate), { fileName, filePath });
        });
    }
    formateImages(files, dimensions) {
        return __awaiter(this, void 0, void 0, function* () {
            let filesFormate = [];
            for (let i = 0; i < files.length; i++) {
                const fileName = Date.now() + "_" + files[i].originalname;
                let filePath = path_1.default.join(__dirname, "../../assets/" + fileName);
                let fileFormate = yield (0, sharp_1.default)(files[i].buffer).resize(dimensions.width, dimensions.height).toFormat("jpg", { quality: 90 }).toFile(filePath);
                filesFormate.push(Object.assign(Object.assign({}, fileFormate), { filePath, fileName }));
            }
            return filesFormate;
        });
    }
    uploadMulter() {
        const storage = multer_1.default.memoryStorage();
        const fileFilter = (req, file, cb) => {
            if (!file.mimetype.startsWith("image")) {
                cb({
                    message: "unsupported file form",
                    status: 400,
                }, false);
            }
            else {
                cb(null, true);
            }
        };
        return (0, multer_1.default)({
            storage: storage,
            fileFilter: fileFilter,
            limits: { fileSize: 1024 * 1024 * 2 },
        });
    }
}
exports.ImageOperations = ImageOperations;
class StartActions {
    startFunctionForDashboard(req, res, url, csrfToken) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    startFunctionForSite(req, res, url, csrfToken) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.StartActions = StartActions;
class Others {
    getSumOfArray(array) {
        let totalRate = 0;
        array.forEach((ele) => {
            totalRate += ele.rate;
        });
        return totalRate;
    }
    formateDate(date, type = "date") {
        if (type == "date") {
            return (0, moment_1.default)(date).format("YYYY-MM-DD");
        }
        else if ("hour") {
            return (0, moment_1.default)(date).format("hh-mm-ss");
        }
    }
    checkIfExist(id, table) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield table.findOne({
                _id: id,
            });
            if (document) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    sortDocs(sort) {
        return __awaiter(this, void 0, void 0, function* () {
            let sortObject = {};
            if (sort) {
                let sortArray = sort.split(",");
                for (let i = 0; i < sortArray.length; i++) {
                    sortObject[sortArray[i].split("@")[0]] = +sortArray[i].split("@")[1];
                }
                return sortObject;
            }
            return { _id: 1 };
        });
    }
    makeSlug(string) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, slugify_1.default)(string, {
                remove: /[$*_+~.()'"!\-:@]+/g,
            });
        });
    }
    sanitizeQuery(query, sanitize) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryObject = {};
            sanitize.forEach((ele) => {
                if (query[ele] && !["limit", "page", "sort"].includes(ele)) {
                    queryObject[ele] = query[ele];
                }
            });
            queryObject = JSON.stringify(queryObject);
            queryObject = queryObject.replace(/\b(gte|gt|lte|lt|regex)\b/g, (match => `$${match}`));
            queryObject = JSON.parse(queryObject);
            return queryObject;
        });
    }
}
exports.Others = Others;
