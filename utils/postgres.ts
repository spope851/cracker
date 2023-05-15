import * as keys from "./keys"
import pkg from "pg"
delete pkg.native
const { Pool } = pkg

export const pool: typeof Pool = new Pool({
  user: keys.pgUser,
  host: keys.serverHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
})
