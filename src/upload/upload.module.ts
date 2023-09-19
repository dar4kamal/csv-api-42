import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';

import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    ConfigModule,
    EventsModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('UPLOAD_DEST'),
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
