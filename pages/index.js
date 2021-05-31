import { signIn, signOut, useSession } from 'next-auth/client'

export default function Page() {
  const [ session, loading ] = useSession()

  /*<button onClick={() => signOut({ callbackUrl: `http://localhost:3000/api/auth/logout` })}>Sign Out</button>*/
  return <>
    {!session && <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut({ callbackUrl: `http://localhost:8080/auth/realms/BANBEIS/protocol/openid-connect/logout` })}>Sign out</button>
    </>}
  </>
}