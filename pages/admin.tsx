import React, { ReactNode, useEffect, useState } from "react"
import Head from "next/head"
import { Timeclock } from "react-timeclock"
import { useSession } from "next-auth/react"

export default function Admin() {
  const [timeclock, setTimeclock] = useState<ReactNode>()
  const session = useSession()

  useEffect(() => {
    session.status === "authenticated" && setTimeclock(<Timeclock />)
  }, [session])

  return (
    <>
      <Head>
        <title>creativity tracker</title>
      </Head>
      {timeclock}
    </>
  )
}
