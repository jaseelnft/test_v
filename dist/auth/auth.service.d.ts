import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { AdminLoginDto, AdminLoginResDto, CustLoginReqDto, CustLoginResDto, CustOtpReqDto, CustOtpResDto, VerifyAdminDto, VerifyAdminResDto } from './auth.dto';
import { AccesLogs } from 'src/schemas/app.schema';
import { Customers } from 'src/schemas/user.schama';
export declare class AuthService {
    private custModel;
    private accesLogsModel;
    private jwtService;
    private transporter;
    constructor(custModel: Model<Customers>, accesLogsModel: Model<AccesLogs>, jwtService: JwtService, transporter: nodemailer.Transporter);
    private readonly CUST_SECRET;
    private readonly ADMIN_SECRET;
    private readonly ADMIN_EMAIL;
    _generateOTP(): string;
    _sendOtpMail(name: string, email: string, otp: string): Promise<void>;
    custLogin(body: CustLoginReqDto): Promise<CustLoginResDto>;
    otpVerification(body: CustOtpReqDto): Promise<CustOtpResDto>;
    adminVerify(body: VerifyAdminDto): Promise<VerifyAdminResDto>;
    adminLogin(body: AdminLoginDto): Promise<AdminLoginResDto>;
}
