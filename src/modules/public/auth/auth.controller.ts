import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from './public.decorator'

@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn (
    @Body() signInDto: Record<string, any>,
    @Request() { tenantCode }
  ): any {
    return this.authService.signIn(
      signInDto.email,
      signInDto.password,
      tenantCode
    )
  }

  @Get('profile')
  getProfile (@Request() req: any) {
    return req.user
  }
}
