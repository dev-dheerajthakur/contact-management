import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ContactsModule,
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      inject:  [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
        autoIndex:  true
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
