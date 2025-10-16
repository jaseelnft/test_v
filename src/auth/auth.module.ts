import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Users, UsersSchema } from 'src/schemas/users.schema';

import { MailerModule } from 'src/mailer/mailer.module';
import { AccesLogs, AccesLogsSchema } from 'src/schemas/app.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: AccesLogs.name, schema: AccesLogsSchema },
    ]),
    MailerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
