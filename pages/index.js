import { signIn, signOut, useSession,getSession } from 'next-auth/client'
import axios from "axios";
import Link from "next/link";

const BASE_URL_STUDENT = "http://localhost:8080/students"

export default function Page() {
  const [ session, loading ] = useSession();

  const getStudentData = async ()=>{
    console.log('getStudentData');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  session.accessToken
      }
    }

    await axios.get(BASE_URL_STUDENT,config)
        .then(res => {
          console.log(res);
        })
        .catch(error => console.log("Error occured " + error))
  }

  const logOut= async (e)=>{
    e.preventDefault();
    const token = session.accessToken
    const refresh_token = session.refreshToken;
    console.log('logOut',token);
    console.log('logOut',refresh_token);
    const logOutUrl = `http://localhost:8000/auth/realms/BANBEIS/protocol/openid-connect/logout`


    const params = new URLSearchParams()
    params.append('client_id', 'next-client')
    params.append('refresh_token', refresh_token)

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    await axios.post(logOutUrl, params, config)
        .then((result) => {
          // Do somthing
          console.log(result);
          signOut({ callbackUrl: `/` })
        })
        .catch((err) => {
          // Do somthing
          console.log(err);
        })
  }

  /*<button onClick={() => signOut({ callbackUrl: `http://localhost:3000/api/auth/logout` })}>Sign Out</button>*/
  return <>
    {!session && <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.email} {JSON.stringify(session)}<br/>
      {/*<button onClick={() => signOut({ callbackUrl: `/api/auth/signout?csrf=true` })}>Sign out</button>
      */}<button onClick={logOut}>Sign out</button>

      <button onClick={getStudentData}>Get student data</button>

    </>}

    <Link href="/protected">
      <a>Protected</a>
    </Link>
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