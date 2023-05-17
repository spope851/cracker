import { NextApiRequest, NextApiResponse } from "next"
import { deleteNlpCache } from "@/utils/redis"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    user: { id: user },
  } = await getServerSession(req, res, authOptions)
  await deleteNlpCache(user)
  res.send("deleted")
}
