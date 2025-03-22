import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the post',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'My First Post',
    description: 'The title of the post',
  })
  @Column()
  title: string;

  @ApiProperty({
    example: 'This is th content of my first post.',
    description: 'The content of the post',
  })
  @Column('text')
  content: string;

  @ApiProperty({
    example: 1,
    description: 'The user ID who created the post',
  })
  @Column()
  userId: number;

  @ApiProperty({
    type: () => User,
    description: 'The user who created the post',
  })
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The date when the post was created',
  })
  @CreateDateColumn()
  createdAt: Date;
}
