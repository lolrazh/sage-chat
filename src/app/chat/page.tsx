"use client";

import { ChatInterface } from "../_components/chat/chat-interface";

export default function ChatPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="container max-w-4xl mx-auto h-[80vh]">
        <ChatInterface />
      </div>
    </main>
  );
} 