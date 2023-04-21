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
  // On each new client initiated, need to register for error(this is a serious bug on pg, the client throw errors although it should not)
  client.on("error", (err: Error) => {
    console.log(err)
  })
})

export { pool }
