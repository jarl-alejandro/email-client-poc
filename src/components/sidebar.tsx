import { Inbox, Star, Send, FileText, Archive, Trash2, LogOut, User } from "lucide-react"
import { useState } from "react"
import { useQuery } from '@tanstack/react-query'
import { authClient } from "@/lib/auth-client"
import { getSession } from "@/lib/auth-server-fn"

export function Sidebar() {
  const [activeFolder, setActiveFolder] = useState("inbox")
  
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: () => getSession(),
  })

  const user = session?.user ? {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image ?? undefined,
  } : null

  const handleSignOut = async () => {
    try {
      await authClient.signOut()
      window.location.href = "/login"
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  const folders = [
    { id: "inbox", label: "Inbox", icon: Inbox },
    { id: "starred", label: "Starred", icon: Star },
    { id: "sent", label: "Sent", icon: Send },
    { id: "drafts", label: "Drafts", icon: FileText },
    { id: "archive", label: "Archive", icon: Archive },
    { id: "trash", label: "Trash", icon: Trash2 },
  ]

  return (
    <div className="flex h-screen w-56 flex-col border-r border-border bg-background">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-lg font-medium">Mail</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3">
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
      {user && (
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 rounded-md px-3 py-2">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || user.email}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {user.name || user.email}
              </p>
              {user.email && user.name && (
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="mt-2 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}