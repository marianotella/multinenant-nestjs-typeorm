import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../user/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor (
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn (email: string, pass: string, tenantCode: string) {
    const user = await this.usersService.findOne(email, tenantCode)

    if (user?.password !== pass) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id, email: user.email }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
