import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as nodemailer from 'nodemailer';
require('dotenv').config();

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
import { AccesLogs } from 'src/schemas/app.schema';
import { Customers } from 'src/schemas/user.schama';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Customers.name) private custModel: Model<Customers>,
    @InjectModel(AccesLogs.name) private accesLogsModel: Model<AccesLogs>,
    private jwtService: JwtService,
    private transporter: nodemailer.Transporter,
  ) {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAILER_SERVER,
      auth: {
        user: process.env.MAILER_MAIL,
        pass: process.env.MAILER_PASSWORD,
      },
    });
  }

  private readonly CUST_SECRET = process.env.CUST_JWT_SECRET || '';
  private readonly ADMIN_SECRET = process.env.ADMIN_JWT_SECRET || '';
  private readonly ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';

  _generateOTP() {
    return Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
  }

  async _sendOtpMail(name: string, email: string, otp: string) {
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
      if (error) return console.log('Error:', error);
      console.log('Email sent:', info.response);
    });
  }

  async custLogin(body: CustLoginReqDto): Promise<CustLoginResDto> {
    let { email, accesLogId } = body;

    const otp = this._generateOTP();

    await this._sendOtpMail(email.split('@')[0], email, otp);

    const secret = this.CUST_SECRET + otp;
    return {
      token: this.jwtService.sign({ email }, { secret, expiresIn: '5m' }),
    };
  }

  async otpVerification(body: CustOtpReqDto): Promise<CustOtpResDto> {
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
            let _pl = { _id: new Types.ObjectId(accesLogId), registerd: false };
            this.accesLogsModel.findOneAndDelete(_pl).then();
          } catch (error) {}
          accesLog.count = accesLog.count + 1;
          await accesLog.save();
          accesLogId = String(accesLog._id);
        }
        let secret = this.CUST_SECRET;
        return {
          registerd: true,
          accesLogId,
          token: this.jwtService.sign(
            { userId: cust._id },
            { secret, expiresIn: '31d' },
          ),
        };
      }

      secret = this.CUST_SECRET;
      const _user = { email };
      const user = await this.custModel.create(_user);
      const _token = this.jwtService.sign(
        { userId: user._id },
        { secret, expiresIn: '1d' },
      );

      this.accesLogsModel
        .findByIdAndUpdate(accesLogId, { registerd: true, userId: user._id })
        .then((res) => {})
        .catch((e) => {});

      return { token: _token, accesLogId, registerd: false };
    } catch (error) {
      throw new BadRequestException('Invalid or expired OTP');
    }
  }

  // ////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////

  async adminVerify(body: VerifyAdminDto): Promise<VerifyAdminResDto> {
    if (body.email === this.ADMIN_EMAIL) {
      const otp = this._generateOTP();

      await this._sendOtpMail('ADMIN', body.email, otp);

      const secret = this.ADMIN_SECRET + otp;
      return { token: this.jwtService.sign({}, { secret, expiresIn: '5m' }) };
    }
    throw new NotFoundException('Not a valid admin');
  }

  async adminLogin(body: AdminLoginDto): Promise<AdminLoginResDto> {
    var secret = this.ADMIN_SECRET + body.otp;
    try {
      this.jwtService.verify(body.token, { secret });
      secret = this.ADMIN_SECRET;
      return {
        token: this.jwtService.sign({}, { secret, expiresIn: '1d' }),
      };
    } catch (error) {
      throw new BadRequestException('Invalid or expired OTP');
    }
  }
}
