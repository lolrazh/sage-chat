"use client";

import { ReactNode } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}

interface MessageBubbleProps {
  message: Message;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isUser
            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            : "bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200"
        }`}
      >
        {!isUser && (
          <div className="font-medium text-pink-500 mb-1">Cute Assistant</div>
        )}
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
} 