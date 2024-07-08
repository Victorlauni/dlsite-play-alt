import { createClient, RedisClientType } from 'redis';

export class RedisClient {
  private static client: RedisClientType<Record<any, any>, Record<any, any>, any>;
  public static async getRedisClient() {
    if (this.client === undefined) {
      this.client = await createClient({
        url: 'redis://@localhost:6379',
      })
        .on('error', (err) => console.log('Redis Client Error', err))
        .connect();
    }
    return this.client;
  }
}
