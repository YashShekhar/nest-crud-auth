import { ApiProperty } from '@nestjs/swagger';

class UserInfo {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the user',
  })
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'john@example.com',
  })
  email: string;
}

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT Access Token',
  })
  access_token: string;

  @ApiProperty({
    description: 'User Information',
    type: UserInfo,
  })
  user: UserInfo;
}
