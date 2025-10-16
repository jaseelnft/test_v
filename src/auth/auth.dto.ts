import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CustLoginReqDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  accesLogId: string;
}

export interface CustLoginResDto {
  token: string;
}

export class CustOtpReqDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsOptional()
  @IsString()
  accesLogId: string;
}

export interface CustOtpResDto {
  token: string;
  registerd: boolean;
  accesLogId?: string;
}

export class VerifyAdminDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class AdminLoginDto {
  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}

export class VerifyAdminResDto {
  token: string;
}

export class AdminLoginResDto {
  token: string;
}
