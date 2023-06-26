import { TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { AuthService } from '../auth/auth.service'
import { testingModule } from '../../../tests/testing.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { usersFixture } from './fixtures/users.fixture'
import { databaseDestroy } from '../../../tests/test.utils'
import * as request from 'supertest'
import { tenancyMiddleware } from '../../tenancy/tenancy.middleware'

describe('UserController', () => {
  let authService: AuthService
  let httpServer: unknown
  let token: string

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
      controllers: [UsersController],
      exports: [AuthService],
      fixtures: usersFixture
    })

    const app = module.createNestApplication()

    app.use(tenancyMiddleware)

    await app.init()
    httpServer = app.getHttpServer()
    authService = module.get<AuthService>(AuthService)
    const result = await authService.signIn(
      'marianotellaeche@gmail.com',
      'njl',
      'njl'
    )

    token = result.access_token
  })

  afterAll(async () => {
    await databaseDestroy()
  })

  describe('login', () => {
    it('should return an access token for this user', async () => {
      const res = await request(httpServer)
        .post('/auth/login')
        .send({
          email: 'marianotellaeche@gmail.com',
          password: 'njl'
        })
        .set('X-TENANT-CODE', 'njl')
        .expect(200)

      expect(res.body).toStrictEqual({
        access_token: expect.any(String)
      })
    })
  })
})
