"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Message, MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";

// Cute responses for our mock AI
const CUTE_RESPONSES = [
  "Aww, that's so interesting! Tell me more! 🌸",
  "Hehe, I'm just a cute little AI trying my best! 💖",
  "Wow! That's super cool! I'm learning so much from you! ✨",
  "Teehee~ I wish I could help more, but I'm still growing! 🌱",
  "Ooooh! That's fascinating! *blinks with sparkly eyes* ⭐",
  "Hmm, let me think about that... *taps chin cutely* 🤔",
  "Yay! I love chatting with you! Let's talk more! 🎀",
  "Oh my goodness! That's amazing! *jumps excitedly* 🌟",
  "I'm sending you virtual hugs and good vibes! 🌈",
  "Wow, you're so smart! I'm impressed! 🦄"
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi there! I'm your cute chat assistant! How can I help you today? 💕",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response with a random cute message
    setTimeout(() => {
      const randomResponse = CUTE_RESPONSES[Math.floor(Math.random() * CUTE_RESPONSES.length)];
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
    <div className="flex flex-col h-[70vh]">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <MessageInput 
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
          onSubmit={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
} 