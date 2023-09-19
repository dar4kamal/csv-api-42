import {
  Post,
  Controller,
  UploadedFile,
  ParseFilePipe,
  UseInterceptors,
  FileTypeValidator,
} from '@nestjs/common';
import { chunk } from 'lodash';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileInterceptor } from '@nestjs/platform-express';

import { UploadService } from './upload.service';
import InsertBatchEvent from 'src/events/insert-batch.event';

@Controller('upload')
export class UploadController {
  constructor(
    private eventEmitter: EventEmitter2,
    private configService: ConfigService,
    private uploadService: UploadService,
  ) {}

  @Post('csv')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'text/csv' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);

    const data = this.uploadService.parseFile(file.filename);
    console.log(data.length);

    const dataChunks = chunk(
      data,
      this.configService.get<number>('BATCH_SIZE'),
    );

    dataChunks.forEach((batch, idx) => {
      this.eventEmitter.emit('insert.batch', new InsertBatchEvent(idx, batch));
    });

    return 'File has been uploaded successfully';
  }
}
