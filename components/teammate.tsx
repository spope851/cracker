import { Stack, Typography } from "@mui/material"
import Link from "next/link"
import React from "react"
import twitter from "../public/images/twitter.svg"
import mail from "../public/images/mail.svg"
import github from "../public/images/github.svg"
import web from "../public/images/web.svg"
import Image, { StaticImageData } from "next/image"

const IMAGE_DIMENSIONS = 300
const ICON_DIMENSIONS = 30
const ICON_COLOR = "#999"
const ICON_PADDING = 5
const ICON_STYLE = {
  padding: ICON_PADDING,
  height: ICON_DIMENSIONS,
  backgroundColor: ICON_COLOR,
  borderRadius: "50%",
}

type Icons = "github" | "twitter" | "mail" | "web"

const ICONS: Record<Icons, StaticImageData> = {
  github,
  twitter,
  mail,
  web,
}

export type TeammateProps = {
  name: string
  role: string
  img: StaticImageData
  links: { id: Icons; href: string }[]
}

export const Teammate: React.FC<TeammateProps> = ({ name, role, img, links }) => {
  return (
    <Stack alignItems="center" rowGap={2}>
      <Image
        src={img}
        height={IMAGE_DIMENSIONS}
        width={IMAGE_DIMENSIONS}
        alt={name}
        style={{ borderRadius: "50%" }}
      />
      <Typography variant="h4">{name}</Typography>
      <Typography variant="h5">{role}</Typography>
      <Stack direction="row" columnGap={1}>
        {links.map(({ id, href }) => (
          <Link href={href} target="_blank" rel="noreferrer" style={ICON_STYLE}>
            <Image
              src={ICONS[id]}
              height={ICON_DIMENSIONS}
              width={ICON_DIMENSIONS}
              alt={id}
              style={{ borderRadius: "50%" }}
            />
          </Link>
        ))}
      </Stack>
    </Stack>
  )
}
