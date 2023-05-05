"use client";

import FetchForm from "@/components/Forms/FetchForm";
import NewsList from "@/components/List";
import Navbar from "@/components/Navbar";
import { states } from "@/states";
import { useSnapshot } from "valtio";

export default function Home() {
  const { articles } = useSnapshot(states);
  return (
    <main>
      <Navbar />
      <FetchForm />
      {articles.length > 0 && <NewsList />}
    </main>
  );
}
