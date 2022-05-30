const config = {
  IMDB_API_KEY: process.env.IMDB_API_KEY,
};

Object.keys(config).forEach((key) => {
  const castedKey = key as keyof typeof config;
  if (config[castedKey] === undefined) {
    throw new Error(`env var missing for ${key}`);
  }
});
console.log('Config loaded');

export default config;
