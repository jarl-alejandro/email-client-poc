import { Forward, MoreHorizontal, Reply } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { getEmail } from "@/serverFunctions/gmail.get";
import { useMemo } from "react";

function EmailContent({ content, contentType }: { content: string; contentType?: "html" | "text" }) {
  const processedContent = useMemo(() => {
    if (!content) return "";

    // If it's HTML, process it to make links and images better
    if (contentType === "html") {
      // Create a temporary DOM element to parse HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      
      // Process all links
      const links = doc.querySelectorAll("a");
      links.forEach((link) => {
        const href = link.getAttribute("href");
        const text = link.textContent?.trim() || "";
        
        // If the link text is the same as the URL, use a shorter version
        if (text === href || text === "") {
          try {
            const url = new URL(href || "");
            const domain = url.hostname.replace("www.", "");
            link.textContent = domain;
            link.setAttribute("title", href || "");
          } catch {
            // If URL parsing fails, keep original
            if (text === "") {
              link.textContent = href || "Link";
            }
          }
        }
        
        // Add target="_blank" and rel="noopener noreferrer" for security
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
        link.classList.add("text-primary", "underline", "hover:text-primary/80");
      });
      
      // Process all images - ensure they're properly displayed
      const images = doc.querySelectorAll("img");
      images.forEach((img) => {
        const src = img.getAttribute("src");
        // Handle data URIs and regular URLs
        if (src) {
          img.setAttribute("loading", "lazy");
          img.classList.add("max-w-full", "h-auto", "rounded-md", "my-2");
          // If image fails to load, show alt text
          img.onerror = () => {
            img.style.display = "none";
          };
        }
      });
      
      return doc.body.innerHTML;
    }
    
    // For plain text, convert URLs to clickable links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);
    
    return parts.map((part: string, index: number) => {
      // Check if part matches URL pattern
      if (/^https?:\/\//.test(part)) {
        try {
          const url = new URL(part);
          const domain = url.hostname.replace("www.", "");
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80"
              title={part}
            >
              {domain}
            </a>
          );
        } catch {
          return <span key={index}>{part}</span>;
        }
      }
      return <span key={index}>{part}</span>;
    });
  }, [content, contentType]);

  if (contentType === "html") {
    return (
      <div
        className="prose prose-sm max-w-none leading-relaxed text-foreground"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    );
  }

  return (
    <div className="prose prose-sm max-w-none leading-relaxed text-foreground">
      <p>{processedContent}</p>
    </div>
  );
}

export function EmailViewer({ selectedEmailId }: { selectedEmailId: string | null }) {
  const { data: email, isLoading } = useQuery({
    queryKey: ["email", selectedEmailId],
    queryFn: () => {
      if (!selectedEmailId) return null;
      return getEmail({ data: selectedEmailId });
    },
    enabled: !!selectedEmailId,
  });

  if (!selectedEmailId) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Select an email to read</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading email...</p>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Email not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-background overflow-hidden">
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
      <ScrollArea className="flex-1 min-h-[calc(100vh-4rem)]">
        <div className="mx-auto max-w-3xl px-8 py-12">
          <h1 className="mb-8 text-2xl font-medium leading-tight text-balance">{email.subject}</h1>
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-medium">
              {email.from
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{email.from}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(email.date).toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          <EmailContent content={email.content || email.snippet} contentType={email.contentType as "html" | "text" | undefined} />
        </div>
      </ScrollArea>
    </div>
  );
}