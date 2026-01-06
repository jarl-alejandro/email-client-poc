import { env } from "@/env";
import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { DatabaseSync } from "node:sqlite";

console.log("env", env);
console.log(env.BETTER_AUTH_URL);
console.log(env.GOOGLE_CLIENT_ID);
console.log(env.GOOGLE_CLIENT_SECRET);

export const auth = betterAuth({
    database: new DatabaseSync("database.sqlite"),
    baseURL: env.BETTER_AUTH_URL, 
    socialProviders: {
        google: {
            prompt: "select_account", 
            clientId: env.GOOGLE_CLIENT_ID as string,
            clientSecret: env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    plugins: [tanstackStartCookies()],
})
