import { Fifo } from '../src/fifo';

const REDIS_URL = <any>process.env['REDIS_URL'];

test('Should lpopN return a Promise<array>', async () => {
  const fifo = new Fifo(REDIS_URL, 'fifo_test');
  expect(await fifo.lpopN(10)).toBeInstanceOf(Array);
});
