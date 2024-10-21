"use client";

import YouTubeClone from "@/components/YoutubeClone";
import { useEffect, useState } from "react";

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <YouTubeClone />;
}
