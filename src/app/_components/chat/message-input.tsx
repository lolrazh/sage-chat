"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { SendIcon } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export function MessageInput({ onSendMessage, isLoading = false }: MessageInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    onSendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Textarea
        value={input}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="min-h-12 resize-none pr-14 py-3"
        disabled={isLoading}
        onKeyDown={handleKeyDown}
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={isLoading || !input.trim()}
        className="absolute right-2 bottom-2"
      >
        {isLoading ? (
          <LoadingSpinner className="h-4 w-4" />
        ) : (
          <SendIcon className="h-4 w-4" />
        )}
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
} 