"use client";

import React from "react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

interface VideoCardProps {
  video: {
    id: number;
    title: string;
    thumbnail: string;
    channel: string;
    views: string;
    time: string;
    duration: string;
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div key={video.id} className="space-y-2">
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover rounded-lg"
        />
        <span className="absolute bottom-1 right-1 bg-background/80 text-foreground text-xs px-1 rounded">
          {video.duration}
        </span>
      </div>
      <div className="flex space-x-2">
        <Avatar className="w-9 h-9">
          <AvatarFallback>{video.channel[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
          <p className="text-xs text-muted-foreground">{video.channel}</p>
          <p className="text-xs text-muted-foreground">
            {video.views} • {video.time}
          </p>
        </div>
      </div>
    </div>
  );
}
