import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupUserDto } from './dto/user_signup.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const { name, email, role } = createUserDto;

    return this.prisma.user.create({
      data: {
        name,
        email,
        role,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id: Number(id) } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id: Number(id) } });
  }

  signupUser(userData: SignupUserDto) {
    const postData = userData.posts?.map((post) => {
      return { title: post?.title, content: post?.content };
    });

    return this.prisma.user.create({
      data: {
        name: userData?.name,
        email: userData.email,
        posts: {
          create: postData,
        },
      },
    });
  }
}
