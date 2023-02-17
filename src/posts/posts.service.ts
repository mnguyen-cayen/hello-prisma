import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HelpersService } from 'src/helpers/helpers.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService, private helper: HelpersService) {}

  create(createPostDto: CreatePostDto) {
    const { title, content, authorEmail } = createPostDto;
    return this.prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { email: authorEmail },
        },
      },
    });
  }

  findAll(
    includeAuthor = false,
    title?: string,
    content?: string,
    userId?: number,
  ) {
    return this.prisma.post.findMany({
      where: {
        title: { contains: title },
        content: { contains: content },
        authorId: { equals: userId ? +userId : undefined },
      },
      include: { author: this.helper.getBoolean(includeAuthor) },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id: Number(id) } });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id: Number(id) } });
  }

  async togglePublishPost(id: number) {
    const postData = await this.findOne(id);

    return this.update(id, { published: !postData?.published });
  }
}
