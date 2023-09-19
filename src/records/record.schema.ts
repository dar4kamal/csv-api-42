import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Record extends Document {
  @Prop({ type: String, index: true })
  ref_area: string;

  @Prop({ type: String })
  indicator: string;

  @Prop({ type: String })
  source: string;

  @Prop({ type: String, index: true })
  sex: string;

  @Prop({ type: String, index: true })
  classif1: string;

  @Prop({ type: Number, index: true })
  time: number;

  @Prop({ type: Number })
  obs_value: number;

  @Prop({ type: String })
  obs_status: string;

  @Prop({ type: String })
  note_classif: string;

  @Prop({ type: String })
  note_indicator: string;

  @Prop({ type: String })
  note_source: string;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
