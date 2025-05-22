// app/dashboard/chat/page.tsx
import { ChatInterface } from "@/components/chat/ChatInterface"

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">AI Assistant</h3>
        <p className="text-sm text-muted-foreground">
          Ask questions about your pizza orders, customer trends, and business insights.
        </p>
      </div>
      <ChatInterface />
    </div>
  )
}