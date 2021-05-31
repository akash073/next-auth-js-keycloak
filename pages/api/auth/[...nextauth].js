import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
//http://localhost:8080/auth/realms/BANBEIS/protocol/openid-connect/logout
const options = {
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        {
            id: "keycloak",
            name: "Keycloak",
            type: "oauth",
            version: "2.0",
            params: { grant_type: "authorization_code" },
            scope: "openid",
            accessTokenUrl: `${process.env.KEYCLOAK_BASE_URL}/token`,
            requestTokenUrl: `${process.env.KEYCLOAK_BASE_URL}/auth`,
            authorizationUrl: `${process.env.KEYCLOAK_BASE_URL}/auth?response_type=code&prompt=consent`,
            clientId: "next-client",
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
            profileUrl: `${process.env.KEYCLOAK_BASE_URL}/userinfo`,
            profile: (profile) => ({ ...profile, id: profile.sub }),
        }
    ],
    jwt: { encrypt: false },
    session: { jwt: true },
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            // Since you are using Credentials' provider, the data you're persisting
            // _should_ reside in the user here (as far as can I see, since I've just tested it out).
            // This gets called whenever a JSON Web Token is created (once) or updated
            if (user?.type) {
                token.status = user.type
            }
            if (user?.username) {
                token.username = user.username;
            }
          //  console.log(token);
          //  console.log(user);
           // console.log(account);
            if(account) {
                console.log(account.accessToken);
                token.accessToken = account.accessToken;
            }
            return token
        },

        async session(session, token) {
            session.type = token.type;
            session.username = token.username;
            session.accessToken = token.accessToken;
         //   console.log(session);
            return session
        }

        /*redirect: async (url, baseUrl) => {
            console.log('### url, baseUrl \n', url.startsWith(baseUrl), url, baseUrl);
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
        async signIn(user, account, profile) {
            //console.log('signIn',user)
            return true
        },
        async session(session, user) {
           // console.log('session',user)
            return session
        },
        async jwt(token, user, account, profile, isNewUser) {
            console.log('jwt',token)
            return token
        },
        async signOut(user) {
            console.log('signOut',user)
            return false
        },*/

    }

}

export default (req, res) => NextAuth(req, res, options)