import { TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'

import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { UsersService } from '../user/users.service'
import { testingModule } from '../../../tests/testing.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { usersFixture } from '../user/fixtures/users.fixture'
import { tenancyMiddleware } from '../../tenancy/tenancy.middleware'
import { databaseDestroy } from '../../../tests/test.utils'
import * as request from 'supertest'

describe('AuthController', () => {
  let controller: AuthController
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
      controllers: [AuthController],
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
    controller = module.get<AuthController>(AuthController)
  })

  afterAll(async () => {
    await databaseDestroy()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
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
