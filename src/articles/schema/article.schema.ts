import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTimestampsConfig } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article> &
  SchemaTimestampsConfig;

@Schema({
  timestamps: true,
})
export class Article {
  _id: mongoose.Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  author: number; // user id
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
