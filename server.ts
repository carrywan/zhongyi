// server.ts
import { html } from '@elysiajs/html'
import staticPlugin from '@elysiajs/static'
import bcrypt from 'bcryptjs'
import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Elysia, t } from 'elysia'
import { users } from './schema'

const db = drizzle(new Database('sqlite.db'))

const app = new Elysia()

app
  .use(html())
  .use(staticPlugin())
  .get('/', () => Bun.file('views/index.html').text())
  .post(
    '/register',
    async (req) => {
      const { username, email, password } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)

      await db.insert(users).values({
        username: username,
        email: email,
        passwordHash: hashedPassword,
      })

      return new Response('User registered successfully', { status: 200 })
    },
    {
      body: t.Object({
        username: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  )

app.listen({ port: 8080 })
console.log('Hello via Bun!')
