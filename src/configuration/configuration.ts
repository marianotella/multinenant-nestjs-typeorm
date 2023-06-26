import { ConfigurationInterface } from '../interfaces/configuration.interface'
import { TenantMode } from '../modules/tenancy/tenancy.middleware'

export const configuration = (): ConfigurationInterface => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET,
  env: process.env.ENVIRONMENT,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  },
  awsBucketName: process.env.AWS_S3_BUCKET_NAME,
  awsRegion: process.env.AWS_REGION,
  awsAccesKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  tenantMode: (process.env.TENANT_MODE as TenantMode) || TenantMode.SUBDOMAIN
})
