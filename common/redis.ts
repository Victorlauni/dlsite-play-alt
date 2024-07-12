import { createClient, RedisClientType } from 'redis';

export class RedisClient {
  private static client: RedisClientType<Record<any, any>, Record<any, any>, any>;
  public static async getRedisClient() {
    if (this.client === undefined) {
      this.client = await createClient({
        url: process.env.REDIS,
      })
        .on('error', (err) => console.log('Redis Client Error', err))
        .connect();
    }
    return this.client;
  }
}
