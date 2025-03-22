import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'My First Post',
    description: 'The title of the post',
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    example: 'This is the content of my first post',
    description: 'The content of the post',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
