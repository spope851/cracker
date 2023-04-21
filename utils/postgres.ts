import * as keys from "./keys"
import pkg from "pg"
delete pkg.native
const { Pool } = pkg

const pool = new Pool({
  user: keys.pgUser,
  host: keys.serverHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
})

pool.on("connect", (client: any) => {
  client.on("error", (err: Error) => {
    console.log(err)
  })
})

export { pool }
