"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Message, MessageList } from "./message-list";
import { MessageInput } from "./message-input";

// Mock responses for our chat
const MOCK_RESPONSES = [
  "I understand what you're saying. Can you tell me more?",
  "That's an interesting perspective. Let me think about that.",
  "I see your point. Here's what I think about it...",
  "Thanks for sharing that with me. I appreciate your input.",
  "I'm processing what you've said. It's quite thought-provoking.",
  "That's a good question. Let me try to answer it clearly.",
  "I'm here to help. What else would you like to know?",
  "I'm considering different angles to your question.",
  "That's a complex topic. Let me break it down for you.",
  "I'm learning from our conversation. Please continue."
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm Sage, your AI thought companion. I'm here to help you reflect on your thoughts and recognize patterns in your thinking. How are you feeling today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response with a random message
    setTimeout(() => {
      const randomResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: randomResponse,
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full h-full flex flex-col shadow-lg border-0">
      <CardHeader className="px-6 py-4 border-b">
        <CardTitle className="text-xl">Chat with Sage</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-6">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="p-6 border-t">
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </CardFooter>
    </Card>
  );
} 