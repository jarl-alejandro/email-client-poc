import { getGmailClient } from "@/server/gmail"
import { createServerFn } from "@tanstack/react-start"
import { getSession } from "@/serverFunctions/auth-server-fn"

export const getEmail = createServerFn({
  method: "GET",
}).handler(async ({ params }) => {
  const { id } = await params.json()
  const session = await getSession()
  if (!session) return null

  const gmail = await getGmailClient(session.accessToken)

  const res = await gmail.users.messages.get({
    userId: "me",
    id,
    format: "full",
  })

  return res.data
})
