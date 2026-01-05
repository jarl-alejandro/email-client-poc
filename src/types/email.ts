export interface Email {
  id: string
  from: string
  subject: string
  snippet: string
  date: string
  unread: boolean
  content?: string
}
