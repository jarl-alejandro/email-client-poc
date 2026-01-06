import { google } from "googleapis/build/src/index.js"

export async function getGmailClient(accessToken: string) {
  const auth = new google.auth.OAuth2()
  auth.setCredentials({
    access_token: accessToken,
  })

  return google.gmail({
    version: "v1",
    auth,
  })
}