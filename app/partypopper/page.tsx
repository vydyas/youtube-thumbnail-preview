"use client";

import React, { useState, useEffect, useRef } from "react";
import { create } from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const CONFETTI_COLORS = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];

export default function PartyPopperPlayground() {
  const [count, setCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiRef = useRef<ReturnType<typeof create> | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    canvasRef.current = canvas;
    confettiRef.current = create(canvas, { resize: true, useWorker: true });

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      document.body.removeChild(canvas);
      window.removeEventListener("resize", resizeCanvas);
      if (confettiRef.current) {
        confettiRef.current.reset();
      }
    };
  }, []);

  const popConfetti = (origin: { x: number; y: number }) => {
    if (confettiRef.current) {
      const isEdge =
        origin.x === 0 || origin.x === 1 || origin.y === 0 || origin.y === 1;
      const burstCount = isEdge ? 5 : 1;
      const particleCount = isEdge ? 300 : 1500;
      const spread = isEdge ? 180 : 360;
      const startVelocity = isEdge ? 45 : 25;

      for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
          confettiRef.current!({
            particleCount,
            spread,
            origin: {
              x: origin.x + (Math.random() - 0.5) * 0.4,
              y: origin.y + (Math.random() - 0.5) * 0.4,
            },
            colors: CONFETTI_COLORS,
            scalar: 0.8,
            gravity: 1,
            drift: isEdge ? 2 : 0,
            ticks: 300,
            shapes: ["square", "circle"],
            startVelocity,
          });
        }, i * 150);
      }
    }
  };

  const handlePop = (x: number, y: number) => {
    popConfetti({ x, y });
    setCount((prevCount) => prevCount + 1);
  };

  const handlePopRandom = () => {
    const x = Math.random();
    const y = Math.random();
    handlePop(x, y);
  };

  const handlePopAll = () => {
    const positions = [
      { x: 0, y: 0 }, // Top Left
      { x: 0.5, y: 0 }, // Top Center
      { x: 1, y: 0 }, // Top Right
      { x: 0, y: 0.5 }, // Middle Left
      { x: 0.5, y: 0.5 }, // Center
      { x: 1, y: 0.5 }, // Middle Right
      { x: 0, y: 1 }, // Bottom Left
      { x: 0.5, y: 1 }, // Bottom Center
      { x: 1, y: 1 }, // Bottom Right
    ];

    positions.forEach((pos, index) => {
      setTimeout(() => {
        popConfetti(pos);
      }, index * 200);
    });

    setCount((prevCount) => prevCount + 9);
  };

  const handleClear = () => {
    if (confettiRef.current) {
      confettiRef.current.reset();
    }
    setCount(0);
  };

  const handleShareOnX = () => {
    const text = `I just popped ${count} confetti bursts in the Party Popper Playground! 🎉`;
    const url = "https://your-party-popper-playground-url.com"; // Replace with your actual URL
    const hashtags = "PartyPopperPlayground,Confetti";
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
    window.open(twitterShareUrl, "_blank");
  };

  const positions = [
    {
      name: "Top Left",
      x: 0,
      y: 0,
      gradient: "bg-gradient-to-br from-pink-500 to-orange-400",
    },
    {
      name: "Top Center",
      x: 0.5,
      y: 0,
      gradient: "bg-gradient-to-b from-blue-500 to-purple-500",
    },
    {
      name: "Top Right",
      x: 1,
      y: 0,
      gradient: "bg-gradient-to-bl from-green-400 to-cyan-500",
    },
    {
      name: "Middle Left",
      x: 0,
      y: 0.5,
      gradient: "bg-gradient-to-r from-yellow-400 to-orange-500",
    },
    {
      name: "Center",
      x: 0.5,
      y: 0.5,
      gradient: "bg-gradient-to-tr from-indigo-500 to-pink-500",
    },
    {
      name: "Middle Right",
      x: 1,
      y: 0.5,
      gradient: "bg-gradient-to-l from-green-500 to-blue-500",
    },
    {
      name: "Bottom Left",
      x: 0,
      y: 1,
      gradient: "bg-gradient-to-tr from-purple-500 to-pink-500",
    },
    {
      name: "Bottom Center",
      x: 0.5,
      y: 1,
      gradient: "bg-gradient-to-t from-orange-500 to-yellow-400",
    },
    {
      name: "Bottom Right",
      x: 1,
      y: 1,
      gradient: "bg-gradient-to-tl from-blue-500 to-green-400",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-3xl font-bold">
            Party Popper Playground 🎉
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            Click each button to start the party!
          </p>
          <div className="grid grid-cols-3 gap-4">
            {positions.map((pos) => (
              <Button
                key={pos.name}
                onClick={() => handlePop(pos.x, pos.y)}
                className={`h-20 text-lg font-semibold text-white transition-all duration-300 ${pos.gradient}`}
              >
                {pos.name}
              </Button>
            ))}
          </div>

          <div className="text-center space-y-2">
            <p className="text-xl font-semibold">Confetti bursts:</p>
            <p className="text-4xl font-bold">{count}</p>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={handlePopRandom}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white"
            >
              🎉 Pop Random
            </Button>
            <Button
              onClick={handlePopAll}
              className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white"
            >
              Pop All
            </Button>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleShareOnX}
              className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white"
            >
              Share your score on X
            </Button>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleClear}
              className="bg-gradient-to-r from-red-400 to-rose-500 hover:from-red-500 hover:to-rose-600 text-white"
            >
              Clear Confetti 🧹
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
