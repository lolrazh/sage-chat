"use client";

import { ChatInterface } from "../_components/chat/chat-interface";

export default function ChatPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 md:p-8">
      <div className="container max-w-5xl mx-auto h-[85vh]">
        <ChatInterface />
      </div>
    </main>
  );
} 