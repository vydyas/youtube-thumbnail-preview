"use client";

import React, { useEffect, useState } from "react";
import { Search, Mic, Plus, Bell, Menu, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { useTheme } from "next-themes";
import YouTubeLogo from "./YoutubeLogo";

import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import ThumbnailTesterSidebar from "@/components/Sidebar";

const LazyVideoCard = dynamic(() => import("./VideoCard"), {
  loading: () => <VideoCardSkeleton />,
  ssr: false,
});

function VideoCardSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="aspect-video w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  channel: string;
  views: string;
  time: string;
  duration: string;
}

interface Thumbnail {
  id: number;
  title: string;
  image: string;
}

const initialVideos = [
  {
    id: 1,
    title:
      "Time to Buy These 5 Bluechip Stocks in this Volatile Market? Rahul Jain Analysis",
    thumbnail:
      "https://i.ytimg.com/vi/-Ca387s-Tg8/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAw_S4oVknCA-3xter1PssXvnwZdw",
    channel: "Rahul Jain",
    views: "311 views",
    time: "2 minutes ago",
    duration: "14:58",
  },
  {
    id: 2,
    title: "Switzerland Budget Trip Itinerary | Telugu Traveller",
    thumbnail:
      "https://i.ytimg.com/vi/jQMr3059Yyg/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDItBkUNUDxolzl3iQO7bFVkVgN5Q",
    channel: "Telugu Traveller",
    views: "17K views",
    time: "11 hours ago",
    duration: "37:17",
  },
  {
    id: 3,
    title:
      "Time to Buy These 5 Bluechip Stocks in this Volatile Market? Rahul Jain Analysis",
    thumbnail:
      "https://i.ytimg.com/vi/477HojgS-4w/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAH3EmqqdUkUW5GwhXaX_lZ_V8Hkw",
    channel: "Rahul Jain",
    views: "311 views",
    time: "2 minutes ago",
    duration: "14:58",
  },
  {
    id: 4,
    title: "Switzerland Budget Trip Itinerary | Telugu Traveller",
    thumbnail:
      "https://i.ytimg.com/vi/daURe-AI5qQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDiCTw_0DJEd214zxQJBOKxD4Otvw",
    channel: "Telugu Traveller",
    views: "17K views",
    time: "11 hours ago",
    duration: "37:17",
  },
  {
    id: 5,
    title:
      "Time to Buy These 5 Bluechip Stocks in this Volatile Market? Rahul Jain Analysis",
    thumbnail:
      "https://i.ytimg.com/vi/LqijLpR4IU0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLACpquIGtMIsDsk5j3dqV_UW1z3ug",
    channel: "Rahul Jain",
    views: "311 views",
    time: "2 minutes ago",
    duration: "14:58",
  },
  {
    id: 6,
    title: "Switzerland Budget Trip Itinerary | Telugu Traveller",
    thumbnail:
      "https://i.ytimg.com/vi/OzoHX0T8g78/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCccAqflh7GOe4CUdP-En3hQoY9EQ",
    channel: "Telugu Traveller",
    views: "17K views",
    time: "11 hours ago",
    duration: "37:17",
  },
  {
    id: 7,
    title:
      "Time to Buy These 5 Bluechip Stocks in this Volatile Market? Rahul Jain Analysis",
    thumbnail:
      "https://i.ytimg.com/vi/vSJsz7tNuyU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC5qpJNLqxLkMKA3WbREAmXV3AuHg",
    channel: "Rahul Jain",
    views: "311 views",
    time: "2 minutes ago",
    duration: "14:58",
  },
  {
    id: 8,
    title: "Switzerland Budget Trip Itinerary | Telugu Traveller",
    thumbnail:
      "https://i.ytimg.com/vi/oCqkVZVPOe8/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAZT4C8DpCAjlTBoTEgA--0cX6Rnw",
    channel: "Telugu Traveller",
    views: "17K views",
    time: "11 hours ago",
    duration: "37:17",
  },

  {
    id: 9,
    title:
      "Time to Buy These 5 Bluechip Stocks in this Volatile Market? Rahul Jain Analysis",
    thumbnail:
      "https://i.ytimg.com/vi/h6yLvBwX0Fc/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBMQ5Quc8iHcukqTrnnPo8uazn9xA",
    channel: "Rahul Jain",
    views: "311 views",
    time: "2 minutes ago",
    duration: "14:58",
  },
  {
    id: 10,
    title: "Switzerland Budget Trip Itinerary | Telugu Traveller",
    thumbnail:
      "https://i.ytimg.com/vi/N9pp1ZGSx_g/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_giAAtAFigIMCAAQARhGIGUoVjAP&rs=AOn4CLCb32i1wqxaDuo0-evYJHHMHT0AaQ",
    channel: "Telugu Traveller",
    views: "17K views",
    time: "11 hours ago",
    duration: "37:17",
  },
  {
    id: 11,
    title:
      "Time to Buy These 5 Bluechip Stocks in this Volatile Market? Rahul Jain Analysis",
    thumbnail:
      "https://i.ytimg.com/vi/-yIsQPp31L0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAt7myNKOxlkswac4nvHwlB-LFoMw",
    channel: "Rahul Jain",
    views: "311 views",
    time: "2 minutes ago",
    duration: "14:58",
  },
  {
    id: 12,
    title: "Switzerland Budget Trip Itinerary | Telugu Traveller",
    thumbnail:
      "https://i.ytimg.com/vi/w-9S-NBVXwE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAFvHREtcS7sx1v-cfBA43Aghg2xA",
    channel: "Telugu Traveller",
    views: "17K views",
    time: "11 hours ago",
    duration: "37:17",
  },
];

