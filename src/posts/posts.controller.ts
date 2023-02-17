import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PostEntity } from './entities/post.entity';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiCreatedResponse({ type: PostEntity })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOkResponse({ type: PostEntity, isArray: true })
  @ApiQuery({
    name: 'includeAuthor',
    type: Boolean,
    description: 'Show user info on author. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'title',
    type: String,
    description: 'Filter by title. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'content',
    type: String,
    description: 'Filter by content. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'userId',
    type: Number,
    description: 'Filter by userId. Optional',
    required: false,
  })
  findAll(
    @Query('includeAuthor') includeAuthor?: boolean | null,
    @Query('title') title?: string,
    @Query('content') content?: string,
    @Query('userId') userId?: number,
  ) {
    return this.postsService.findAll(includeAuthor, title, content, userId);
  }

  @Get(':id')
  @ApiOkResponse({ type: PostEntity })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PostEntity })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PostEntity })
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  @Put(':id/publish')
  @ApiOkResponse({ type: PostEntity })
  togglePublishPost(@Param('id') id: string) {
    return this.postsService.togglePublishPost(+id);
  }
}
