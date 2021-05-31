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
            authorizationUrl: `${process.env.KEYCLOAK_BASE_URL}/auth?response_type=code`,
            clientId: "next-client",
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
            profileUrl: `${process.env.KEYCLOAK_BASE_URL}/userinfo`,
            profile: (profile) => ({ ...profile, id: profile.sub }),
        }
    ],

}

export default (req, res) => NextAuth(req, res, options)