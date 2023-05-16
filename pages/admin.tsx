import React, { ReactNode, useEffect, useState } from "react"
import Head from "next/head"
import { Timeclock } from "react-timeclock"
import { ComponentWithAuth } from "@/types"
import { Button } from "@mui/material"

const Admin: ComponentWithAuth = () => {
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
        test store nlp data cron job
      </Button>
    </>
  )
}

Admin.auth = {
  role: 3,
  redirect: "/",
}

export default Admin
