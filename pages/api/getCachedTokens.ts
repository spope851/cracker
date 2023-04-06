import { NextApiRequest, NextApiResponse } from "next"
import redis from "@/utils/redis"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"

export type CachedTokensResponse = Record<string, { hide: boolean }> | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CachedTokensResponse>
) {
  const {
    user: { id: user },
  } = await getServerSession(req, res, authOptions)
  const cachedData = await redis.get(`tokens/${user}`)
  res.json(cachedData ? JSON.parse(cachedData) : null)
}
