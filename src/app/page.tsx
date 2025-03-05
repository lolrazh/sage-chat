import { MessageSquare, BookOpen, LineChart, User, Users, Calendar } from "lucide-react";

import { BentoCard, BentoGrid } from "~/components/bento-grid";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="container py-4">
        <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4">
          {/* Chat - Top spanning 2 columns */}
          <div className="md:col-span-2">
            <BentoCard
              name="Chat"
              description="Have a conversation with Sage to reflect on your thoughts and feelings."
              Icon={MessageSquare}
              href="/chat"
              cta="Start chatting"
            />
          </div>
          
          {/* Journal - Top right */}
          <div>
            <BentoCard
              name="Journal"
              description="Write freely about your thoughts and experiences."
              Icon={BookOpen}
              href="/journal"
              cta="Open journal"
            />
          </div>
          
          {/* Daily Insights - Middle left */}
          <div>
            <BentoCard
              name="Daily Insights"
              description="Receive personalized insights based on your recent patterns."
              Icon={LineChart}
              href="/insights"
              cta="View insights"
            />
          </div>
          
          {/* People and Habits - Middle column stacked */}
          <div className="flex flex-col gap-4">
            {/* People - Top half */}
            <div className="h-[10.5rem]">
              <BentoCard
                name="People"
                description="Keep track of your relationships."
                Icon={Users}
                href="/people"
                cta="View people"
                className="h-full"
              />
            </div>
            
            {/* Habits - Bottom half */}
            <div className="h-[10.5rem]">
              <BentoCard
                name="Habits"
                description="Track and build positive habits."
                Icon={Calendar}
                href="/habits"
                cta="Manage habits"
                className="h-full"
              />
            </div>
          </div>
          
          {/* Profile - Bottom right */}
          <div>
            <BentoCard
              name="Profile"
              description="Manage your account and preferences."
              Icon={User}
              href="/profile"
              cta="View profile"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
