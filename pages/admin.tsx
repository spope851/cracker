import React, { ReactNode, useContext, useEffect, useState } from "react"
import Head from "next/head"
import { Timeclock } from "react-timeclock"
import { ComponentWithAuth } from "@/types"
import { Button } from "@mui/material"
import { UserContext } from "@/context/userContext"

const Admin: ComponentWithAuth = () => {
  const { refetch } = useContext(UserContext)
  const [timeclock, setTimeclock] = useState<ReactNode>()

  useEffect(() => {
    setTimeclock(<Timeclock />)
  }, [])

  return (
    <>
      <Head>
        <title>creativity tracker</title>
      </Head>
      {timeclock}
      <Button
        onClick={() => fetch("/api/storeNlpData")}
        variant="outlined"
        sx={{ alignSelf: "flex-start", m: 5 }}
      >
        run store nlp data cron job
      </Button>
      <Button
        onClick={async () =>
          await fetch("/api/cache/deleteDashboardCache", { method: "post" }).then(
            () => refetch({ refetch: true })
          )
        }
        variant="outlined"
        sx={{ alignSelf: "flex-start", mx: 5 }}
      >
        clear my cached data
      </Button>
    </>
  )
}

Admin.auth = {
  role: 3,
  redirect: "/",
}

export default Admin
