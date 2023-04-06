import { NextApiRequest, NextApiResponse } from "next"
import redis from "@/utils/redis"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    user: { id: user },
  } = await getServerSession(req, res, authOptions)
  await redis.set(`tokens/${user}`, req.body)
  res.send("cached")
}
