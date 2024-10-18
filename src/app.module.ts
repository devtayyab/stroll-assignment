import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { QuestionModule } from './question/question.module';
import { CycleModule } from './cycle/cycle.module';
import { AssignmentModule } from './assignment/assignment.module';
import { CacheModule } from '@nestjs/cache-manager';
// Import redisStore correctly
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore as any, // Use redisStore as the store type
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        ttl: configService.get<number>('CACHE_TTL'),
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    QuestionModule,
    CycleModule,
    AssignmentModule,
  ],
})
export class AppModule {}
