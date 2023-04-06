import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"

export const Auth: React.FC<{
  children: ReactNode
  role: number
  redirect: string
}> = ({ children, role, redirect }) => {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status, data } = useSession({ required: true })
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated" && data?.user.role !== role) router.push(redirect)
  }, [status])

  if (status === "loading") {
    return <>...loading</>
  }

  if (data.user.role !== role) return <>...redirecting</>

  return <>{children}</>
}
