"use client";

import { ChangeEvent, FormEvent } from "react";

interface MessageInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}

export function MessageInput({ value, onChange, onSubmit, isLoading }: MessageInputProps) {
  return (
    <form onSubmit={onSubmit} className="relative">
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Type a message..."
        className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3 pr-16 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 resize-none"
        rows={2}
        disabled={isLoading}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
          }
        }}
      />
      
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="absolute bottom-3 right-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 p-2 text-white transition-all hover:opacity-90 disabled:opacity-50"
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <SendIcon />
        )}
      </button>
    </form>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
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