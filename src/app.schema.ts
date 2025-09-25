import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AccesLogs extends Document {
  @Prop({ type: Number, default: 1 })
  count: number;
  @Prop({ type: String, default: '' })
  ip: string;
  @Prop({ type: String, default: '' })
  origin: string; 
  @Prop({ type: String, default: '' })
  host: string; 
}
export const AccesLogsSchema = SchemaFactory.createForClass(AccesLogs);
