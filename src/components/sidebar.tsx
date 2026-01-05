import { Search, Inbox, Star, Send, FileText, Archive, Trash2, Reply, Forward, MoreHorizontal } from "lucide-react"
import { useState } from "react"


export function Sidebar() {
  const [activeFolder, setActiveFolder] = useState("inbox")

  const folders = [
    { id: "inbox", label: "Inbox", icon: Inbox },
    { id: "starred", label: "Starred", icon: Star },
    { id: "sent", label: "Sent", icon: Send },
    { id: "drafts", label: "Drafts", icon: FileText },
    { id: "archive", label: "Archive", icon: Archive },
    { id: "trash", label: "Trash", icon: Trash2 },
  ]


  return (
    <div className="w-56 border-r border-border bg-background">
    <div className="flex h-16 items-center px-6">
      <h1 className="text-lg font-medium">Mail</h1>
    </div>
    <nav className="space-y-1 px-3">
      {folders.map((folder) => {
        const Icon = folder.icon
        return (
          <button
            key={folder.id}
            onClick={() => setActiveFolder(folder.id)}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              activeFolder === folder.id
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {folder.label}
          </button>
        )
      })}
    </nav>
  </div>
  )
}