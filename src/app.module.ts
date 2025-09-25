import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccesLogs, AccesLogsSchema } from './app.schema';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB ?? ''),
    MongooseModule.forFeature([
      { name: AccesLogs.name, schema: AccesLogsSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
