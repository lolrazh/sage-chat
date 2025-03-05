"use client";

import { useRef, useEffect } from "react";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { useChat } from "ai/react";

export function ChatInterface() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I'm Sage, your AI thought companion. I'm here to help you reflect on your thoughts and recognize patterns in your thinking. How are you feeling today?",
      },
    ],
  });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (content: string) => {
    handleSubmit(new SubmitEvent("submit", { cancelable: true }), { data: { message: content } });
  };

  return (
    <Card className="w-full h-full flex flex-col shadow-lg border-0">
      <CardContent className="flex-1 overflow-y-auto p-6 pt-6">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="p-6 border-t">
        <MessageInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading}
          value={input}
          onChange={handleInputChange}
        />
      </CardFooter>
    </Card>
  );
} 