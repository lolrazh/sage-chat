import { MessageSquare, BookOpen, LineChart, User } from "lucide-react";

import { BentoCard, BentoGrid } from "~/components/bento-grid";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="container py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Sage
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Your AI-powered thought companion for deeper self-understanding
          </p>
        </div>

        <BentoGrid>
          <BentoCard
            name="Chat"
            description="Have a conversation with Sage to reflect on your thoughts and feelings."
            Icon={MessageSquare}
            href="/chat"
            cta="Start chatting"
            className="col-span-1 md:col-span-2"
          />
          
          <BentoCard
            name="Journal"
            description="Write freely about your thoughts and experiences."
            Icon={BookOpen}
            href="/journal"
            cta="Open journal"
          />
          
          <BentoCard
            name="Daily Insights"
            description="Receive personalized insights based on your recent patterns."
            Icon={LineChart}
            href="/insights"
            cta="View insights"
          />
          
          <BentoCard
            name="Profile"
            description="Manage your account and preferences."
            Icon={User}
            href="/profile"
            cta="View profile"
          />
        </BentoGrid>
      </div>
    </main>
  );
}
