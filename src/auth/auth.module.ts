import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { AccesLogs, AccesLogsSchema } from 'src/schemas/app.schema';
import { Customers, CustomersSchema } from 'src/schemas/user.schama';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customers.name, schema: CustomersSchema },
      { name: AccesLogs.name, schema: AccesLogsSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
