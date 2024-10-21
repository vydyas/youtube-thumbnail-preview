import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AnimatedThumbnailProps {
  id: string | number;
  image: string;
  title: string;
  onDelete: (id: number | string) => void;
}

export function AnimatedThumbnail({
  id,
  image,
  title,
  onDelete,
}: AnimatedThumbnailProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <Card className="relative">
        <CardContent className="p-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-1 right-1 h-6 w-6 bg-background/80 hover:bg-background rounded-full"
            onClick={() => onDelete(id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
