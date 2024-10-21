import { AuthSidebar } from "@/components/AuthSidebar";
import { useUser } from "@clerk/nextjs";
import { ImageUploadArea } from "@/components/image-upload-area";
import { AnimatedThumbnail } from "@/components/animated-thumbnail";
import { SignInModal } from "@/components/SignInModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  Monitor,
  Tablet,
  Smartphone,
  Shuffle,
  Dice5,
  PlayCircleIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Thumbnail {
  id: number;
  title: string;
  image: string;
}

interface ThumbnailTesterSidebarProps {
  thumbnails: Thumbnail[];
  onImageUpload: (title: string, image: string) => void;
  currentView: "desktop" | "tablet" | "mobile";
  setCurrentView: React.Dispatch<
    React.SetStateAction<"desktop" | "tablet" | "mobile">
  >;
  onDeleteThumbnail: (id: number | string) => void;
  onShuffle: () => void;
  onRandomize: () => void;
}

export default function ThumbnailTesterSidebar({
  thumbnails,
  onImageUpload,
  currentView,
  setCurrentView,
  onDeleteThumbnail,
  onShuffle,
  onRandomize,
}: ThumbnailTesterSidebarProps) {
  const [title, setTitle] = useState<string>(
    "Some Random Title Which Is Temporary"
  );
  const [image, setImage] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isSignedIn } = useUser();

  const handleUpload = () => {
    if (!isSignedIn) {
      alert("Please sign in to upload thumbnails");
      return;
    }
    if (title && image) {
      onImageUpload(title, image);
      setTitle("Some Random Title Which Is Temporary");
      setImage("");
      setIsDialogOpen(false);
    }
  };

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      setImage(e.target?.result as string);
      handleUpload();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full">
      <div className="flex flex-col">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 rounded-lg mr-2">
            <PlayCircleIcon className="w-8 h-8" />
          </div>
          <h1 className="text-lg font-bold">Thumbnails Preview</h1>
        </div>

        <Tabs
          value={currentView}
          onValueChange={(value) =>
            setCurrentView(value as "desktop" | "tablet" | "mobile")
          }
          className="w-full mb-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="desktop">
              <Monitor className="h-5 w-5 mr-2" />
            </TabsTrigger>
            <TabsTrigger value="tablet">
              <Tablet className="h-5 w-5 mr-2" />
            </TabsTrigger>
            <TabsTrigger value="mobile">
              <Smartphone className="h-5 w-5 mr-2" />
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <h2 className="text-lg font-semibold mb-2">Thumbnails</h2>

        <div className="grid grid-cols-2 gap-5 mb-4">
          {isSignedIn ? (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Card className="relative cursor-pointer flex items-center justify-center">
                  <CardContent className="p-0">
                    <div className="h-14 flex items-center justify-center border-muted-foreground rounded-lg">
                      <Plus className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Thumbnail</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <ImageUploadArea
                    onFileSelect={handleFileSelect}
                    disabled={!isSignedIn}
                  />
                  {image && (
                    <div className="mt-4">
                      <img
                        src={image}
                        alt="Selected thumbnail"
                        className="w-20 h-14"
                      />
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleUpload}
                  disabled={!isSignedIn}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-none font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-white"
                >
                  {isSignedIn ? "Upload" : "Sign in to Upload"}
                </Button>
              </DialogContent>
            </Dialog>
          ) : (
            <SignInModal>
              <Card className="relative cursor-pointer flex items-center justify-center">
                <CardContent className="p-0">
                  <div className="h-14 flex items-center justify-center border-muted-foreground rounded-lg">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </SignInModal>
          )}
          {thumbnails.map((thumbnail) => (
            <AnimatedThumbnail
              key={thumbnail.id}
              id={thumbnail.id}
              image={thumbnail.image}
              title={thumbnail.title}
              onDelete={onDeleteThumbnail}
            />
          ))}
        </div>

        <div className="flex space-x-2 mb-4">
          <Button
            variant="outline"
            onClick={onShuffle}
            className="flex-1 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white border-none font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-white"
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Shuffle
          </Button>
        </div>
        <Button variant="outline" className="mb-4" onClick={onRandomize}>
          <Dice5 className="mr-2 h-4 w-4" />
          Randomized
        </Button>
      </div>

      <AuthSidebar />
    </div>
  );
}
