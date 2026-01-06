import { EmailList } from '@/components/EmailList'
import { EmailViewer } from '@/components/EmailViewer'
import { createFileRoute } from '@tanstack/react-router'
import { authMiddleware } from '@/lib/middleware'
import { listEmails } from '@/serverFunctions/gmail.list'
import { z } from 'zod'

const indexSearchSchema = z.object({
  emailId: z.string().optional(),
})

export const Route = createFileRoute('/')({
  component: App,
  validateSearch: indexSearchSchema,
  server: {
    middleware: [authMiddleware],
  },
  loader: async ({ context }) => {
    // Prefetch emails list using TanStack Query
    await context.queryClient.prefetchQuery({
      queryKey: ['emails'],
      queryFn: () => listEmails(),
    })
  },
})

function App() {
  const { emailId } = Route.useSearch()

  return (
    <>
      <EmailList selectedEmailId={emailId ?? null} />
      <EmailViewer selectedEmailId={emailId ?? null} />
    </>
  )
}
