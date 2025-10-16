export declare class CustLoginReqDto {
    email: string;
    accesLogId: string;
}
export interface CustLoginResDto {
    token: string;
}
export declare class CustOtpReqDto {
    token: string;
    otp: string;
    accesLogId: string;
}
export interface CustOtpResDto {
    token: string;
    registerd: boolean;
    accesLogId?: string;
}
export declare class VerifyAdminDto {
    email: string;
}
export declare class AdminLoginDto {
    otp: string;
    token: string;
}
export declare class VerifyAdminResDto {
    token: string;
}
export declare class AdminLoginResDto {
    token: string;
}
