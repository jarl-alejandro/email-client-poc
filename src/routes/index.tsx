import { EmailList } from '@/components/EmailList'
import { EmailViewer } from '@/components/EmailViewer'
import { Email } from '@/types/email'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { authMiddleware } from '@/lib/middleware'

export const Route = createFileRoute('/')({
    component: App,
    server: {
        middleware: [authMiddleware],
    },
})

function App() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  return (
    <>
      <EmailList selectedEmail={selectedEmail} setSelectedEmail={setSelectedEmail} />
      <EmailViewer selectedEmail={selectedEmail} />
    </>
  )
}
