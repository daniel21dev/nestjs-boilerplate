import { Prisma, PrismaClient } from '@prisma/client';

export class PostCrud {
  constructor(private prisma: PrismaClient) {}

  create(data: Prisma.PostCreateInput) {
    return this.prisma.post.create({ data });
  }

  find(args: Prisma.PostFindManyArgs) {
    return this.prisma.post.findMany(args);
  }

  findOne(where: Prisma.PostWhereUniqueInput) {
    return this.prisma.post.findUnique({ where });
  }

  update(where: Prisma.PostWhereUniqueInput, data: Prisma.PostUpdateInput) {
    return this.prisma.post.update({
      where,
      data,
    });
  }

  delete(where: Prisma.PostWhereUniqueInput) {
    return this.prisma.post.delete({ where });
  }
}
