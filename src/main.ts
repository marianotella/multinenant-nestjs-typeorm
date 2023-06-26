import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { tenancyMiddleware } from './modules/tenancy/tenancy.middleware'
import { ConfigService } from '@nestjs/config'
import { runMigrations } from './configuration/database/migrations'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  await runMigrations()

  app.use(tenancyMiddleware)

  await app.listen(configService.get('PORT'))

  console.info(
    'Application is running on: http://localhost:' + configService.get('PORT')
  )
}

bootstrap()
