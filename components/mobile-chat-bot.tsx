"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, Bot, User, Loader2, X, Minimize2 } from "lucide-react"
import { chatWithOrderData } from "@/lib/gemini-chat"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function MobileChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I can help analyze your pizza orders. What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom()
      // Focus input when chat opens
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [messages, isChatOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await chatWithOrderData(input.trim())
      
      const assistantMessage: Message = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        role: "assistant",
        content: "I apologize, but I encountered an error while processing your request. Please try again, or check your connection.",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      // Re-focus input after sending
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hi! I can help analyze your pizza orders. What would you like to know?",
        timestamp: new Date()
      }
    ])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <>
      {/* Mobile Chat Container - Only visible on mobile (lg:hidden) */}
      <div className="lg:hidden">
        {/* Chat Toggle Button - Fixed position */}
        {!isChatOpen && (
          <Button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-50"
            size="sm"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        )}

        {/* Chat Window - Full screen overlay on mobile */}
        {isChatOpen && (
          <div className="fixed inset-0 bg-background z-50 flex flex-col">
            {/* Chat Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-4 border-b bg-background">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Bot className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <span className="text-base font-medium truncate">AI Assistant</span>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  ({messages.length - 1})
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  title="Clear chat"
                >
                  <span className="text-sm">🗑️</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsChatOpen(false)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  title="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Messages Area - Scrollable */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex gap-3 max-w-[85%] ${
                          message.role === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === "user" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                        }`}>
                          {message.role === "user" ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex flex-col gap-1 min-w-0">
                          <div
                            className={`rounded-lg px-3 py-2 text-sm ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="whitespace-pre-wrap leading-relaxed break-words">{message.content}</p>
                          </div>
                          <div className="text-xs text-muted-foreground px-1">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="bg-muted rounded-lg px-3 py-2 flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm text-muted-foreground">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area - Fixed at bottom */}
              <div className="flex-shrink-0 p-4 border-t bg-background">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about your orders..."
                      disabled={isLoading}
                      className="text-sm pr-12 resize-none h-10"
                      maxLength={500}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      {input.length}/500
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading || !input.trim()} 
                    size="sm" 
                    className="px-4 gap-2 h-10"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    <span className="hidden sm:inline">Send</span>
                  </Button>
                </form>
                {input.length > 450 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Character limit approaching
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}