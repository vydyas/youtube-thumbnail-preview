"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Smartphone,
  Tablet,
  Monitor,
  Zap,
  Shuffle,
  BarChart,
} from "lucide-react";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600 flex items-center">
            Youtube Thumbnail Preview
          </h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Features
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.section
          className="text-center mb-16"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            Optimize Your{" "}
            <span className="text-red-600">YouTube Thumbnails</span> for Free
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Preview and perfect your thumbnails across multiple devices to
            skyrocket your click-through rates!
          </p>
          <Link
            href="/app"
            className="bg-red-600 hover:bg-red-700 text-white text-lg px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Go To App
          </Link>
        </motion.section>

        <motion.section
          id="how-it-works"
          className="mb-16"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="desktop" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="desktop">
                <Monitor className="mr-2" /> Desktop
              </TabsTrigger>
              <TabsTrigger value="tablet">
                <Tablet className="mr-2" /> Tablet
              </TabsTrigger>
              <TabsTrigger value="mobile">
                <Smartphone className="mr-2" /> Mobile
              </TabsTrigger>
            </TabsList>
            <TabsContent value="desktop" className="border rounded-lg p-4">
              <Image
                src="/desktop.png"
                alt="YouTube Thumbnail Preview App Interface on Desktop"
                width={1200}
                height={675}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </TabsContent>
            <TabsContent value="tablet" className="border rounded-lg p-4">
              <Image
                src="/tablet.png"
                alt="YouTube Thumbnail Preview App Interface on Desktop"
                width={1200}
                height={675}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </TabsContent>
            <TabsContent value="mobile" className="border rounded-lg p-4">
              <Image
                src="/mobile.png"
                alt="YouTube Thumbnail Preview App Interface on Desktop"
                width={1200}
                height={675}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </TabsContent>
          </Tabs>
          <p className="text-gray-600 mt-4 text-center">
            Our intuitive interface allows you to upload your thumbnails and
            preview them in various contexts, helping you make informed
            decisions about your YouTube content strategy.
          </p>
        </motion.section>

        <motion.section
          id="features"
          className="mb-16"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Key Features
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Monitor className="w-12 h-12 text-red-600 mb-4" />
                <h4 className="text-xl font-semibold mb-2">
                  Multi-Device Preview
                </h4>
                <p className="text-gray-600">
                  See how your thumbnails look on desktop, tablet, and mobile
                  devices.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Zap className="w-12 h-12 text-red-600 mb-4" />
                <h4 className="text-xl font-semibold mb-2">
                  Real-Time Updates
                </h4>
                <p className="text-gray-600">
                  Instantly see changes as you adjust your thumbnail designs.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Shuffle className="w-12 h-12 text-red-600 mb-4" />
                <h4 className="text-xl font-semibold mb-2">
                  Randomized Testing
                </h4>
                <p className="text-gray-600">
                  Shuffle and randomize thumbnails to simulate real YouTube
                  browsing.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section
          id="get-started"
          className="text-center mb-16"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Get Started for Free
          </h3>
          <Card className="max-w-md mx-auto hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <h4 className="text-2xl font-semibold mb-4">Free Plan</h4>
              <ul className="text-gray-600 mb-6 text-left list-disc list-inside">
                <li>Unlimited thumbnail previews</li>
                <li>Multi-device visualization</li>
                <li>Real-time updates</li>
                <li>Randomized testing</li>
                <li>Basic analytics</li>
                <li>Community support</li>
              </ul>
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white w-full rounded-full"
              >
                Sign Up Now - It&apos;s Free!
              </Button>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          className="mb-16"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose YoutubeThumbnailPreview?
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <BarChart className="w-12 h-12 text-red-600 mb-4" />
                <h4 className="text-xl font-semibold mb-2">
                  Boost Click-Through Rates
                </h4>
                <p className="text-gray-600">
                  Optimize your thumbnails to attract more viewers and increase
                  your video&apos;s visibility on YouTube.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Zap className="w-12 h-12 text-red-600 mb-4" />
                <h4 className="text-xl font-semibold mb-2">Save Time</h4>
                <p className="text-gray-600">
                  Quickly test multiple thumbnail designs without the need to
                  upload to YouTube repeatedly.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </main>

      <footer className="bg-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <p>&copy; 2024 YoutubeThumbnailPreview. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
