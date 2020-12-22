"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("./patients.json"));
const helper_1 = require("../utils/helper");
const data = patients_json_1.default;
const patientEntries = data.map(obj => {
    const object = helper_1.toNewPatientEntry(obj);
    object.id = obj.id;
    return object;
});
exports.default = patientEntries;
