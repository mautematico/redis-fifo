import Redis = require('ioredis');

export class Fifo {
  private redis: any;
  constructor(private REDIS_URL: string, private name: string) {
    this.redis = new Redis(this.REDIS_URL);
  }

  public async lpop() {
    const item = await this.redis.lpop(this.name);
    return JSON.parse(item);
  }

  public rpush(item: object) {
    return this.redis.rpush(this.name, JSON.stringify(item));
  }

  public async lpopN(n: number): Promise<object[]> {
    const [items] = await this.redis
      .multi()
      .lrange(this.name, 0, n)
      .ltrim(this.name, n, -1)
      .exec();
    return items[1].map(JSON.parse);
  }
}
