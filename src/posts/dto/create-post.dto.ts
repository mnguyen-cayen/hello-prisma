import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  content?: string;

  @ApiProperty({ required: false })
  authorEmail?: string;

  @ApiProperty()
  published: boolean;
}
