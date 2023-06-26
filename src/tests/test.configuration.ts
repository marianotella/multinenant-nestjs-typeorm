import { ConfigurationInterface } from './interfaces'

export const testConfiguration = (): Omit<
  ConfigurationInterface,
  'database'
> => ({
  port: 3000,
  env: 'test',
  jwtSecret: 'JWT_SECRET',
  awsBucketName: 'bucket_test',
  awsRegion: 'region_test',
  awsAccesKeyId: 'access_key_id_test',
  awsSecretAccessKey: 'secret_access_key_test'
})
