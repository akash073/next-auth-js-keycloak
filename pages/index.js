import { signIn, signOut, useSession,getSession } from 'next-auth/client'
//import jwt from 'next-auth/jwt'

//  signOut('keycloak',
//         { callbackUrl:
//               `http://localhost:8080/auth/realms/BANBEIS/protocol/openid-connect/logout` }
//     )

export default function Page() {
  const [ session, loading ] = useSession();

  const logOutcallbackUrl = ()=>{
    console.log('logOutcallbackUrl');
  }
  /*POST http://localhost:8080/auth/realms/<my_realm>/protocol/openid-connect/logout
Authorization: Bearer <access_token>
Content-Type: application/x-www-form-urlencoded

client_id=<my_client_id>&refresh_token=<refresh_token>*/

  const logOut= async (e)=>{
    e.preventDefault();
    const token = session.accessToken
    console.log('logOut',token);
    console.log('logOut',session.refreshToken);
    //await signOut()
  }

  /*<button onClick={() => signOut({ callbackUrl: `http://localhost:3000/api/auth/logout` })}>Sign Out</button>*/
  return <>
    {!session && <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.email} <br/>
      {/*<button onClick={() => signOut({ callbackUrl: `/api/auth/signout?csrf=true` })}>Sign out</button>
      */}<button onClick={logOut}>Sign out</button>
    </>}
  </>
}


export async function getServerSideProps(ctx) {
  console.log('getServerSideProps');
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}