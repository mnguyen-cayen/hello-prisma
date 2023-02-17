import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [PrismaModule, HelpersModule],
})
export class PostsModule {}
