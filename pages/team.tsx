import { Stack } from "@mui/material"
import React from "react"
import spencer from "../public/images/spencer.jpeg"
import { Teammate, TeammateProps } from "@/components/teammate"

const TEAMMATES: TeammateProps[] = [
  {
    name: "Spencer",
    role: "Lead Developer",
    img: spencer,
    links: [
      {
        id: "github",
        href: "https://github.com/spope851",
      },
      {
        id: "twitter",
        href: "https://twitter.com/s_pop3",
      },
      {
        id: "web",
        href: "https://spenpo.com",
      },
      {
        id: "mail",
        href: "mailto:spenpo@spenpo.com",
      },
    ],
  },
]

export default function Team() {
  return (
    <Stack alignItems="center" py={5} px={{ md: 20, sm: 5, xs: 1 }} rowGap={5}>
      {TEAMMATES.map((teammate) => (
        <Teammate {...teammate} />
      ))}
    </Stack>
  )
}
