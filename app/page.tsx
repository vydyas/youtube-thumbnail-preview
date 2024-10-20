"use client";

import { ThemeProvider } from "next-themes";
import YouTubeClone from "../components/YoutubeClone";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <YouTubeClone />
    </ThemeProvider>
  );
}
