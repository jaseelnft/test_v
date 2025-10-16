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
exports.AdminLoginResDto = exports.VerifyAdminResDto = exports.AdminLoginDto = exports.VerifyAdminDto = exports.CustOtpReqDto = exports.CustLoginReqDto = void 0;
const class_validator_1 = require("class-validator");
class CustLoginReqDto {
    email;
    accesLogId;
}
exports.CustLoginReqDto = CustLoginReqDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CustLoginReqDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustLoginReqDto.prototype, "accesLogId", void 0);
class CustOtpReqDto {
    token;
    otp;
    accesLogId;
}
exports.CustOtpReqDto = CustOtpReqDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CustOtpReqDto.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CustOtpReqDto.prototype, "otp", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustOtpReqDto.prototype, "accesLogId", void 0);
class VerifyAdminDto {
    email;
}
exports.VerifyAdminDto = VerifyAdminDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VerifyAdminDto.prototype, "email", void 0);
class AdminLoginDto {
    otp;
    token;
}
exports.AdminLoginDto = AdminLoginDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminLoginDto.prototype, "otp", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminLoginDto.prototype, "token", void 0);
class VerifyAdminResDto {
    token;
}
exports.VerifyAdminResDto = VerifyAdminResDto;
class AdminLoginResDto {
    token;
}
exports.AdminLoginResDto = AdminLoginResDto;
//# sourceMappingURL=auth.dto.js.map