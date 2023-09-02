import { useSession } from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>You need to sign in</div>
  }

  return <div>Welcome, {session.user.email}</div>
}
