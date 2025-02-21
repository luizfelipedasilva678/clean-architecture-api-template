# Clean Architecture Template

This is my template to create backend applications
with clean architecture. I`m using Fastify but the
idea is that you can replace for any lib/framework
you like.

## Available routes

### Users

| `/users`   |           |                 |     |
| ---------- | --------- | --------------- | --- |
| **Method** | **Route** | **Description** |
| POST       | `/users`  | create one user |

### SignIn

| `/sign-in` |            |                         |     |
| ---------- | ---------- | ----------------------- | --- |
| **Method** | **Route**  | **Description**         |
| POST       | `/sign-in` | return a session cookie |

### SignOut

| `/sign-out` |             |                             |     |
| ----------- | ----------- | --------------------------- | --- |
| **Method**  | **Route**   | **Description**             |
| GET         | `/sign-out` | destroy the current session |

### Session

| `/session` |            |                             |     |
| ---------- | ---------- | --------------------------- | --- |
| **Method** | **Route**  | **Description**             |
| GET        | `/session` | returns the current session |

## How to run the project

### Database

To create the database run `docker compose up -d` and the sql scripts will
be preloaded by default.

### Env

It is necessary to setup some environment variables too.

```
DB_HOST=
DB_TEST=
DB_PROD=
DB_USER=
DB_PASSWORD=
ENVIRONMENT=
SERVER_PORT=
COOKIE_SECRET=
ALLOWED_ORIGINS=
```

### Running the project

After the steps above just run:

```
pnpm i
pnpm run dev
```

And the development server will start.
