import React, { ReactNode, useEffect, useState } from "react"
import Head from "next/head"
import { Timeclock } from "react-timeclock"
import { ComponentWithAuth } from "@/types"

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
    </>
  )
}

Admin.auth = {
  role: 2,
  redirect: "/",
}

export default Admin
