"use client";

import { useState } from "react";
import { SignIn } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function SignInModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-none font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-white"
        >
          Sign In With Email
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <SignIn
          afterSignInUrl="/"
          routing="hash"
          appearance={{
            elements: {
              footerActionLink: "hidden",
              socialButtonsBlockButton: "hidden",
            },
          }}
        ></SignIn>
      </DialogContent>
    </Dialog>
  );
}
