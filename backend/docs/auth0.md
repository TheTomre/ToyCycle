# Auth0 authentication

## Configuration

1. Register at auth0.com
2. Create application
3. Configure application
   - Ensure to whitelist `AUTH0_CALLBACK_URL`
4. Copy configuration to `.env` file:
   - `AUTH0_CLIENT_ID`
   - `AUTH0_CLIENT_SECRET`
   - `AUTH0_DOMAIN`
5. Configure other environment variables:
   - `AUTH0_CALLBACK_URL` - Point it to the `/callback` route of the auth0 router
   - `AUTH0_RETURN_URL` - Point it to frontend application
6. Select secrets:
   - `JWT_SECRET` - Random string
   - `SESSION_SECRET` - Random string
7. Optionally add admin e-mails:
   - `ADMIN_EMAIL` - Comma-separated list of e-mails

## Routes

- `/callback` - Exchanges auth0 authentication for jwt cookie and redirects to `AUTH0_RETURN_URL`
- `/login` - Redirects to auth0 login
- `/logout` - Unsets jwt cookie and redirects to `AUTH0_RETURN_URL`
- `/me` - Returns auth status as `{ email: string, admin: boolean } | null`
- `/test/admin` - Sample protected route that requires admin access
- `/test/private` - Sample protected route
- `/test/public` - Sample unprotected route

## Middleware

- `requireJwtAdmin` - Requires authentication with admin rights (see `ADMIN_EMAIL` environment variable)
- `requireJwtUser` - Requires authentication
