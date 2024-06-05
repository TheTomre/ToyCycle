import dotenv from 'dotenv'
import { cleanEnv, num, str, bool } from 'envalid'

// Ensure the test environment file is prioritized during tests
const envFile = `.env.${process.env.NODE_ENV}.local`
dotenv.config({ path: [envFile, '.env'] })

const env = cleanEnv(process.env, {
  PORT: num(),
  MONGODB_URI: str(),
  MONGODB_DATABASE_NAME: str({ default: 'test' }),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  JWT_SECRET: str(),
  RUN_DB_LOGS: bool({ default: false }),
})

export default env
