import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { PostCrud } from '../../../prisma/crud-classes/PostCrud';

@Injectable()
export class PostsService extends PostCrud {
  constructor(protected prismaService: PrismaService) {
    super(prismaService);
  }
}
