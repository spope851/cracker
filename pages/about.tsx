import { Box, Stack, Typography } from "@mui/material"
import Link from "next/link"
import React, { ReactNode, useEffect, useState } from "react"
import ReactPlayer from "react-player/youtube"

export default function About() {
  const [video, setVideo] = useState<ReactNode>()

  useEffect(() => {
    setVideo(
      <ReactPlayer
        url="https://www.youtube.com/watch?v=VCN8MQ4NWy8&t=2742s"
        controls={true}
        width="75vw"
      />
    )
  }, [])

  return (
    <Stack alignItems="center" py={5} px={{ md: 20, sm: 5, xs: 1 }} rowGap={5}>
      {video}
      <Box>
        <Typography>
          Cracker takes inspiration from a framework described by bestselling author
          <Link href="https://www.jimcollins.com/">Jim Collins</Link> in the above
          interview. Collins there describes how value that can derived from three
          simple datapoints. This mixture of qualitative and quantitative data can be
          quite telling when properly analyzed. We&apos;ve tested the framework and
          found value in it, which is why we want to make it accessible to all.
          Cracker is the solution we came up with. Your job is to enter the same
          three fields mentioned in the interview:
        </Typography>
        <Box component="ul">
          <Typography component="li">
            Overview: A record of your day no longer than a tweet. Anything that
            comes to mind is probably worth noting. Don&apos;t sweat the grammar
            here, just focus on the actions that defined your day
          </Typography>
          <Typography component="li">
            Number of creative hours: Keep track of the time you spend doing work
            that is new and creative
          </Typography>
          <Typography component="li">
            Rating: In retrospect, how do you feel about your day. +2 is excellent,
            -2 is bad, zero is “eh”
          </Typography>
        </Box>
        <Typography>
          Once you&apos;ve done so, your dashboard will be updated. The dashboard is
          a tool that enables you to visualize and step through your data. Jim
          mentioned that his motivation for starting this was to hold himself to the
          standard of doing 1000 hours of creative work per year. In the metrics
          section, we do the math and let you know how many hours you&apos;re on
          track to log this year. We also give you a count of each of the five
          ratings. You can pivot this section to be representative of the past 30, 60
          or 90 days. The dashboard also helps you step through your cumulative
          overviews by providing a word cloud. This is a visual representation of the
          amount of times words come up in your data. Words that you used often will
          appear large in proportion to the number of times they were mentioned, and
          vice versa. This feature is interactive and allows you to investigate your
          use of specific words relative to the other two metrics you provide when
          using them.
        </Typography>
      </Box>
      <Typography>
        These are the core features of Cracker that are designed to shed optimal on
        the incredibly simple data you&apos;ve provided. On top of all that,
        we&apos;re also an AI platform. This app is a perfect use case to take
        advantage of textual analysis tools being rapidly developed in the AI
        community. We are currently leveraging Google&apos;s{" "}
        <Link href="https://cloud.google.com/natural-language">
          Natural Language API
        </Link>{" "}
        to identify sentences, tokens, and entities in your data and provide you with
        insights from the AI that can be found in the dashboard&apos;s additional
        tables. We plan to continue exploring new tools in the industry with the goal
        of providing our users the richest experience possible while analyzing their
        data. We believe this framework alone can change lives, and we plan to take
        it a step further with our software.
      </Typography>
      <Typography alignSelf="flex-start">
        The Reflective Hour will always be transparent about our software
        architecture and the handling of our users&apos; data.
      </Typography>
    </Stack>
  )
}
