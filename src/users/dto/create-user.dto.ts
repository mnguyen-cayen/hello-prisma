import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: Role;
}
