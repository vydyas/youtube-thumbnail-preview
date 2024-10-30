"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { create } from "canvas-confetti";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useTheme } from "next-themes";
import { Moon, Sun, Heart, Sparkles, Volume2, VolumeX } from "lucide-react";
import Head from "next/head";
import Script from "next/script";

const CONFETTI_COLORS = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Confetti Stress Relief Therapy",
  description:
    "An interactive stress relief therapy tool using colorful confetti bursts to help reduce stress levels.",
  url: "https://your-domain.com/confetti-stress-relief",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
  },
};

export default function ConfettiStressRelief() {
  const [burstCount, setBurstCount] = useState(0);
  const [stressLevel, setStressLevel] = useState(10);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiRef = useRef<ReturnType<typeof create> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
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

    // Initialize AudioContext and load audio
    audioContextRef.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    fetch("/pop.mp3")
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) =>
        audioContextRef.current!.decodeAudioData(arrayBuffer)
      )
      .then((audioBuffer) => {
        audioBufferRef.current = audioBuffer;
      })
      .catch((error) => {
        console.error("Audio loading failed:", error);
        setAudioError("Failed to load audio file");
      });

    return () => {
      document.body.removeChild(canvas);
      window.removeEventListener("resize", resizeCanvas);
      if (confettiRef.current) {
        confettiRef.current.reset();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playPopSound = useCallback(() => {
    if (!isMuted && audioContextRef.current && audioBufferRef.current) {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioContextRef.current.destination);
      source.start(audioContextRef.current.currentTime);
    }
  }, [isMuted]);

  const popConfetti = useCallback(
    (origin: { x: number; y: number }) => {
      if (confettiRef.current && audioContextRef.current) {
        const isEdge =
          origin.x === 0 || origin.x === 1 || origin.y === 0 || origin.y === 1;
        const particleCount = isEdge ? 300 : 1500;
        const spread = isEdge ? 180 : 360;
        const startVelocity = isEdge ? 45 : 25;

        playPopSound();

        confettiRef.current({
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
      }
    },
    [playPopSound]
  );

  const handleRelease = useCallback(
    (x: number, y: number) => {
      popConfetti({ x, y });
      setBurstCount((prevCount) => prevCount + 1);
      setStressLevel((prevLevel) => Math.max(0, prevLevel - 1));
    },
    [popConfetti]
  );

  const handleBigRelease = useCallback(() => {
    const positions = [
      { x: 0, y: 0 },
      { x: 0.5, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0.5 },
      { x: 0.5, y: 0.5 },
      { x: 1, y: 0.5 },
      { x: 0, y: 1 },
      { x: 0.5, y: 1 },
      { x: 1, y: 1 },
    ];

    positions.forEach((pos, index) => {
      setTimeout(() => {
        popConfetti(pos);
      }, index * 200); // Increased delay to 200ms between pops for a more distinct sound
    });

    setBurstCount((prevCount) => prevCount + 9);
    setStressLevel(0);
  }, [popConfetti]);

  const handleReset = useCallback(() => {
    if (confettiRef.current) {
      confettiRef.current.reset();
    }
    setBurstCount(0);
    setStressLevel(10);
  }, []);

  const getStressLevelColor = useCallback(() => {
    const hue = ((10 - stressLevel) * 12) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  }, [stressLevel]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
    setAudioError(null); // Clear any previous audio errors when toggling mute
  }, []);

  const stressReleaseButtons = [
    {
      name: "Deep Breath",
      gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      name: "Let Go",
      gradient: "bg-gradient-to-br from-green-400 to-green-600",
    },
    {
      name: "Smile",
      gradient: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    },
    {
      name: "Relax",
      gradient: "bg-gradient-to-br from-purple-400 to-purple-600",
    },
    {
      name: "Be Present",
      gradient: "bg-gradient-to-br from-pink-400 to-pink-600",
    },
    {
      name: "Find Joy",
      gradient: "bg-gradient-to-br from-indigo-400 to-indigo-600",
    },
  ];

  return (
    <>
      <Head>
        <title>
          Confetti Stress Relief Therapy | Interactive Stress Management Tool
        </title>
        <meta
          name="description"
          content="Experience an interactive stress relief therapy using colorful confetti bursts. Reduce your stress levels through engaging activities and visual satisfaction."
        />
        <meta
          name="keywords"
          content="stress relief, therapy, confetti, interactive, mental health, relaxation"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="canonical"
          href="https://your-domain.com/confetti-stress-relief"
        />
        <meta property="og:title" content="Confetti Stress Relief Therapy" />
        <meta
          property="og:description"
          content="Reduce stress with our interactive confetti therapy tool. Experience visual satisfaction and engage in stress-relieving activities."
        />
        <meta
          property="og:image"
          content="https://your-domain.com/confetti-stress-relief-og-image.jpg"
        />
        <meta
          property="og:url"
          content="https://your-domain.com/confetti-stress-relief"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex items-center justify-center min-h-screen bg-background">
        <article className="w-full max-w-3xl">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-3xl font-bold">
                  Confetti Stress Relief 🎉
                </CardTitle>
                <CardDescription>
                  Pop away your stress with colorful confetti!
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
                  <Moon className="hidden h-5 w-5 dark:block" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {audioError && (
                <div className="text-red-500 text-center">{audioError}</div>
              )}
              <section className="text-center space-y-2">
                <h2 className="text-xl font-semibold">Current Stress Level:</h2>
                <div
                  className="text-4xl font-bold"
                  style={{ color: getStressLevelColor() }}
                >
                  {stressLevel}
                </div>
              </section>

              <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {stressReleaseButtons.map((button, index) => (
                  <Button
                    key={button.name}
                    onClick={() =>
                      handleRelease((index % 3) / 2, Math.floor(index / 3) / 2)
                    }
                    className={`h-20 text-lg font-semibold text-white transition-all duration-300 ${button.gradient}`}
                  >
                    {button.name}
                  </Button>
                ))}
              </section>

              <section className="flex justify-center space-x-4">
                <Button
                  onClick={handleBigRelease}
                  className="bg-gradient-to-r from-red-400 to-orange-500 hover:from-red-500 hover:to-orange-600 text-white"
                >
                  <Sparkles className="mr-2 h-4 w-4" /> Big Stress Release!
                </Button>
              </section>

              <section className="text-center space-y-2">
                <h2 className="text-xl font-semibold">
                  Stress Relief Sessions:
                </h2>
                <p className="text-4xl font-bold">{burstCount}</p>
              </section>

              <section className="flex justify-center">
                <Button
                  onClick={handleReset}
                  className="bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white"
                >
                  Reset Therapy Session
                </Button>
              </section>

              <footer className="text-center text-sm text-muted-foreground">
                <Heart className="inline-block mr-1 h-4 w-4" />
                Remember, it&apos;s okay to take a moment for yourself and
                release some stress.
              </footer>
            </CardContent>
          </Card>
        </article>
      </main>
    </>
  );
}
