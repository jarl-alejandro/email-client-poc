import { createServerFn } from "@tanstack/react-start"
import { getGmailClient } from "@/server/gmail"
import { getSession } from "@/serverFunctions/auth-server-fn"
import { getGoogleAccountByUserId } from "@/server/queries/account"
import type { EmailListItem } from "@/types/email"

interface GmailHeader {
  name: string
  value: string
}

interface GmailMessagePayload {
  headers?: GmailHeader[]
  parts?: GmailMessagePart[]
}

interface GmailMessagePart {
  mimeType?: string
  headers?: GmailHeader[]
  body?: {
    data?: string
  }
  parts?: GmailMessagePart[]
}

interface GmailMessage {
  id: string
  threadId: string
  snippet?: string | null
  internalDate?: string | null
  payload?: GmailMessagePayload
  labelIds?: string[]
}

function getHeader(headers: GmailHeader[] | undefined, name: string): string {
  if (!headers) return ""
  return headers.find((h) => h.name === name)?.value ?? ""
}

function parseMessage(message: GmailMessage): EmailListItem {
  const headers = message.payload?.headers ?? []
  const labelIds = message.labelIds ?? []

  return {
    id: message.id,
    threadId: message.threadId,
    subject: getHeader(headers, "Subject"),
    from: getHeader(headers, "From"),
    to: getHeader(headers, "To"),
    date: getHeader(headers, "Date"),
    snippet: message.snippet ?? "",
    internalDate: Number(message.internalDate ?? 0),
    unread: labelIds.includes("UNREAD"),
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
    messages.map(async (m) => {
      if (!m.id) return null
      
      const full = await gmail.users.messages.get({
        userId: "me",
        id: m.id,
        format: "metadata", // más rápido
        metadataHeaders: ["From", "To", "Subject", "Date"],
      })

      if (!full.data) return null
      
      return parseMessage(full.data as GmailMessage)
    })
  )

  return emails.filter((email): email is EmailListItem => email !== null)
})
