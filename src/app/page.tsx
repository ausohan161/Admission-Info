"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MainTabs, MainTabId } from "@/components/layout/MainTabs";
import { CalendarTab } from "@/components/calendar/CalendarTab";
import { CategoryTab } from "@/components/category/CategoryTab";
import { InfoTab } from "@/components/info/InfoTab";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<MainTabId>("overview");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <MainTabs active={activeTab} onChange={setActiveTab} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-5 sm:px-6 sm:py-6">
        {activeTab === "overview" && <CalendarTab />}
        {activeTab === "category" && <CategoryTab />}
        {activeTab === "info" && <InfoTab />}
      </main>

      <Footer />
    </div>
  );
}
