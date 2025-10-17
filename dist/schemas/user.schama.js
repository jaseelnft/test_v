"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersSchema = exports.Customers = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Customers = class Customers {
    name;
    email;
    phone;
    isEmail;
    isPhone;
};
exports.Customers = Customers;
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Customers.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        sparse: true,
    }),
    __metadata("design:type", String)
], Customers.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Customers.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Customers.prototype, "isEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Customers.prototype, "isPhone", void 0);
exports.Customers = Customers = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Customers);
exports.CustomersSchema = mongoose_1.SchemaFactory.createForClass(Customers);
//# sourceMappingURL=user.schama.js.map