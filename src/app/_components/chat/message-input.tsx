"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { SendIcon, Mic } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function MessageInput({ 
  onSendMessage, 
  isLoading = false, 
  value, 
  onChange 
}: MessageInputProps) {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const messageText = value !== undefined ? value : input;
    if (!messageText.trim()) return;
    
    onSendMessage(messageText);
    
    // Only clear local state if we're not using controlled input
    if (value === undefined) {
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      setInput(e.target.value);
    }
  };

  const toggleRecording = () => {
    // This would be replaced with actual voice recording logic
    setIsRecording(!isRecording);
    if (isRecording) {
      // Simulate end of recording with a message
      setTimeout(() => {
        if (onChange) {
          const event = {
            target: { value: (value || "") + "Voice input would appear here." }
          } as ChangeEvent<HTMLTextAreaElement>;
          onChange(event);
        } else {
          setInput(prev => prev + "Voice input would appear here.");
        }
        setIsRecording(false);
      }, 500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full flex gap-2 items-end">
      <div className="relative flex-1">
        <Textarea
          value={value !== undefined ? value : input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="min-h-12 resize-none pr-14 py-3"
          disabled={isLoading || isRecording}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <Button 
          type="button" 
          size="icon" 
          variant="ghost"
          onClick={toggleRecording}
          disabled={isLoading}
          className={`absolute right-2 bottom-2 ${isRecording ? 'text-red-500' : ''}`}
        >
          <Mic className="h-4 w-4" />
          <span className="sr-only">Record voice</span>
        </Button>
      </div>
      
      <Button 
        type="submit" 
        size="icon" 
        disabled={isLoading || !(value !== undefined ? value : input).trim()}
        className="h-12 w-12 rounded-full"
      >
        {isLoading ? (
          <LoadingSpinner className="h-5 w-5" />
        ) : (
          <SendIcon className="h-5 w-5" />
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