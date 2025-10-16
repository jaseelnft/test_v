import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccesLogs, AccesLogsSchema } from './schemas/app.schema';
import { AuthModule } from './auth/auth.module';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB ?? ''),
    MongooseModule.forFeature([
      { name: AccesLogs.name, schema: AccesLogsSchema },
    ]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
