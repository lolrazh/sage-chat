"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";
import { Message as AIMessage } from "ai";

export type Message = AIMessage;

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4 py-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}

interface MessageItemProps {
  message: Message;
}

function MessageItem({ message }: MessageItemProps) {
  // Skip system messages
  if (message.role === "system") return null;
  
  const isUser = message.role === "user";
  
  return (
    <div className={cn("flex items-start gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-primary/80">AI</AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "rounded-lg px-4 py-2 max-w-[80%]",
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-muted"
      )}>
        <div className="whitespace-pre-wrap break-words text-sm">
          {message.content}
        </div>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-primary/80">You</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
} 