import { UserContext } from "@/context/userContext"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ReactNode, useContext, useEffect } from "react"

export const Auth: React.FC<{
  children: ReactNode
  role: number
  redirect: string
}> = ({ children, role, redirect }) => {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })
  const { user } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (!user) return
    else if (status === "authenticated" && user.role !== role) router.push(redirect)
  }, [status, user])

  if (status === "loading" || !user) {
    return <>...loading</>
  }

  if (user.role !== role) return <>...redirecting</>

  return <>{children}</>
}
