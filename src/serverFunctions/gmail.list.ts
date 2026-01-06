import { createServerFn } from "@tanstack/react-start"
import { getGmailClient } from "@/server/gmail"
import { getSession } from "@/serverFunctions/auth-server-fn"
import { getGoogleAccountByUserId } from "@/server/queries/account"

function getHeader(headers: any[], name: string) {
  return headers.find(h => h.name === name)?.value ?? ""
}

function parseMessage(message: any) {
  const headers = message.payload.headers

  return {
    id: message.id,
    threadId: message.threadId,
    subject: getHeader(headers, "Subject"),
    from: getHeader(headers, "From"),
    to: getHeader(headers, "To"),
    date: getHeader(headers, "Date"),
    snippet: message.snippet,
    internalDate: Number(message.internalDate),
  }
}

export const listEmails = createServerFn({
  method: "GET",
}).handler(async () => {
  const session = await getSession();
  if (!session) return [];

  const account = getGoogleAccountByUserId(session.user.id);

  if (!account?.accessToken) {
    throw new Error("Google access token not found")
  }

  const gmail = await getGmailClient(account.accessToken);

  const res = await gmail.users.messages.list({
    userId: "me",
    maxResults: 20,
    labelIds: ["INBOX"],
    includeSpamTrash: true,
  })

  const messages = res.data.messages ?? []

  const emails = await Promise.all(
    messages.map(async (m: any) => {
      const full = await gmail.users.messages.get({
        userId: "me",
        id: m.id,
        format: "metadata", // más rápido
        metadataHeaders: ["From", "To", "Subject", "Date"],
      })

      return parseMessage(full.data)
    })
  )


  return emails ?? []
})
