import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for a user',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  @Column({ unique: true })
  email: string;

  @ApiHideProperty()
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The date when the user was created',
  })
  createAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