const categories = [
  "All",
  "Live",
  "Music",
  "Mutual funds",
  "Grandmaster chess title",
  "Stocks",
  "Podcasts",
  "APIs",
  "Tamil Cinema",
  "Restaurants",
  "Mixes",
  "Software Engineering",
  "Chicken",
  "Comedy",
  "Tourist destinations",
];

export default function YouTubeClone() {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [loading, setLoading] = useState(true);

  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const { theme, setTheme } = useTheme();
  const [currentView, setCurrentView] = useState<
    "desktop" | "tablet" | "mobile"
  >(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("currentView") as
          | "desktop"
          | "tablet"
          | "mobile") || "tablet"
      );
    }
    return "tablet"; // Default to tablet for server-side rendering
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentView", currentView);
    }
  }, [currentView]);

  useEffect(() => {
    const loadVideos = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setVideos(initialVideos);
      setThumbnails([
        {
          id: 1,
          title:
            "Time to Buy These 5 Bluechip Stocks in this Volatile Market? Rahul Jain Analysis",
          image:
            "https://i.ytimg.com/vi/-Ca387s-Tg8/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAw_S4oVknCA-3xter1PssXvnwZdw",
        },
      ]);
      setLoading(false);
    };
    loadVideos();
  }, []);

  const handleDeleteThumbnail = (id: number | string) => {
    setThumbnails((prevThumbnails) =>
      prevThumbnails.filter((thumbnail) => thumbnail.id !== id)
    );
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
  };

  const handleImageUpload = (title: string, image: string) => {
    const newId = Date.now(); // Use timestamp as a unique ID
    const newThumbnail: Thumbnail = {
      id: newId,
      title,
      image,
    };
    setThumbnails([newThumbnail, ...thumbnails]);

    const newVideo: Video = {
      id: newId,
      title,
      thumbnail: image,
      channel: "Uploaded Channel",
      views: "0 views",
      time: "Just now",
      duration: "00:00",
    };
    setVideos([newVideo, ...videos]);
  };

  const shuffleVideos = () => {
    const shuffled = [...videos];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setVideos(shuffled);
  };

  const randomizeVideos = () => {
    const randomized = videos.map((video) => ({
      ...video,
      views: `${Math.floor(Math.random() * 1000)}K views`,
      time: `${Math.floor(Math.random() * 24)} hours ago`,
    }));
    setVideos(randomized);
  };

  return (
    <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
      <aside
        className="w-64 overflow-y-auto border-r border-border h-full"
        style={{
          position: "fixed",
        }}
      >
        <ThumbnailTesterSidebar
          thumbnails={thumbnails}
          onImageUpload={handleImageUpload}
          currentView={currentView}
          setCurrentView={setCurrentView}
          onDeleteThumbnail={handleDeleteThumbnail}
          onShuffle={shuffleVideos}
          onRandomize={randomizeVideos}
        />
      </aside>
      <main
        className="flex-1 overflow-auto p-10 bg-muted flex justify-center"
        style={{
          marginLeft: "255px",
        }}
      >
        <main className="bg-background">
          <div
            className={`transition-all duration-300 ease-in-out ${
              currentView === "desktop"
                ? "w-[1280px]"
                : currentView === "tablet"
                ? "w-[768px]"
                : "w-[375px]"
            }`}
          >
            <header className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center">
                <Button size="icon" variant="ghost">
                  <Menu className="h-6 w-6" />
                </Button>
                <YouTubeLogo></YouTubeLogo>
                <span className="text-xs text-muted-foreground ml-1">IN</span>
              </div>
              {currentView !== "mobile" && (
                <div className="flex-1 max-w-2xl mx-4">
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Search"
                      className="w-full pl-4 pr-10"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-0 top-0"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {currentView !== "mobile" && (
                <div className="flex items-center space-x-4">
                  <Button size="icon" variant="ghost">
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Create</span>
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Bell className="h-5 w-5" />
                  </Button>
                  <Avatar>
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              )}

              {currentView === "mobile" && (
                <div className="flex items-center space-x-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              )}
            </header>
            <nav className="p-4 border-b border-border">
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex space-x-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant="secondary"
                      className="rounded-full"
                      size="sm"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </nav>
            <div className="p-4">
              <div
                className={`grid gap-4 ${
                  currentView === "desktop"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : currentView === "tablet"
                    ? "grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {loading
                  ? Array(12)
                      .fill(0)
                      .map((_, index) => <VideoCardSkeleton key={index} />)
                  : videos.map((video) => (
                      <LazyVideoCard key={video.id} video={video} />
                    ))}
              </div>
            </div>
          </div>
        </main>
      </main>
    </div>
  );
}
