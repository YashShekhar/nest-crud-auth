import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Post as PostEntity } from './entities/post.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a new post',
  })
  @ApiCreatedResponse({
    description: 'The post has been successfully created',
    type: PostEntity,
  })
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.create(createPostDto, req.user.id);
  }

  @ApiOperation({
    summary: 'Get all posts',
  })
  @ApiOkResponse({
    description: 'Returns all posts',
    type: [PostEntity],
  })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({
    summary: 'Get a post by id',
  })
  @ApiOkResponse({
    description: 'Returns a by id',
    type: PostEntity,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update a post',
  })
  @ApiOkResponse({
    description: 'The post has been successfully updated.',
    type: PostEntity,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req,
  ) {
    return this.postsService.update(+id, updatePostDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete a post',
  })
  @ApiOkResponse({
    description: 'The post has been successfully deleted.',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: 1,
        },
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.postsService.remove(+id, req.user.id);
  }
}
