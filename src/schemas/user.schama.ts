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
  @Prop({ type: Boolean, default: false })
  isEmail: boolean;
  @Prop({ type: Boolean, default: false })
  isPhone: boolean;
}

export const CustomersSchema = SchemaFactory.createForClass(Customers);
