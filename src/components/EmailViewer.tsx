import { Forward, MoreHorizontal, Reply } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Email } from "@/types/email";

export function EmailViewer({ selectedEmail }: { selectedEmail: Email | null }) {
  return (
    <div className="flex flex-1 flex-col bg-background">
      {selectedEmail ? (
        <>
          <div className="flex h-16 items-center justify-between border-b border-border px-8">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Reply className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Forward className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="mx-auto max-w-3xl px-8 py-12">
              <h1 className="mb-8 text-2xl font-medium leading-tight text-balance">{selectedEmail.subject}</h1>
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-medium">
                  {selectedEmail.from
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{selectedEmail.from}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(selectedEmail.date).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="leading-relaxed text-foreground">{selectedEmail.content}</p>
              </div>
            </div>
          </ScrollArea>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-muted-foreground">Select an email to read</p>
        </div>
      )}
    </div>
  )
}