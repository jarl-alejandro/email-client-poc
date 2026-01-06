import { getGmailClient } from "@/server/gmail"
import { createServerFn } from "@tanstack/react-start"
import { getSession } from "@/serverFunctions/auth-server-fn"
import { getGoogleAccountByUserId } from "@/server/queries/account"

function getHeader(headers: any[], name: string) {
  return headers.find(h => h.name === name)?.value ?? ""
}

function getBodyContent(parts: any[]): { text: string; html: string } {
  let text = ""
  let html = ""
  
  for (const part of parts) {
    if (part.parts) {
      const nested = getBodyContent(part.parts)
      if (nested.text) {
        text = text || nested.text
      }
      if (nested.html) {
        html = html || nested.html
      }
    } else {
      if (part.mimeType === "text/plain" && part.body?.data) {
        text = Buffer.from(part.body.data, "base64").toString("utf-8")
      } else if (part.mimeType === "text/html" && part.body?.data) {
        html = Buffer.from(part.body.data, "base64").toString("utf-8")
      }
    }
  }
  
  return { text, html }
}

function parseEmailDetails(message: any) {
  const headers = message.payload.headers
  const payload = message.payload
  
  // Handle simple emails without parts
  let text = ""
  let html = ""
  
  if (payload.body?.data) {
    const mimeType = payload.mimeType || "text/plain"
    const content = Buffer.from(payload.body.data, "base64").toString("utf-8")
    if (mimeType === "text/html") {
      html = content
    } else {
      text = content
    }
  } else if (payload.parts && payload.parts.length > 0) {
    const content = getBodyContent(payload.parts)
    text = content.text
    html = content.html
  }
  
  return {
    id: message.id,
    threadId: message.threadId,
    subject: getHeader(headers, "Subject"),
    from: getHeader(headers, "From"),
    to: getHeader(headers, "To"),
    date: getHeader(headers, "Date"),
    snippet: message.snippet,
    content: html || text || message.snippet,
    contentType: html ? "html" : "text",
  }
}

export const getEmail = createServerFn({
  method: "GET",
})
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    if (!id) {
      return null
    }

    const session = await getSession()
    if (!session) return null

    const account = getGoogleAccountByUserId(session.user.id)

    if (!account?.accessToken) {
      throw new Error("Google access token not found")
    }

    const gmail = await getGmailClient(account.accessToken)

    const res = await gmail.users.messages.get({
      userId: "me",
      id,
      format: "full",
    })

    return parseEmailDetails(res.data)
  })
