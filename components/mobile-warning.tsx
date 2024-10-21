"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function MobileWarning() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Adjust this value as needed for small mobile devices
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <Dialog open={isSmallScreen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Desktop and Tablet Optimized</DialogTitle>
        </DialogHeader>
        <p>
          This application is designed for desktop and tablet use. For the best
          experience, please access it from a desktop, laptop, or tablet device.
        </p>
      </DialogContent>
    </Dialog>
  );
}
