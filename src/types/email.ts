export interface EmailListItem {
  id: string
  threadId: string
  subject: string
  from: string
  to: string
  date: string
  snippet: string
  internalDate: number
  unread?: boolean
}

export interface EmailDetails {
  id: string
  threadId: string
  subject: string
  from: string
  to: string
  date: string
  snippet: string
  content: string
  contentType?: "html" | "text"
}

// Legacy type for backwards compatibility
export interface Email {
  id: string
  from: string
  subject: string
  snippet: string
  date: string
  unread: boolean
  content?: string
}
