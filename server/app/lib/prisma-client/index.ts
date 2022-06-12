import { PrismaClient, Prisma } from '@prisma/client';

const LOG_QUERY_TIME = false;
const LOG_QUERIES = false;

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

prisma.$use(async (params: Prisma.MiddlewareParams, next: any) => {
  try {
    if (LOG_QUERY_TIME) {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
      return result;
    }
    const result = await next(params);
    return result;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(err.code);
      console.log(params.args);
      console.log(params.dataPath);
      console.log(params.action);
      throw new Error();
    }
    console.error(err);
  }
});

prisma.$on('query', (event: Prisma.QueryEvent) => {
  if (event.query === 'COMMIT' || event.query === 'BEGIN') {
    return;
  }
  if (LOG_QUERIES) {
    console.log(event.query);
  }
});

export default prisma;
