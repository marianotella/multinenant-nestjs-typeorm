export interface Fixture {
  entity: any;
  data: any[];
}

export interface ConfigurationInterface {
  port: number;
  jwtSecret: string;
  env: string;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  awsBucketName: string;
  awsRegion: string;
  awsAccesKeyId: string;
  awsSecretAccessKey: string;
  tenantMode: string;
}
