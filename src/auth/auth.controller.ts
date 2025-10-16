import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import {
  AdminLoginDto,
  AdminLoginResDto,
  CustLoginReqDto,
  CustLoginResDto,
  CustOtpReqDto,
  CustOtpResDto,
  VerifyAdminDto,
  VerifyAdminResDto,
} from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('cust/verify')
  async verifyUser(@Body() body: CustLoginReqDto): Promise<CustLoginResDto> {
    return this.authService.custLogin(body);
  }

  @Post('cust/login')
  async otpVerification(@Body() body: CustOtpReqDto): Promise<CustOtpResDto> {
    return this.authService.otpVerification(body);
  }

  // ///////////////////////////////////////

  @Post('admin/verify')
  async adminVerify(@Body() body: VerifyAdminDto): Promise<VerifyAdminResDto> {
    return this.authService.adminVerify(body);
  }

  @Post('admin/login')
  async adminLogin(@Body() body: AdminLoginDto): Promise<AdminLoginResDto> {
    return this.authService.adminLogin(body);
  }
}
