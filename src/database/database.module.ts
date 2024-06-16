import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_DB_CONN_STRING)],
  providers: [PrismaService],
})
export class DatabaseModule {}
