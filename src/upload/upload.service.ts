import { join } from 'path';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {}

  parseFile(filename: string) {
    const keysWithNumericValues = ['time', 'obs_value'];

    const uploadPath = this.configService.get<string>('UPLOAD_DEST');
    const file = readFileSync(join(process.cwd(), `${uploadPath}/${filename}`));
    const csvData = file.toString();

    const { data, errors, meta } = parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transform(value, field) {
        return keysWithNumericValues.includes(field as string) ? +value : value;
      },
    });

    if (errors.length > 0) console.log(errors);
    console.log(meta);

    return data;
  }
}
