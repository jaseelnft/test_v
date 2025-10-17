"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nodemailer = __importStar(require("nodemailer"));
const app_schema_1 = require("../schemas/app.schema");
const user_schama_1 = require("../schemas/user.schama");
let AuthService = class AuthService {
    custModel;
    accesLogsModel;
    jwtService;
    transporter;
    constructor(custModel, accesLogsModel, jwtService) {
        this.custModel = custModel;
        this.accesLogsModel = accesLogsModel;
        this.jwtService = jwtService;
        this.transporter = nodemailer.createTransport({
            service: process.env.MAILER_SERVER,
            auth: {
                user: process.env.MAILER_MAIL,
                pass: process.env.MAILER_PASSWORD,
            },
        });
    }
    CUST_SECRET = process.env.CUST_JWT_SECRET || '';
    ADMIN_SECRET = process.env.ADMIN_JWT_SECRET || '';
    ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
    _generateOTP() {
        return '000000';
        return Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, '0');
    }
    async _sendOtpMail(name, email, otp) {
        const mailOptions = {
            from: 'jaseel.icb@gmail.com',
            to: email,
            subject: 'Your One-Time Password (OTP) for Verification',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; padding: 24px; background: #fafbfc;">
          <h2 style="color: #333;">ICB Admin Login</h2> // TOTO:
          <p>Hello, ${name}</p>
          <p>Get you OTP Valid for 5 minutes</p>
          <h1>${otp}</h1>
          <p style="margin-top: 16px; color: #888; font-size: 12px;">If you did not request this, please ignore this email.</p>
        </div>
      `,
        };
        await this.transporter.sendMail(mailOptions, (error, info) => {
            if (error)
                return console.log('Error:', error);
            console.log('Email sent:', info.response);
        });
    }
    async custLogin(body) {
        let { email, accesLogId } = body;
        const otp = this._generateOTP();
        await this._sendOtpMail(email.split('@')[0], email, otp);
        const secret = this.CUST_SECRET + otp;
        return {
            token: this.jwtService.sign({ email }, { secret, expiresIn: '5m' }),
        };
    }
    async otpVerification(body) {
        let { token, otp, accesLogId } = body;
        let secret = this.CUST_SECRET + otp;
        try {
            const { email } = this.jwtService.verify(token, { secret });
            let cust = await this.custModel.findOne({ email });
            if (cust) {
                const accesLog = await this.accesLogsModel.findOne({
                    userId: cust._id,
                    registerd: true,
                });
                if (accesLog) {
                    try {
                        let _pl = { _id: new mongoose_2.Types.ObjectId(accesLogId), registerd: false };
                        this.accesLogsModel.findOneAndDelete(_pl).then();
                    }
                    catch (error) { }
                    accesLog.count = accesLog.count + 1;
                    await accesLog.save();
                    accesLogId = String(accesLog._id);
                }
                let secret = this.CUST_SECRET;
                return {
                    registerd: true,
                    accesLogId,
                    token: this.jwtService.sign({ userId: cust._id }, { secret, expiresIn: '31d' }),
                };
            }
            secret = this.CUST_SECRET;
            const _user = { email };
            const user = await this.custModel.create(_user);
            const _token = this.jwtService.sign({ userId: user._id }, { secret, expiresIn: '1d' });
            this.accesLogsModel
                .findByIdAndUpdate(accesLogId, { registerd: true, userId: user._id })
                .then((res) => { })
                .catch((e) => { });
            return { token: _token, accesLogId, registerd: false };
        }
        catch (error) {
            throw new common_1.BadRequestException('Invalid or expired OTP');
        }
    }
    async adminVerify(body) {
        if (body.email === this.ADMIN_EMAIL) {
            const otp = this._generateOTP();
            await this._sendOtpMail('ADMIN', body.email, otp);
            const secret = this.ADMIN_SECRET + otp;
            return { token: this.jwtService.sign({}, { secret, expiresIn: '5m' }) };
        }
        throw new common_1.NotFoundException('Not a valid admin');
    }
    async adminLogin(body) {
        var secret = this.ADMIN_SECRET + body.otp;
        try {
            this.jwtService.verify(body.token, { secret });
            secret = this.ADMIN_SECRET;
            return {
                token: this.jwtService.sign({}, { secret, expiresIn: '1d' }),
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Invalid or expired OTP');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schama_1.Customers.name)),
    __param(1, (0, mongoose_1.InjectModel)(app_schema_1.AccesLogs.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map