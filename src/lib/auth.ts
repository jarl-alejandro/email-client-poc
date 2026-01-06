import { env } from "@/env";
import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { DatabaseSync } from "node:sqlite";


export const auth = betterAuth({
    database: new DatabaseSync("database.sqlite"),
    baseURL: env.BETTER_AUTH_URL, 
    socialProviders: {
        google: {
            prompt: "select_account", 
            clientId: env.GOOGLE_CLIENT_ID as string,
            clientSecret: env.GOOGLE_CLIENT_SECRET as string,
            scope: [
                "openid",
                "email",
                "profile",
                "https://www.googleapis.com/auth/gmail.readonly",
              ],
        },
    },
    plugins: [tanstackStartCookies()],
})
