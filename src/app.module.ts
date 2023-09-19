import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UploadModule } from './upload/upload.module';

@Module({
  imports: [ConfigModule.forRoot(), UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
