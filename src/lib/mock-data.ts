import { Email } from "@/types/email";

export const mockEmails: Email[] = [
  {
    id: "1",
    from: "Sarah Johnson",
    subject: "Q1 Project Updates",
    snippet: "Here are the latest updates on the Q1 project timeline and deliverables...",
    date: "2024-01-15T10:30:00",
    unread: true,
    content:
      "Here are the latest updates on the Q1 project timeline and deliverables. We're on track to meet our goals and the team has been doing an excellent job.",
  },
  {
    id: "2",
    from: "Mike Chen",
    subject: "Team Meeting Notes",
    snippet: "Thanks for attending today's meeting. Here's a summary of what we discussed...",
    date: "2024-01-15T09:15:00",
    unread: true,
    content:
      "Thanks for attending today's meeting. Here's a summary of what we discussed regarding the upcoming sprint planning and resource allocation.",
  },
  {
    id: "3",
    from: "Emily Davis",
    subject: "Design Review Feedback",
    snippet: "I've reviewed the latest design mockups and have some thoughts to share...",
    date: "2024-01-14T16:45:00",
    unread: false,
    content:
      "I've reviewed the latest design mockups and have some thoughts to share. Overall, the direction looks great but I have a few suggestions for the navigation flow.",
  },
  {
    id: "4",
    from: "Alex Martinez",
    subject: "Weekly Report - Jan 14",
    snippet: "This week's highlights: completed user authentication, started dashboard redesign...",
    date: "2024-01-14T14:20:00",
    unread: false,
    content:
      "This week's highlights: completed user authentication, started dashboard redesign, and fixed several critical bugs reported by QA team.",
  },
  {
    id: "5",
    from: "Jessica Lee",
    subject: "Client Feedback Session",
    snippet: "The client loved the presentation! They're excited to move forward with phase 2...",
    date: "2024-01-13T11:00:00",
    unread: false,
    content:
      "The client loved the presentation! They're excited to move forward with phase 2 and have already started thinking about additional features they'd like to see.",
  },
  {
    id: "6",
    from: "David Park",
    subject: "Code Review Request",
    snippet: "Could you review my PR for the new API endpoints? I've added tests and documentation...",
    date: "2024-01-13T08:30:00",
    unread: false,
    content:
      "Could you review my PR for the new API endpoints? I've added tests and documentation. Would appreciate your feedback before we merge to main.",
  },
  {
    id: "7",
    from: "Rachel Green",
    subject: "Budget Approval Needed",
    snippet: "We need your approval on the Q2 marketing budget proposal by end of week...",
    date: "2024-01-12T15:10:00",
    unread: false,
    content:
      "We need your approval on the Q2 marketing budget proposal by end of week. The detailed breakdown is attached in the spreadsheet.",
  },
  {
    id: "8",
    from: "Tom Wilson",
    subject: "Server Migration Update",
    snippet: "The migration to the new infrastructure is scheduled for next weekend...",
    date: "2024-01-12T13:45:00",
    unread: false,
    content:
      "The migration to the new infrastructure is scheduled for next weekend. We'll need all hands on deck to ensure a smooth transition.",
  },
]
