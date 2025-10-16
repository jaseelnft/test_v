import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Customers {
  @Prop({ type: String })
  name: string;
  @Prop({
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    sparse: true,
  })
  email: string;
  @Prop({ type: String })
  phone: string;
}

export const CustomersSchema = SchemaFactory.createForClass(Customers);