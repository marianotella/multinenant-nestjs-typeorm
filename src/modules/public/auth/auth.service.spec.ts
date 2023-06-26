import { TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { testingModule } from '../../../tests/testing.module'
import { usersFixture } from '../user/fixtures/users.fixture'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersService } from '../user/users.service'
import { databaseDestroy } from '../../../tests/test.utils'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await testingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('jwtSecret'),
            signOptions: { expiresIn: '24h' }
          }),
          inject: [ConfigService]
        })
      ],
      providers: [AuthService, UsersService],
      fixtures: usersFixture
    })

    service = module.get<AuthService>(AuthService)
  })

  afterAll(async () => {
    await databaseDestroy()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be defined', async () => {
    try {
      const { access_token: accessToken } = await service.signIn(
        'marianotellaeche@gmail.com',
        'njl',
        'njl'
      )

      expect(accessToken).toStrictEqual(expect.any(String))
    } catch (e) {
      expect(e).toBeFalsy()
    }
  })
})
