import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    const post = this.postsRepository.create({
      ...createPostDto,
      userId,
    });

    return this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['user'],
      select: {
        user: {
          id: true,
          name: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        user: {
          id: true,
          name: true,
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    userId: number,
  ): Promise<Post> {
    await this.findOneByIdAndUserId(id, userId);
    await this.postsRepository.update(
      {
        id,
        userId,
      },
      updatePostDto,
    );

    return this.findOne(id);
  }

  async remove(
    id: number,
    userId: number,
  ): Promise<{
    id: number;
  }> {
    await this.findOneByIdAndUserId(id, userId);
    await this.postsRepository.delete({
      id,
      userId,
    });
    return { id };
  }

  private async findOneByIdAndUserId(
    id: number,
    userId: number,
  ): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!post) {
      throw new NotFoundException(
        `Post with ID ${id} not found or you don't have permission to access it`,
      );
    }
    return post;
  }
}
