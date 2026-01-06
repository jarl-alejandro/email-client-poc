import { EmailList } from '@/components/EmailList'
import { EmailViewer } from '@/components/EmailViewer'
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
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  return (
    <>
      <EmailList selectedEmailId={selectedEmailId} setSelectedEmailId={setSelectedEmailId} />
      <EmailViewer selectedEmailId={selectedEmailId} />
    </>
  )
}
