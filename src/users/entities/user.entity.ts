import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  name: string | null;

  @ApiProperty()
  role: Role;
}
