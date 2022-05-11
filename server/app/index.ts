import 'dotenv/config';
import Koa from 'koa';

const app = new Koa();
const PORT = process.env.PORT || 3001;

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
