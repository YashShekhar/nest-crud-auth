import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  Request,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { User } from 'src/users/entities/users.entity';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Login with email and password',
  })
  @ApiBody({
    type: LoginDto,
  })
  @ApiCreatedResponse({
    description: 'User has been successfully logged in',
    type: LoginResponseDto,
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post()
  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiCreatedResponse({
    description: 'User has bee successfully registered.',
    type: User,
  })
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }
}
