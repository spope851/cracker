import React, { ReactNode, useEffect, useState } from "react"
import ReactPlayer from "react-player/youtube"

export default function About() {
  const [video, setVideo] = useState<ReactNode>()

  useEffect(() => {
    setVideo(
      <ReactPlayer
        url="https://www.youtube.com/watch?v=VCN8MQ4NWy8&t=2742s"
        controls={true}
      />
    )
  }, [])

  return <>{video}</>
}
