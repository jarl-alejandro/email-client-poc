import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Email } from "@/types/email";
import { listEmails } from "@/serverFunctions/gmail.list";
import { useQuery } from "@tanstack/react-query";

export function EmailList({ selectedEmail, setSelectedEmail }: { selectedEmail: Email | null, setSelectedEmail: (email: Email) => void }) {
  const { data: emails = [] } = useQuery({
    queryKey: ["emails"],
    queryFn: () => listEmails(),
  })

  return (
    <div className="w-96 border-r border-border bg-background">
      <div className="flex h-16 items-center border-b border-border px-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search mail"
            className="h-9 border-0 bg-secondary pl-9 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="divide-y divide-border">
          {emails.map((email) => (
            <button
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className={`flex w-full flex-col gap-2 px-6 py-4 text-left transition-colors hover:bg-secondary/50 ${selectedEmail?.id === email.id ? "bg-secondary" : ""
                }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className={`text-sm ${email.unread ? "font-medium" : "font-normal"}`}>{email.from}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(email.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className={`text-sm ${email.unread ? "font-medium" : "font-normal"}`}>{email.subject}</p>
              <p className="line-clamp-2 text-xs text-muted-foreground">{email.snippet}</p>
              {email.unread && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}