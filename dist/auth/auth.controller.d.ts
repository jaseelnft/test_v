import { AuthService } from './auth.service';
import { AdminLoginDto, AdminLoginResDto, CustLoginReqDto, CustLoginResDto, CustOtpReqDto, CustOtpResDto, VerifyAdminDto, VerifyAdminResDto } from './auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    verifyUser(body: CustLoginReqDto): Promise<CustLoginResDto>;
    otpVerification(body: CustOtpReqDto): Promise<CustOtpResDto>;
    adminVerify(body: VerifyAdminDto): Promise<VerifyAdminResDto>;
    adminLogin(body: AdminLoginDto): Promise<AdminLoginResDto>;
}
