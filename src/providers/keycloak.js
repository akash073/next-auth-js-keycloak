const options = {
    providers: [
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
            clientId: "nextjs_local",
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
            profileUrl: `${process.env.KEYCLOAK_BASE_URL}/userinfo`,
            profile: (profile) => ({ ...profile, id: profile.sub }),
        },
    ],
};
