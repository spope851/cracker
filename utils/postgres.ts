import * as keys from "./keys"
import pkg from "pg"
delete pkg.native
const { Pool } = pkg

export const pool = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
})
