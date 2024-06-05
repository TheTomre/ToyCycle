## Install instructions

### create files based on `example.env.local`
- `.env.test.local`
- `.env.development.local`

### Optional docker-compose available
see package.json
- recommended run `pnpm run docker:clean-start`

### Drizzle setup
- run `pnpm run drizzle:create-migrations` if no migrations provided (should be a folder)
- run `pnpm run drizzle:staging:run-migrations`

### Run `pnpm run dev`

### Open `/api-docs` for swagger docs

### Project Characterization (will update as needed over time)
[characterization](./assets/characterization.md)