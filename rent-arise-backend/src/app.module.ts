import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
