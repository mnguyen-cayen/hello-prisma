import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';

export class SignupUserDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: Role;

  @ApiProperty({ required: false, type: [CreatePostDto] })
  posts?: CreatePostDto[];
}
